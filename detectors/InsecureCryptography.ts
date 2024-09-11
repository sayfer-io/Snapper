import { SourceFile, SyntaxKind, Node, CallExpression } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

// Threshold for PBKDF2 iterations
const PBKDF2_ITERATION_THRESHOLD = 10000;

/**
 * Class to detect insecure cryptography usage in the source code.
 */
class InsecureCryptographyDetector extends DetectorBase {
  constructor() {
    super("InsecureCryptography", RiskRating.High);
  }

  /**
   * Checks if the given call expression is a PBKDF2 call with low iterations.
   * @param {CallExpression} callExpression - The call expression to check.
   * @returns {boolean} - True if the call expression is a PBKDF2 call with low iterations, false otherwise.
   */
  private isLowIterationPBKDF2(callExpression: CallExpression): boolean {
    const expression = callExpression.getExpression().getText().toLowerCase();
    if (expression.includes("pbkdf2")) {
      const args = callExpression.getArguments();
      if (args.length >= 4) {
        const iterationsArg = args[2];
        if (iterationsArg.getKind() === SyntaxKind.NumericLiteral) {
          const iterations = parseInt(iterationsArg.getText(), 10);
          return iterations < PBKDF2_ITERATION_THRESHOLD;
        }
      }
    }
    return false;
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    sourceFile.forEachDescendant((node: Node) => {
      if (node.getKind() === SyntaxKind.CallExpression) {
        const callExpression = node as CallExpression;
        if (this.isLowIterationPBKDF2(callExpression)) {
          this.addFinding(
            "Low number of iterations in PBKDF2.",
            sourceFile.getFilePath(),
            sourceFile.getLineAndColumnAtPos(node.getPos()).line
          );
        }
      }
    });

    return this.getFindings();
  }
}

export { InsecureCryptographyDetector };
