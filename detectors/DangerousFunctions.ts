import { SourceFile, SyntaxKind, CallExpression } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect dangerous functions in the source code.
 */
class DangerousFunctionsDetector extends DetectorBase {
  // List of dangerous function names
  private static DANGEROUS_FUNCTIONS = [
    "dangerouslySetInnerHTML",
    "eval",
    "signData",
  ];

  constructor() {
    super("DangerousFunctions", RiskRating.High);
  }

  /**
   * Filters and returns dangerous function call expressions from the given file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {CallExpression[]} - Array of dangerous function call expressions.
   */
  private getDangerousFunctionExpressions(file: SourceFile): CallExpression[] {
    const dangerousExpressions: CallExpression[] = [];

    file.forEachDescendant((node) => {
      if (node.getKind() === SyntaxKind.CallExpression) {
        const callExpression = node as CallExpression;
        const expression = callExpression.getExpression().getText();
        if (
          DangerousFunctionsDetector.DANGEROUS_FUNCTIONS.includes(expression)
        ) {
          dangerousExpressions.push(callExpression);
        }
      }
    });

    return dangerousExpressions;
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const dangerousExpressions =
      this.getDangerousFunctionExpressions(sourceFile);

    dangerousExpressions.forEach((expression) => {
      const functionName = expression.getExpression().getText();
      this.addFinding(
        `Usage of dangerous function: ${functionName}`,
        sourceFile.getFilePath(),
        sourceFile.getLineAndColumnAtPos(expression.getPos()).line
      );
    });

    return this.getFindings();
  }
}

export { DangerousFunctionsDetector };
