import { SourceFile, CommentRange, Node } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect leftover TODO comments in the source code.
 */
class LeftoverTODOsDetector extends DetectorBase {
  constructor() {
    super("LeftoverTODOs", RiskRating.Medium);
  }

  /**
   * Gets all comment ranges in the given file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {CommentRange[]} - Array of comment ranges.
   */
  private getCommentRanges(file: SourceFile): CommentRange[] {
    const commentRanges: CommentRange[] = [];

    // Collect all leading and trailing comment ranges from each descendant node
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
   * Checks if the comment contains a real "TODO" and not just the keyword in a string or non-TODO usage.
   * @param {CommentRange} comment - The comment range to check.
   * @returns {boolean} - True if the comment includes an actionable TODO, false otherwise.
   */
  private isRealTodoComment(comment: CommentRange): boolean {
    const commentText = comment.getText();
    // Ensure "TODO" appears as a standalone word
    return /\bTODO\b/i.test(commentText);
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const commentRanges = this.getCommentRanges(sourceFile);
    const reportedTodos = new Set<string>();

    // Analyze each comment range for TODOs
    commentRanges.forEach((comment) => {
      // Skip JSDoc comments
      if (this.isJSDocComment(comment)) {
        return;
      }

      // Check if the comment is a valid TODO
      if (this.isRealTodoComment(comment)) {
        const todoLocation = `${sourceFile.getFilePath()}:${
          sourceFile.getLineAndColumnAtPos(comment.getPos()).line
        }`;

        // Add finding if this TODO hasn't been reported yet
        if (!reportedTodos.has(todoLocation)) {
          this.addFinding(
            "Leftover TODO comment detected.",
            sourceFile.getFilePath(),
            sourceFile.getLineAndColumnAtPos(comment.getPos()).line
          );
          reportedTodos.add(todoLocation);
        }
      }
    });

    return this.getFindings();
  }
}

export { LeftoverTODOsDetector };
