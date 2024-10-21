/**
 * This file defines a detector that identifies the use of console.log statements in the source code.
 * Logging to the console can expose sensitive information or be left in production code unintentionally,
 * so this detector flags these calls as low-risk issues.
 */

import { SourceFile, SyntaxKind, CallExpression } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Detector for identifying console.log statements in the code.
 * Extends the DetectorBase class to implement detection functionality for console logging.
 */
class ConsoleLogDetector extends DetectorBase {
  /**
   * Constructor for the ConsoleLogDetector.
   * Initializes the detector with a name and assigns a low-risk rating.
   * @constructor
   */
  constructor() {
    super("ConsoleLog", RiskRating.Low);
  }

  /**
   * Filters and returns console log expressions from the given file.
   * It searches the source file for call expressions and checks whether they
   * represent console.log statements or other console methods (e.g., console.error).
   *
   * @param {SourceFile} file - The source file to analyze for console.log usage.
   * @returns {CallExpression[]} - Array of console log call expressions found in the source file.
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
   * Runs the detector on the given file, finding all instances of console.log
   * or related console methods, and adds findings for each instance.
   *
   * @param {SourceFile} file - The source file to analyze for console logs.
   * @returns {Finding[]} - Array of findings, each corresponding to a detected console log call.
   */
  public run(file: SourceFile): Finding[] {
    const consoleLogExpressions = this.getConsoleLogExpressions(file);

    // For each console log expression, add a finding
    consoleLogExpressions.forEach((logInstance) => {
      this.addFinding(
        "Presence of console log function detected.",
        file.getFilePath(),
        logInstance.getStartLineNumber()
      );
    });

    // Return the list of findings
    return this.getFindings();
  }
}

export { ConsoleLogDetector };
