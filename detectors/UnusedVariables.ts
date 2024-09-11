import {
  SourceFile,
  SyntaxKind,
  VariableDeclaration,
  Identifier,
} from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect unused variables in the source code.
 */
class UnusedVariablesDetector extends DetectorBase {
  constructor() {
    super("UnusedVariables", RiskRating.Low);
  }

  /**
   * Gets all non-exported variable declarations in the given file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {VariableDeclaration[]} - Array of non-exported variable declarations.
   */
  private getAllNonExportedVariableDeclarations(
    file: SourceFile
  ): VariableDeclaration[] {
    return file
      .getVariableDeclarations()
      .filter((variable) => !variable.isExported());
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
    const variableDeclarations =
      this.getAllNonExportedVariableDeclarations(sourceFile);
    const identifiers = this.getAllIdentifiers(sourceFile);

    const usedIdentifiers = new Set(
      identifiers.map((identifier) => identifier.getText())
    );

    variableDeclarations.forEach((variable) => {
      if (!usedIdentifiers.has(variable.getName())) {
        this.addFinding(
          `Variable '${variable.getName()}' is declared but never used.`,
          variable.getSourceFile().getFilePath(),
          variable.getStartLineNumber()
        );
      }
    });

    return this.getFindings();
  }
}

export { UnusedVariablesDetector };
