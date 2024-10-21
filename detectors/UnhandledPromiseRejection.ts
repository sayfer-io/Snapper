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
 * This detector identifies potential issues where catch clauses do not handle errors properly,
 * potentially leading to unhandled promise rejections.
 */
class UnhandledPromiseRejectionDetector extends DetectorBase {
  constructor() {
    super("UnhandledPromiseRejection", RiskRating.High);
  }

  /**
   * Runs the detector on the given source file to identify empty or ineffective catch blocks.
   *
   * This method traverses all catch clauses within the source file, checks their contents,
   * and logs a finding if it detects any empty catch blocks or blocks that contain only ineffective statements.
   *
   * @param {SourceFile} file - The source file to analyze for unhandled promise rejections.
   * @returns {Finding[]} - An array of findings indicating the locations and reasons for potential issues.
   */
  public run(file: SourceFile): Finding[] {
    const findings: Finding[] = [];

    // Get all catch clauses in the file to check for unhandled rejections
    const catchClauses = file.getDescendantsOfKind(SyntaxKind.CatchClause);

    // Process each catch clause found
    catchClauses.forEach((catchClause) => {
      if (this.isEmptyCatchBlock(catchClause)) {
        this.addFinding(
          `Empty or ineffective catch block detected, which can lead to unhandled promise rejections.`,
          file.getFilePath(),
          catchClause.getStart() // Get the start position for accurate finding location
        );
      }
    });

    // Return all findings collected during the analysis
    return this.getFindings();
  }

  /**
   * Checks if the catch block is empty or contains only ineffective statements.
   *
   * This method evaluates the statements within a catch block to determine if they provide any error handling logic.
   * It considers a catch block ineffective if it either contains no statements or all statements are deemed ineffective.
   *
   * @param {CatchClause} catchClause - The catch clause to check for effectiveness.
   * @returns {boolean} - True if the catch block is empty or ineffective; false otherwise.
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
   * Checks if a statement is ineffective, such as comments, console logs, placeholder functions, or empty statements.
   * Ineffective statements typically do not affect program logic or flow and should not be used in catch blocks.
   *
   * @param {Statement} statement - The statement to check for effectiveness.
   * @returns {boolean} - True if the statement is ineffective; false otherwise.
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
   * Checks if an expression statement is ineffective by analyzing the expression it contains.
   *
   * @param {ExpressionStatement} statement - The expression statement to check for effectiveness.
   * @returns {boolean} - True if the expression statement is ineffective; false otherwise.
   */
  private isIneffectiveExpressionStatement(
    statement: ExpressionStatement
  ): boolean {
    const expression = statement.getExpression();
    if (expression.getKind() === SyntaxKind.CallExpression) {
      const callExpression = expression as CallExpression;
      const expressionText = callExpression.getExpression().getText();

      // List of ineffective function calls
      return [
        "console.log",
        "console.warn",
        "null",
        "pass",
        "placeholder",
      ].includes(expressionText);
    }

    // Check for literal expressions like null or undefined
    return ["null", "undefined", "pass", "placeholder"].includes(
      expression.getText()
    );
  }

  /**
   * Checks if a block is empty.
   *
   * @param {Block} block - The block to check for emptiness.
   * @returns {boolean} - True if the block contains no statements; false otherwise.
   */
  private isEmptyBlock(block: Block): boolean {
    return block.getStatements().length === 0;
  }

  /**
   * Checks if a return statement is ineffective.
   *
   * @param {ReturnStatement} statement - The return statement to check for effectiveness.
   * @returns {boolean} - True if the return statement is ineffective; false otherwise.
   */
  private isIneffectiveReturnStatement(statement: ReturnStatement): boolean {
    const returnExpression = statement.getExpression();
    // A return statement is ineffective if it returns undefined or has no expression
    return !returnExpression || returnExpression.getText() === "undefined";
  }

  /**
   * Checks if a throw statement is ineffective.
   *
   * @param {ThrowStatement} statement - The throw statement to check for effectiveness.
   * @returns {boolean} - True if the throw statement is ineffective; false otherwise.
   */
  private isIneffectiveThrowStatement(statement: ThrowStatement): boolean {
    const throwExpression = statement.getExpression();
    // A throw statement is ineffective if it throws an empty Error
    return throwExpression && throwExpression.getText() === "Error()";
  }

  /**
   * Checks if a statement is a comment or placeholder.
   *
   * @param {Statement} statement - The statement to check for comments or placeholders.
   * @returns {boolean} - True if the statement is a comment or a placeholder; false otherwise.
   */
  private isCommentOrPlaceholder(statement: Statement): boolean {
    const fullText = statement.getFullText().trim();
    // Check for comment statements that are placeholders or todo items
    if (fullText.startsWith("//")) {
      return /\/\/\s*(todo|fixme|noop|placeholder|dummy|remove)/i.test(
        fullText
      );
    }
    return false;
  }
}

export { UnhandledPromiseRejectionDetector };
