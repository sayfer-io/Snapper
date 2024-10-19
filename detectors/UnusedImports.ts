import {
  SourceFile,
  SyntaxKind,
  ImportDeclaration,
  Identifier,
} from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect unused imports in the source code.
 * This detector identifies import declarations that are not utilized within the code,
 * helping to maintain clean and efficient code by removing unnecessary imports.
 */
class UnusedImportsDetector extends DetectorBase {
  constructor() {
    super("UnusedImports", RiskRating.Low);
  }

  /**
   * Retrieves all import declarations within the specified source file.
   *
   * This method scans the source file and collects all import statements,
   * which can then be analyzed for usage.
   *
   * @param {SourceFile} file - The source file to analyze for import declarations.
   * @returns {ImportDeclaration[]} - An array of import declarations found in the file.
   */
  private getAllImportDeclarations(file: SourceFile): ImportDeclaration[] {
    return file.getImportDeclarations();
  }

  /**
   * Retrieves all identifiers in the specified source file.
   *
   * This method gathers all identifiers (variable names, function names, etc.)
   * present in the source file for further analysis.
   *
   * @param {SourceFile} file - The source file to analyze for identifiers.
   * @returns {Identifier[]} - An array of identifiers found in the file.
   */
  private getAllIdentifiers(file: SourceFile): Identifier[] {
    return file.getDescendantsOfKind(SyntaxKind.Identifier);
  }

  /**
   * Collects all identifiers that are used in the source file, excluding those in import declarations.
   *
   * This method filters out identifiers that are part of import declarations to avoid
   * counting them as used when they are not actually referenced in the code.
   *
   * @param {SourceFile} sourceFile - The source file to analyze for used identifiers.
   * @returns {Set<string>} - A set of used identifier names found in the file.
   */
  private collectUsedIdentifiers(sourceFile: SourceFile): Set<string> {
    const identifiers = this.getAllIdentifiers(sourceFile).filter(
      (identifier) => {
        // Exclude identifiers that are part of import declarations
        const parentKind = identifier.getParent()?.getKind();
        return (
          parentKind !== SyntaxKind.ImportSpecifier &&
          parentKind !== SyntaxKind.ImportClause
        );
      }
    );

    const usedIdentifiers = new Set(
      identifiers.map((identifier) => identifier.getText())
    );

    return usedIdentifiers;
  }

  /**
   * Checks if a named import is used in the source file.
   *
   * This method verifies if the specified import name exists in the set of used identifiers.
   *
   * @param {string} importName - The name of the import to check.
   * @param {Set<string>} usedIdentifiers - Set of used identifier names for reference.
   * @returns {boolean} - True if the import is used; false otherwise.
   */
  private isNamedImportUsed(
    importName: string,
    usedIdentifiers: Set<string>
  ): boolean {
    return usedIdentifiers.has(importName);
  }

  /**
   * Reports an unused import by logging a finding.
   *
   * This method generates a finding for an import that is declared but not utilized,
   * which is crucial for keeping the codebase clean and avoiding unnecessary imports.
   *
   * @param {string} importName - The name of the unused import.
   * @param {ImportDeclaration} importDecl - The import declaration containing additional details.
   */
  private reportUnusedImport(
    importName: string,
    importDecl: ImportDeclaration
  ): void {
    this.addFinding(
      `Import '${importName}' is declared but never used.`,
      importDecl.getSourceFile().getFilePath(),
      importDecl.getStartLineNumber() // Get the start line number for accurate reporting
    );
  }

  /**
   * Runs the detector on the specified source file to identify unused imports.
   *
   * This method orchestrates the detection process by collecting used identifiers,
   * fetching all import declarations, and then checking each named import, default import,
   * and namespace import for usage. It reports findings for any unused imports detected.
   *
   * @param {SourceFile} sourceFile - The source file to analyze for unused imports.
   * @returns {Finding[]} - An array of findings with details about unused imports.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const usedIdentifiers = this.collectUsedIdentifiers(sourceFile);
    const importDeclarations = this.getAllImportDeclarations(sourceFile);

    importDeclarations.forEach((importDecl) => {
      // Check named imports
      importDecl.getNamedImports().forEach((namedImport) => {
        const isUsed = this.isNamedImportUsed(
          namedImport.getName(),
          usedIdentifiers
        );
        if (!isUsed) {
          this.reportUnusedImport(namedImport.getName(), importDecl);
        }
      });

      // Check default import
      const defaultImport = importDecl.getDefaultImport();
      if (defaultImport) {
        const isUsed = this.isNamedImportUsed(
          defaultImport.getText(),
          usedIdentifiers
        );

        if (!isUsed) {
          this.reportUnusedImport(defaultImport.getText(), importDecl);
        }
      }

      // Check namespace import
      const namespaceImport = importDecl.getNamespaceImport();
      if (namespaceImport) {
        const isUsed = this.isNamedImportUsed(
          namespaceImport.getText(),
          usedIdentifiers
        );

        if (!isUsed) {
          this.reportUnusedImport(namespaceImport.getText(), importDecl);
        }
      }
    });

    // Return all findings accumulated during the detection process
    return this.getFindings();
  }
}

export { UnusedImportsDetector };
