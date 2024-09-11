import { SourceFile, SyntaxKind, CallExpression } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect deprecated functions in the source code.
 */
class DeprecatedFunctionsDetector extends DetectorBase {
  // List of deprecated function names
  private static DEPRECATED_FUNCTIONS = ["atob", "btoa"];

  constructor() {
    super("DeprecatedFunctions", RiskRating.Low);
  }

  /**
   * Filters and returns deprecated function call expressions from the given file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {CallExpression[]} - Array of deprecated function call expressions.
   */
  private getDeprecatedFunctionExpressions(file: SourceFile): CallExpression[] {
    const deprecatedExpressions: CallExpression[] = [];

    file.forEachDescendant((node) => {
      if (node.getKind() === SyntaxKind.CallExpression) {
        const callExpression = node as CallExpression;
        const expression = callExpression.getExpression().getText();
        if (
          DeprecatedFunctionsDetector.DEPRECATED_FUNCTIONS.includes(expression)
        ) {
          deprecatedExpressions.push(callExpression);
        }
      }
    });

    return deprecatedExpressions;
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const deprecatedExpressions =
      this.getDeprecatedFunctionExpressions(sourceFile);

    deprecatedExpressions.forEach((expression) => {
      const functionName = expression.getExpression().getText();
      this.addFinding(
        `Usage of deprecated function: ${functionName}`,
        sourceFile.getFilePath(),
        sourceFile.getLineAndColumnAtPos(expression.getPos()).line
      );
    });

    return this.getFindings();
  }
}

export { DeprecatedFunctionsDetector };
