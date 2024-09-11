import { SourceFile, CommentRange, Node } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect excessive comments in the source code.
 */
class ExcessiveCommentsDetector extends DetectorBase {
  constructor() {
    super("ExcessiveComments", RiskRating.Medium);
  }

  /**
   * Gets all comment ranges in the given file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {CommentRange[]} - Array of comment ranges.
   */
  private getCommentRanges(file: SourceFile): CommentRange[] {
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
  private isJSDocComment(comment: CommentRange): boolean {
    return comment.getText().startsWith("/**");
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const commentRanges = this.getCommentRanges(sourceFile);

    commentRanges.forEach((comment) => {
      if (this.isJSDocComment(comment)) {
        return;
      }

      const commentText = comment.getText();
      const lines = commentText.split("\n").length;

      // Detect large sections of commented-out code
      if (lines > 5) {
        this.addFinding(
          `Large section of commented-out code detected (${lines} lines).`,
          sourceFile.getFilePath(),
          sourceFile.getLineAndColumnAtPos(comment.getPos()).line
        );
      }
    });

    return this.getFindings();
  }
}

export { ExcessiveCommentsDetector };
