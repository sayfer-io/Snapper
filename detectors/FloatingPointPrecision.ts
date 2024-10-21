import {
  SourceFile,
  SyntaxKind,
  BinaryExpression,
  Node,
  ConditionalExpression,
} from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Detector class for identifying potential floating-point precision issues
 * in JavaScript/TypeScript files.
 */
class FloatingPointPrecisionDetector extends DetectorBase {
  constructor() {
    super("FloatingPointPrecision", RiskRating.Medium); // Initializes the detector with a name and medium risk rating.
  }

  /**
   * Analyzes the provided source file for potential floating-point precision issues.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {Finding[]} - List of findings related to floating-point precision issues.
   */
  public run(file: SourceFile): Finding[] {
    const findings: Finding[] = []; // Initialize findings array.

    // Retrieve all binary expressions from the file.
    const binaryExpressions = file.getDescendantsOfKind(
      SyntaxKind.BinaryExpression
    );

    // Process each binary expression to check for potential issues.
    binaryExpressions.forEach((binaryExpression) => {
      if (this.isDivisionOperation(binaryExpression)) {
        const leftOperand = binaryExpression.getLeft();
        const rightOperand = binaryExpression.getRight();

        // Check for potential floating-point precision issues in the division operation.
        if (
          this.isFloatingPointOperation(leftOperand, rightOperand) ||
          this.containsConditionalDivision(binaryExpression)
        ) {
          this.addFinding(
            `Potential floating-point precision issue detected in division operation.`,
            file.getFilePath(),
            binaryExpression.getStart() // Log the position of the finding.
          );
        }
      }
    });

    return this.getFindings(); // Return all findings.
  }

  /**
   * Checks if the provided binary expression represents a division operation.
   * @param {BinaryExpression} binaryExpression - The binary expression to check.
   * @returns {boolean} - True if it is a division operation, false otherwise.
   */
  private isDivisionOperation(binaryExpression: BinaryExpression): boolean {
    return (
      binaryExpression.getOperatorToken().getKind() === SyntaxKind.SlashToken // Check for the division operator.
    );
  }

  /**
   * Determines if the operation involves floating-point numbers or large decimal values.
   * @param {Node} leftOperand - The left operand of the binary expression.
   * @param {Node} rightOperand - The right operand of the binary expression.
   * @returns {boolean} - True if it involves floating-point numbers or decimals, false otherwise.
   */
  private isFloatingPointOperation(
    leftOperand: Node,
    rightOperand: Node
  ): boolean {
    return (
      this.containsDecimalOrExponent(leftOperand) || // Check if left operand contains decimals or exponents.
      this.containsDecimalOrExponent(rightOperand) // Check if right operand contains decimals or exponents.
    );
  }

  /**
   * Checks if the provided node contains decimal numbers or large constants (e.g., 1e6, 1e12).
   * @param {Node} node - The node to analyze.
   * @returns {boolean} - True if it contains floating-point literals or scientific notation, false otherwise.
   */
  private containsDecimalOrExponent(node: Node): boolean {
    return /\d+\.\d+|e[\+\-]?\d+/i.test(node.getText()); // Regex test for decimals or scientific notation.
  }

  /**
   * Checks if the binary expression contains a conditional division operation.
   * @param {BinaryExpression} binaryExpression - The binary expression to analyze.
   * @returns {boolean} - True if it contains a conditional division, false otherwise.
   */
  private containsConditionalDivision(
    binaryExpression: BinaryExpression
  ): boolean {
    const rightOperand = binaryExpression.getRight();
    if (rightOperand instanceof ConditionalExpression) {
      const whenTrue = rightOperand.getWhenTrue();
      const whenFalse = rightOperand.getWhenFalse();
      return (
        this.containsDecimalOrExponent(whenTrue) || // Check if the true branch contains decimals or exponents.
        this.containsDecimalOrExponent(whenFalse) // Check if the false branch contains decimals or exponents.
      );
    }
    return false; // Return false if the right operand is not a conditional expression.
  }
}

export { FloatingPointPrecisionDetector };
