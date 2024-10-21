import {
  SourceFile,
  SyntaxKind,
  FunctionDeclaration,
  MethodDeclaration,
  Node,
  CallExpression,
} from "ts-morph";

import { Finding } from "../types";
import { DetectorBase } from "./DetectorBase";
import { RiskRating } from "../structures";

/**
 * Detector for identifying lack of exception handling in important functions.
 */
class LackOfExceptionHandlingDetector extends DetectorBase {
  // List of important functions that require exception handling
  private importantFunctions: string[] = [
    "ethereum.request",
    "snap_manageAccounts",
    "snap_getBip32Entropy",
    "snap_getBip44Entropy",
    "snap_dialog",
    "snap_notify",
    "fetch",
  ];

  constructor() {
    super("LackOfExceptionHandling", RiskRating.Medium);
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings detailing the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    // Get all function and method declarations in the source file
    const functions = sourceFile.getDescendantsOfKind(
      SyntaxKind.FunctionDeclaration
    );
    const methods = sourceFile.getDescendantsOfKind(
      SyntaxKind.MethodDeclaration
    );

    // Check each important function and method for lack of exception handling
    functions.forEach((func) => this.checkImportantFunction(func));
    methods.forEach((method) => this.checkImportantFunction(method));

    return this.getFindings();
  }

  /**
   * Checks if the given function or method is important and lacks exception handling.
   * @param {FunctionDeclaration | MethodDeclaration} node - The function or method to check.
   */
  private checkImportantFunction(
    node: FunctionDeclaration | MethodDeclaration
  ): void {
    const name = node.getName();
    // Proceed only if the function is important
    if (name && this.importantFunctions.includes(name)) {
      // Check for exception handling in the call stack
      if (!this.hasExceptionHandlingInCallStack(node)) {
        this.addFinding(
          `${node.getKindName()} '${name}' lacks exception handling in its call stack.`,
          node.getSourceFile().getFilePath(),
          node.getStartLineNumber()
        );
      }
    }
  }

  /**
   * Checks if the given function or method has exception handling in its call stack.
   * @param {FunctionDeclaration | MethodDeclaration} node - The function or method to check.
   * @returns {boolean} - True if exception handling is present, false otherwise.
   */
  private hasExceptionHandlingInCallStack(
    node: FunctionDeclaration | MethodDeclaration
  ): boolean {
    // Check if the node itself has a try statement
    if (this.hasExceptionHandling(node)) {
      return true;
    }

    // Traverse up the call stack to check for exception handling
    const callExpressions = node.getDescendantsOfKind(
      SyntaxKind.CallExpression
    );
    for (const callExpr of callExpressions) {
      const referencedDecl = this.getReferencedDeclaration(callExpr);
      if (referencedDecl && this.hasExceptionHandling(referencedDecl)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Checks if the given node has exception handling.
   * @param {Node} node - The node to check.
   * @returns {boolean} - True if the node has exception handling, false otherwise.
   */
  private hasExceptionHandling(node: Node): boolean {
    return node.getDescendantsOfKind(SyntaxKind.TryStatement).length > 0;
  }

  /**
   * Gets the referenced declaration of a call expression.
   * @param {CallExpression} callExpr - The call expression to get the referenced declaration for.
   * @returns {FunctionDeclaration | MethodDeclaration | undefined} - The referenced declaration or undefined if not found.
   */
  private getReferencedDeclaration(
    callExpr: CallExpression
  ): FunctionDeclaration | MethodDeclaration | undefined {
    const symbol = callExpr.getExpression().getSymbol();
    if (!symbol) return undefined;

    const declarations = symbol.getDeclarations();
    if (declarations.length === 0) return undefined;

    const decl = declarations[0];
    if (Node.isFunctionDeclaration(decl) || Node.isMethodDeclaration(decl)) {
      return decl;
    }

    return undefined;
  }
}

export { LackOfExceptionHandlingDetector };
