import { SourceFile, SyntaxKind, CallExpression } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect deprecated functions in the source code.
 * This detector searches for specific deprecated functions like `atob` and `btoa` in JavaScript/TypeScript code
 * and flags their usage, as they are considered outdated and should be avoided in modern development.
 */
class DeprecatedFunctionsDetector extends DetectorBase {
  // List of deprecated function names to detect in the code
  private static DEPRECATED_FUNCTIONS = ["atob", "btoa"];

  /**
   * Constructor for the DeprecatedFunctionsDetector.
   * Initializes the detector with a name and assigns it a low-risk rating, as deprecated functions
   * typically pose lower security risks but should still be replaced in the codebase.
   */
  constructor() {
    super("DeprecatedFunctions", RiskRating.Low);
  }

  /**
   * Filters and returns an array of deprecated function call expressions from the given source file.
   * It traverses the entire file and checks each node to identify any deprecated function calls.
   *
   * @param {SourceFile} file - The source file to analyze for deprecated functions.
   * @returns {CallExpression[]} - Array of deprecated function call expressions.
   */
  private getDeprecatedFunctionExpressions(file: SourceFile): CallExpression[] {
    const deprecatedExpressions: CallExpression[] = [];

    // Traverse through all descendant nodes in the source file
    file.forEachDescendant((node) => {
      // Check if the node is a CallExpression (a function call)
      if (node.getKind() === SyntaxKind.CallExpression) {
        const callExpression = node as CallExpression;
        const expression = callExpression.getExpression().getText();

        // If the expression matches a deprecated function name, add it to the results
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
   * Runs the detector on the given source file to identify any usage of deprecated functions.
   * It gathers all instances of deprecated function calls and records a finding for each.
   *
   * @param {SourceFile} sourceFile - The source file to analyze for deprecated function usage.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    // Get all expressions in the file that call deprecated functions
    const deprecatedExpressions =
      this.getDeprecatedFunctionExpressions(sourceFile);

    // For each deprecated function call, record a finding with relevant details
    deprecatedExpressions.forEach((expression) => {
      const functionName = expression.getExpression().getText();
      this.addFinding(
        `Usage of deprecated function: ${functionName}`, // Description of the finding
        sourceFile.getFilePath(), // File path where the issue is located
        sourceFile.getLineAndColumnAtPos(expression.getPos()).line // Line number of the issue
      );
    });

    return this.getFindings();
  }
}

export { DeprecatedFunctionsDetector };
