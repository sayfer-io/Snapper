import { SourceFile, SyntaxKind, CallExpression } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Detector for identifying console.log statements in the code.
 */
class ConsoleLogDetector extends DetectorBase {
  constructor() {
    super("ConsoleLog", RiskRating.Low);
  }

  /**
   * Filters and returns console log expressions from the given file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {CallExpression[]} - Array of console log call expressions.
   */
  private getConsoleLogExpressions(file: SourceFile): CallExpression[] {
    return file
      .getDescendantsOfKind(SyntaxKind.CallExpression)
      .filter((expression) => {
        const expressionText = expression.getExpression().getText();
        return (
          expressionText === "console.log" ||
          expressionText.startsWith("console.")
        );
      });
  }

  /**
   * Runs the detector on the given file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {Finding[]} - Array of findings.
   */
  public run(file: SourceFile): Finding[] {
    const consoleLogExpressions = this.getConsoleLogExpressions(file);

    consoleLogExpressions.forEach((logInstance) => {
      this.addFinding(
        "Presence of console log function detected.",
        file.getFilePath(),
        logInstance.getStartLineNumber()
      );
    });

    return this.getFindings();
  }
}

export { ConsoleLogDetector };
