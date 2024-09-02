import { SourceFile, CommentRange, Node } from 'ts-morph';
import { Finding } from '../types';
import { RiskRating } from '../structures';

/**
 * Gets all comment ranges in the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {CommentRange[]} - Array of comment ranges.
 */
function getCommentRanges(file: SourceFile): CommentRange[] {
    const commentRanges: CommentRange[] = [];

    file.forEachDescendant((node: Node) => {
        const leadingCommentRanges = node.getLeadingCommentRanges();
        const trailingCommentRanges = node.getTrailingCommentRanges();
        commentRanges.push(...leadingCommentRanges, ...trailingCommentRanges);
    });

    return commentRanges;
}

/**
 * Checks if the comment is a JSDoc comment. JSDoc comments start with '/**'.
 * @param {CommentRange} comment - The comment range to check.
 * @returns {boolean} - True if the comment is a JSDoc comment, false otherwise.
 */
function isJSDocComment(comment: CommentRange): boolean {
    return comment.getText().startsWith('/**');
}

/**
 * Creates a finding for a large section of commented-out code.
 * @param {SourceFile} file - The source file containing the comment.
 * @param {CommentRange} comment - The comment range.
 * @param {number} lines - The number of lines in the comment.
 * @returns {Finding} - The finding object.
 */
function createLargeCommentedOutCodeFinding(file: SourceFile, comment: CommentRange, lines: number): Finding {
    const startLineNum = file.getLineAndColumnAtPos(comment.getPos()).line;
    return {
        type: "LeftoverTODOs",
        description: `Large section of commented-out code detected (${lines} lines).`,
        position: {
            filePath: file.getFilePath(),
            lineNum: startLineNum,
        },
        riskRating: RiskRating.Medium,
        weight: 2
    };
}

/**
 * Creates a finding for a leftover TODO.
 * @param {SourceFile} file - The source file containing the comment.
 * @param {CommentRange} comment - The comment range.
 * @returns {Finding} - The finding object.
 */
function createLeftoverTODOFinding(file: SourceFile, comment: CommentRange): Finding {
    const startLineNum = file.getLineAndColumnAtPos(comment.getPos()).line;
    return {
        type: "LeftoverTODOs",
        description: `Leftover TODO detected: '${comment.getText().trim()}'.`,
        position: {
            filePath: file.getFilePath(),
            lineNum: startLineNum,
        },
        riskRating: RiskRating.Low,
        weight: 1
    };
}

/**
 * Detects large sections of commented-out code or leftover TODOs in the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Finding[]} - Array of findings with details about the detected issues.
 */
export function detectLeftoverTODOs(file: SourceFile): Finding[] {
    const commentRanges = getCommentRanges(file);
    const findings: Finding[] = [];

    commentRanges.forEach(comment => {
        if (isJSDocComment(comment)) {
            return;
        }

        const commentText = comment.getText();
        const lines = commentText.split('\n').length;

        // Detect large sections of commented-out code
        if (lines > 5) {
            findings.push(createLargeCommentedOutCodeFinding(file, comment, lines));
        }

        // Detect leftover TODOs
        if (commentText.includes('TODO')) {
            findings.push(createLeftoverTODOFinding(file, comment));
        }
    });

    return findings;
}