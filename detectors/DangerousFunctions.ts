/**
 * This file defines a detector that identifies the use of dangerous functions in the source code.
 * Dangerous functions, such as eval or dangerouslySetInnerHTML, can expose code to security vulnerabilities
 * like cross-site scripting (XSS) attacks or arbitrary code execution.
 */

import { SourceFile, SyntaxKind, CallExpression } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect dangerous functions in the source code.
 * Extends the DetectorBase class to implement detection functionality for unsafe functions.
 */
class DangerousFunctionsDetector extends DetectorBase {
  /**
   * @constant {string[]} DANGEROUS_FUNCTIONS - An array of dangerous function names that pose potential risks if used.
   */
  private static DANGEROUS_FUNCTIONS = [
    "dangerouslySetInnerHTML",
    "eval",
    "signData",
  ];

  /**
   * Constructor for the DangerousFunctionsDetector.
   * Initializes the detector with a name and assigns a high-risk rating.
   * @constructor
   */
  constructor() {
    super("DangerousFunctions", RiskRating.High);
  }

  /**
   * Filters and returns dangerous function call expressions from the given file.
   * It searches through the source file and identifies any call expressions
   * that match the dangerous function names listed in DANGEROUS_FUNCTIONS.
   *
   * @param {SourceFile} file - The source file to analyze for dangerous function usage.
   * @returns {CallExpression[]} - Array of dangerous function call expressions found in the source file.
   */
  private getDangerousFunctionExpressions(file: SourceFile): CallExpression[] {
    const dangerousExpressions: CallExpression[] = [];

    // Traverse the entire file, looking for call expressions
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
   * This method identifies any dangerous function calls in the file
   * and adds findings for each one, including the function name and line number.
   *
   * @param {SourceFile} sourceFile - The source file to analyze for dangerous function usage.
   * @returns {Finding[]} - Array of findings with details about the detected dangerous function calls.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const dangerousExpressions =
      this.getDangerousFunctionExpressions(sourceFile);

    // For each dangerous function expression, add a finding
    dangerousExpressions.forEach((expression) => {
      const functionName = expression.getExpression().getText();
      this.addFinding(
        `Usage of dangerous function: ${functionName}`,
        sourceFile.getFilePath(),
        sourceFile.getLineAndColumnAtPos(expression.getPos()).line
      );
    });

    // Return the list of findings
    return this.getFindings();
  }
}

export { DangerousFunctionsDetector };
