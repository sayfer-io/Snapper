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
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const importDeclarations = this.getAllImportDeclarations(sourceFile);
    const identifiers = this.getAllIdentifiers(sourceFile);

    const usedIdentifiers = new Set(
      identifiers.map((identifier) => identifier.getText())
    );

    const reportedImports = new Set<string>();
    importDeclarations.forEach((importDecl) => {
      importDecl.getNamedImports().forEach((namedImport) => {
        if (!usedIdentifiers.has(namedImport.getName())) {
          this.addFinding(
            `Import '${namedImport.getName()}' is declared but never used.`,
            importDecl.getSourceFile().getFilePath(),
            importDecl.getStartLineNumber()
          );
          return; // Skip the rest of the checks for this import declaration
        }
      });

      const defaultImport = importDecl.getDefaultImport();
      if (defaultImport && !usedIdentifiers.has(defaultImport.getText())) {
        this.addFinding(
          `Import '${defaultImport.getText()}' is declared but never used.`,
          importDecl.getSourceFile().getFilePath(),
          importDecl.getStartLineNumber()
        );
        return; // Skip the rest of the checks for this import declaration
      }

      const namespaceImport = importDecl.getNamespaceImport();
      if (namespaceImport && !usedIdentifiers.has(namespaceImport.getText())) {
        this.addFinding(
          `Import '${namespaceImport.getText()}' is declared but never used.`,
          importDecl.getSourceFile().getFilePath(),
          importDecl.getStartLineNumber()
        );
        return; // Skip the rest of the checks for this import declaration
      }
    });

    return this.getFindings();
  }
}

export { UnusedImportsDetector };
