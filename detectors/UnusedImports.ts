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
 */
class UnusedImportsDetector extends DetectorBase {
  constructor() {
    super("UnusedImports", RiskRating.Low);
  }

  /**
   * Gets all import declarations in the given file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {ImportDeclaration[]} - Array of import declarations.
   */
  private getAllImportDeclarations(file: SourceFile): ImportDeclaration[] {
    return file.getImportDeclarations();
  }

  /**
   * Gets all identifiers in the given file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {Identifier[]} - Array of identifiers.
   */
  private getAllIdentifiers(file: SourceFile): Identifier[] {
    return file.getDescendantsOfKind(SyntaxKind.Identifier);
  }

  /**
   * Collects all used identifiers in the source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Set<string>} - Set of used identifier names.
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
   * Checks if a named import is used.
   * @param {string} importName - The name of the import.
   * @param {Set<string>} usedIdentifiers - Set of used identifier names.
   * @returns {boolean} - True if the import is used, false otherwise.
   */
  private isNamedImportUsed(
    importName: string,
    usedIdentifiers: Set<string>
  ): boolean {
    return usedIdentifiers.has(importName);
  }

  /**
   * Adds a finding for an unused import.
   * @param {string} importName - The name of the unused import.
   * @param {ImportDeclaration} importDecl - The import declaration.
   */
  private reportUnusedImport(
    importName: string,
    importDecl: ImportDeclaration
  ): void {
    this.addFinding(
      `Import '${importName}' is declared but never used.`,
      importDecl.getSourceFile().getFilePath(),
      importDecl.getStartLineNumber()
    );
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const usedIdentifiers = this.collectUsedIdentifiers(sourceFile);
    const importDeclarations = this.getAllImportDeclarations(sourceFile);

    importDeclarations.forEach((importDecl) => {
      importDecl.getNamedImports().forEach((namedImport) => {
        const isUsed = this.isNamedImportUsed(
          namedImport.getName(),
          usedIdentifiers
        );
        if (!isUsed) {
          this.reportUnusedImport(namedImport.getName(), importDecl);
        }
      });

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

    return this.getFindings();
  }
}

export { UnusedImportsDetector };
