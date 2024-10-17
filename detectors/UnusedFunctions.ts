import { SourceFile, SyntaxKind, FunctionDeclaration } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect unused functions in the source code.
 * This detector identifies function declarations that are not used or exported,
 * helping to maintain clean and efficient code by eliminating dead code.
 */
class UnusedFunctionsDetector extends DetectorBase {
  constructor() {
    super("UnusedFunctions", RiskRating.Low);
  }

  /**
   * Retrieves all function declarations within the provided source file.
   *
   * This method scans the source file and collects all declared functions.
   *
   * @param {SourceFile} file - The source file to analyze for function declarations.
   * @returns {FunctionDeclaration[]} - An array of function declarations found in the file.
   */
  private getAllFunctionDeclarations(file: SourceFile): FunctionDeclaration[] {
    return file.getFunctions();
  }

  /**
   * Collects all used identifiers in the source file, excluding function declarations.
   *
   * This method gathers identifiers (variable names, property names, etc.) that are used
   * within the source file while ensuring that function declarations themselves are excluded
   * from the results to avoid false positives.
   *
   * @param {SourceFile} sourceFile - The source file to analyze for used identifiers.
   * @returns {Set<string>} - A set of used identifier names found in the file.
   */
  private collectUsedIdentifiers(sourceFile: SourceFile): Set<string> {
    const identifiers = sourceFile.getDescendantsOfKind(SyntaxKind.Identifier);
    const usedIdentifiers = new Set<string>();

    identifiers.forEach((identifier) => {
      const parent = identifier.getParent();
      // Add identifier to the set only if it is not a function declaration
      if (parent && parent.getKind() !== SyntaxKind.FunctionDeclaration) {
        usedIdentifiers.add(identifier.getText());
      }
    });

    return usedIdentifiers;
  }

  /**
   * Determines if a function is either used or exported.
   *
   * This method checks if the given function declaration is referenced in the code
   * or if it is exported, which would indicate that it might still be in use in another module.
   *
   * @param {FunctionDeclaration} functionDecl - The function declaration to check.
   * @param {Set<string>} usedIdentifiers - Set of used identifier names to verify against.
   * @returns {boolean} - True if the function is used or exported; false otherwise.
   */
  private isFunctionUsedOrExported(
    functionDecl: FunctionDeclaration,
    usedIdentifiers: Set<string>
  ): boolean {
    const functionName = functionDecl.getName();
    if (!functionName) return false;

    // Check if the function is referenced in the used identifiers set
    if (usedIdentifiers.has(functionName)) return true;

    // Check if the function is marked as exported
    if (functionDecl.isExported()) return true;

    return false;
  }

  /**
   * Reports an unused function by logging a finding.
   *
   * This method generates a finding for a function that is declared but never utilized,
   * which is essential for keeping the codebase clean and efficient.
   *
   * @param {string} functionName - The name of the unused function.
   * @param {FunctionDeclaration} functionDecl - The function declaration containing additional details.
   */
  private reportUnusedFunction(
    functionName: string,
    functionDecl: FunctionDeclaration
  ): void {
    this.addFinding(
      `Function '${functionName}' is declared but never used.`,
      functionDecl.getSourceFile().getFilePath(),
      functionDecl.getStartLineNumber() // Get the start line number for accurate reporting
    );
  }

  /**
   * Runs the detector on the specified source file to identify unused functions.
   *
   * This method orchestrates the detection process by collecting used identifiers,
   * fetching all function declarations, and then checking each function to see if it
   * is used or exported. It reports findings for any unused functions detected.
   *
   * @param {SourceFile} sourceFile - The source file to analyze for unused functions.
   * @returns {Finding[]} - An array of findings with details about unused functions.
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

    // Return all findings accumulated during the detection process
    return this.getFindings();
  }
}

export { UnusedFunctionsDetector };
