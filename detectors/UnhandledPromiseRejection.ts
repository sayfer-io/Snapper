import {
  SourceFile,
  SyntaxKind,
  CatchClause,
  Statement,
  ExpressionStatement,
  CallExpression,
  Block,
  ReturnStatement,
  ThrowStatement,
} from "ts-morph";
import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect unhandled promise rejections in asynchronous functions.
 */
class UnhandledPromiseRejectionDetector extends DetectorBase {
  constructor() {
    super("UnhandledPromiseRejection", RiskRating.High);
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {Finding[]} - List of findings.
   */
  public run(file: SourceFile): Finding[] {
    const findings: Finding[] = [];

    // Get all catch clauses in the file
    const catchClauses = file.getDescendantsOfKind(SyntaxKind.CatchClause);

    // Process each catch clause
    catchClauses.forEach((catchClause) => {
      if (this.isEmptyCatchBlock(catchClause)) {
        this.addFinding(
          `Empty or ineffective catch block detected, which can lead to unhandled promise rejections.`,
          file.getFilePath(),
          catchClause.getStart()
        );
      }
    });

    return this.getFindings();
  }

  /**
   * Checks if the catch block is empty or contains only ineffective statements.
   * @param {CatchClause} catchClause - The catch clause to check.
   * @returns {boolean} - True if the catch block is empty or ineffective, false otherwise.
   */
  private isEmptyCatchBlock(catchClause: CatchClause): boolean {
    const block = catchClause.getBlock();
    const statements = block.getStatements();

    // Check if the block is empty
    if (statements.length === 0) {
      return true;
    }

    // Check if all statements are ineffective
    return statements.every((statement) =>
      this.isIneffectiveStatement(statement)
    );
  }

  /**
   * Checks if a statement is ineffective (e.g., comments, console logs, placeholder functions, empty statements).
   * Ineffective statements typically do not affect program logic or flow.
   * @param {Statement} statement - The statement to check.
   * @returns {boolean} - True if the statement is ineffective, false otherwise.
   */
  private isIneffectiveStatement(statement: Statement): boolean {
    switch (statement.getKind()) {
      case SyntaxKind.ExpressionStatement:
        return this.isIneffectiveExpressionStatement(
          statement as ExpressionStatement
        );
      case SyntaxKind.Block:
        return this.isEmptyBlock(statement as Block);
      case SyntaxKind.ReturnStatement:
        return this.isIneffectiveReturnStatement(statement as ReturnStatement);
      case SyntaxKind.ThrowStatement:
        return this.isIneffectiveThrowStatement(statement as ThrowStatement);
      default:
        return this.isCommentOrPlaceholder(statement);
    }
  }

  /**
   * Checks if an expression statement is ineffective.
   * @param {ExpressionStatement} statement - The expression statement to check.
   * @returns {boolean} - True if the expression statement is ineffective, false otherwise.
   */
  private isIneffectiveExpressionStatement(
    statement: ExpressionStatement
  ): boolean {
    const expression = statement.getExpression();
    if (expression.getKind() === SyntaxKind.CallExpression) {
      const callExpression = expression as CallExpression;
      const expressionText = callExpression.getExpression().getText();

      // Ineffective function calls
      return [
        "console.log",
        "console.warn",
        "null",
        "pass",
        "placeholder",
      ].includes(expressionText);
    }

    // Check for literal expressions (null, undefined)
    return ["null", "undefined", "pass", "placeholder"].includes(
      expression.getText()
    );
  }

  /**
   * Checks if a block is empty.
   * @param {Block} block - The block to check.
   * @returns {boolean} - True if the block is empty, false otherwise.
   */
  private isEmptyBlock(block: Block): boolean {
    return block.getStatements().length === 0;
  }

  /**
   * Checks if a return statement is ineffective.
   * @param {ReturnStatement} statement - The return statement to check.
   * @returns {boolean} - True if the return statement is ineffective, false otherwise.
   */
  private isIneffectiveReturnStatement(statement: ReturnStatement): boolean {
    const returnExpression = statement.getExpression();
    return !returnExpression || returnExpression.getText() === "undefined";
  }

  /**
   * Checks if a throw statement is ineffective.
   * @param {ThrowStatement} statement - The throw statement to check.
   * @returns {boolean} - True if the throw statement is ineffective, false otherwise.
   */
  private isIneffectiveThrowStatement(statement: ThrowStatement): boolean {
    const throwExpression = statement.getExpression();
    return throwExpression && throwExpression.getText() === "Error()";
  }

  /**
   * Checks if a statement is a comment or placeholder.
   * @param {Statement} statement - The statement to check.
   * @returns {boolean} - True if the statement is a comment or placeholder, false otherwise.
   */
  private isCommentOrPlaceholder(statement: Statement): boolean {
    const fullText = statement.getFullText().trim();
    if (fullText.startsWith("//")) {
      return /\/\/\s*(todo|fixme|noop|placeholder|dummy|remove)/i.test(
        fullText
      );
    }
    return false;
  }
}

export { UnhandledPromiseRejectionDetector };
