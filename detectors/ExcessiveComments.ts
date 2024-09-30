import { SourceFile } from "ts-morph";
import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

const EXCESSIVE_COMMENT_THRESHOLD = 5;
const SINGLE_LINE_COMMENT_PATTERN = /(^\s*\/\/[^*].*$[\r\n]*)+/gm; // Excludes JSDoc starting with `/**`
const MULTI_LINE_COMMENT_PATTERN = /\/\*[^*][\s\S]*?\*\//g; // Excludes JSDoc starting with `/**`

class ExcessiveCommentsDetector extends DetectorBase {
  constructor() {
    super("ExcessiveComments", RiskRating.Medium);
  }

  public run(sourceFile: SourceFile): Finding[] {
    this.findings = [];
    const fileText = sourceFile.getFullText();

    this.detectCommentSections(
      fileText,
      sourceFile,
      SINGLE_LINE_COMMENT_PATTERN,
      "//"
    );
    this.detectCommentSections(
      fileText,
      sourceFile,
      MULTI_LINE_COMMENT_PATTERN,
      "/*"
    );

    return this.getFindings();
  }

  private detectCommentSections(
    fileText: string,
    sourceFile: SourceFile,
    pattern: RegExp,
    commentType: string
  ) {
    let match;
    let previousEndLine = -1;
    let accumulatedLines = 0;

    while ((match = pattern.exec(fileText)) !== null) {
      const startLine = this.getLineFromPos(fileText, match.index);
      const lines = match[0].split("\n").length;

      if (startLine > previousEndLine + 1) {
        accumulatedLines = 0;
      }

      accumulatedLines += lines;

      if (accumulatedLines >= EXCESSIVE_COMMENT_THRESHOLD) {
        this.addFinding(
          `Large section of commented-out code detected (${startLine}-${
            startLine + lines - 2
          }).`, // Corrected line range
          sourceFile.getFilePath(),
          match.index
        );
        previousEndLine = startLine + lines - 1;
      }
    }
  }

  private getLineFromPos(text: string, pos: number): number {
    return text.slice(0, pos).split("\n").length;
  }
}

export { ExcessiveCommentsDetector };
