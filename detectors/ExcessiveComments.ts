import { SourceFile } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

const EXCESSIVE_COMMENT_THRESHOLD = 7; // Threshold for excessive comments.
const SINGLE_LINE_COMMENT_PATTERN = /(^\s*\/\/[^*].*$[\r\n]*)+/gm; // Pattern for single-line comments (excluding JSDoc).
const MULTI_LINE_COMMENT_PATTERN = /\/\*[^*][\s\S]*?\*\//g; // Pattern for multi-line comments (excluding JSDoc).

/**
 * Detector class for identifying excessive comments in the code.
 */
class ExcessiveCommentsDetector extends DetectorBase {
  constructor() {
    super("ExcessiveComments", RiskRating.Medium); // Initializes with a name and medium risk rating.
  }

  /**
   * Analyzes the provided source file for excessive comments.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings related to excessive comments.
   */
  public run(sourceFile: SourceFile): Finding[] {
    this.findings = []; // Initialize findings array.
    const fileText = sourceFile.getFullText(); // Get the full text of the source file.

    // Detect excessive single-line comments.
    this.detectCommentSections(
      fileText,
      sourceFile,
      SINGLE_LINE_COMMENT_PATTERN,
      "//"
    );
    // Detect excessive multi-line comments.
    this.detectCommentSections(
      fileText,
      sourceFile,
      MULTI_LINE_COMMENT_PATTERN,
      "/*"
    );

    return this.getFindings(); // Return all findings.
  }

  /**
   * Detects sections of comments in the source file that exceed the defined threshold.
   * @param {string} fileText - The full text of the source file.
   * @param {SourceFile} sourceFile - The source file being analyzed.
   * @param {RegExp} pattern - The regex pattern to identify comments.
   * @param {string} commentType - The type of comment (single-line or multi-line).
   */
  private detectCommentSections(
    fileText: string,
    sourceFile: SourceFile,
    pattern: RegExp,
    commentType: string
  ) {
    let match; // To store the match results.
    let previousEndLine = -1; // To track the end line of the last detected comment section.
    let accumulatedLines = 0; // To count lines of comments in a row.

    // Loop through the file text to find matches for the comment pattern.
    while ((match = pattern.exec(fileText)) !== null) {
      const startLine = this.getLineFromPos(fileText, match.index); // Get the start line of the match.
      const lines = match[0].split("\n").length; // Get the number of lines in the comment.

      // Reset accumulated lines if there's a gap between comment sections.
      if (startLine > previousEndLine + 1) {
        accumulatedLines = 0;
      }

      accumulatedLines += lines; // Accumulate lines of comments.

      // If the accumulated lines exceed the threshold, log a finding.
      if (accumulatedLines >= EXCESSIVE_COMMENT_THRESHOLD) {
        this.addFinding(
          `Large section of commented-out code detected (${startLine}-${
            startLine + lines - 2
          }).`, // Record the line range of excessive comments.
          sourceFile.getFilePath(),
          match.index // Log the position of the finding.
        );
        previousEndLine = startLine + lines - 1; // Update the previous end line.
      }
    }
  }

  /**
   * Calculates the line number from a character position in the text.
   * @param {string} text - The text content of the file.
   * @param {number} pos - The character position in the text.
   * @returns {number} - The line number corresponding to the given position.
   */
  private getLineFromPos(text: string, pos: number): number {
    return text.slice(0, pos).split("\n").length; // Count the number of new lines before the position.
  }
}

export { ExcessiveCommentsDetector };
