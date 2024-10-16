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
 * Class to detect potential floating-point precision issues in JavaScript/TypeScript files.
 */
class FloatingPointPrecisionDetector extends DetectorBase {
  constructor() {
    super("FloatingPointPrecision", RiskRating.Medium);
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {Finding[]} - List of findings.
   */
  public run(file: SourceFile): Finding[] {
    const findings: Finding[] = [];

    // Get all binary expressions in the file
    const binaryExpressions = file.getDescendantsOfKind(
      SyntaxKind.BinaryExpression
    );

    // Process each binary expression
    binaryExpressions.forEach((binaryExpression) => {
      if (this.isDivisionOperation(binaryExpression)) {
        const leftOperand = binaryExpression.getLeft();
        const rightOperand = binaryExpression.getRight();

        // Check if the division involves potential floating-point precision issues
        if (
          this.isFloatingPointOperation(leftOperand, rightOperand) ||
          this.containsConditionalDivision(binaryExpression)
        ) {
          this.addFinding(
            `Potential floating-point precision issue detected in division operation.`,
            file.getFilePath(),
            binaryExpression.getStart()
          );
        }
      }
    });

    return this.getFindings();
  }

  /**
   * Checks if the binary expression is a division operation.
   * @param {BinaryExpression} binaryExpression - The binary expression to check.
   * @returns {boolean} - True if it is a division operation, false otherwise.
   */
  private isDivisionOperation(binaryExpression: BinaryExpression): boolean {
    return (
      binaryExpression.getOperatorToken().getKind() === SyntaxKind.SlashToken
    );
  }

  /**
   * Checks if the operation involves floating-point numbers or large decimal values.
   * @param {Node} leftOperand - The left operand of the binary expression.
   * @param {Node} rightOperand - The right operand of the binary expression.
   * @returns {boolean} - True if it involves floating-point numbers or decimals, false otherwise.
   */
  private isFloatingPointOperation(
    leftOperand: Node,
    rightOperand: Node
  ): boolean {
    return (
      this.containsDecimalOrExponent(leftOperand) ||
      this.containsDecimalOrExponent(rightOperand)
    );
  }

  /**
   * Checks if a node contains decimal numbers or large constants (like 1e6, 1e12).
   * @param {Node} node - The node to analyze.
   * @returns {boolean} - True if it contains floating-point literals or scientific notation.
   */
  private containsDecimalOrExponent(node: Node): boolean {
    return /\d+\.\d+|e[\+\-]?\d+/i.test(node.getText());
  }

  /**
   * Checks if a binary expression contains a conditional division operation.
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
        this.containsDecimalOrExponent(whenTrue) ||
        this.containsDecimalOrExponent(whenFalse)
      );
    }
    return false;
  }
}

export { FloatingPointPrecisionDetector };
