import { SourceFile, SyntaxKind, FunctionDeclaration } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect unused functions in the source code.
 */
class UnusedFunctionsDetector extends DetectorBase {
  constructor() {
    super("UnusedFunctions", RiskRating.Low);
  }

  /**
   * Gets all function declarations in the given file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {FunctionDeclaration[]} - Array of function declarations.
   */
  private getAllFunctionDeclarations(file: SourceFile): FunctionDeclaration[] {
    return file.getFunctions();
  }

  /**
   * Collects all used identifiers in the source file, excluding function declarations.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Set<string>} - Set of used identifier names.
   */
  private collectUsedIdentifiers(sourceFile: SourceFile): Set<string> {
    const identifiers = sourceFile.getDescendantsOfKind(SyntaxKind.Identifier);
    const usedIdentifiers = new Set<string>();

    identifiers.forEach((identifier) => {
      const parent = identifier.getParent();
      if (parent && parent.getKind() !== SyntaxKind.FunctionDeclaration) {
        usedIdentifiers.add(identifier.getText());
      }
    });

    return usedIdentifiers;
  }

  /**
   * Checks if a function is used or exported.
   * @param {FunctionDeclaration} functionDecl - The function declaration.
   * @param {Set<string>} usedIdentifiers - Set of used identifier names.
   * @returns {boolean} - True if the function is used or exported, false otherwise.
   */
  private isFunctionUsedOrExported(
    functionDecl: FunctionDeclaration,
    usedIdentifiers: Set<string>
  ): boolean {
    const functionName = functionDecl.getName();
    if (!functionName) return false;

    // Check if the function is used
    if (usedIdentifiers.has(functionName)) return true;

    // Check if the function is exported
    if (functionDecl.isExported()) return true;

    return false;
  }

  /**
   * Adds a finding for an unused function.
   * @param {string} functionName - The name of the unused function.
   * @param {FunctionDeclaration} functionDecl - The function declaration.
   */
  private reportUnusedFunction(
    functionName: string,
    functionDecl: FunctionDeclaration
  ): void {
    this.addFinding(
      `Function '${functionName}' is declared but never used.`,
      functionDecl.getSourceFile().getFilePath(),
      functionDecl.getStartLineNumber()
    );
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const usedIdentifiers = this.collectUsedIdentifiers(sourceFile);
    const functionDeclarations = this.getAllFunctionDeclarations(sourceFile);

    functionDeclarations.forEach((functionDecl) => {
      const functionName = functionDecl.getName();
      if (functionName) {
        const isUsedOrExported = this.isFunctionUsedOrExported(
          functionDecl,
          usedIdentifiers
        );
        if (!isUsedOrExported) {
          this.reportUnusedFunction(functionName, functionDecl);
        }
      }
    });

    return this.getFindings();
  }
}

export { UnusedFunctionsDetector };
