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
 * This detector identifies variables declared in the code that are never used,
 * aiding in code optimization and maintainability.
 */
class UnusedVariablesDetector extends DetectorBase {
  constructor() {
    super("UnusedVariables", RiskRating.Low);
  }

  /**
   * Gets all non-exported variable declarations in the given file.
   *
   * This method retrieves all variable declarations from the source file and
   * filters out the ones that are exported, focusing only on internal variables.
   *
   * @param {SourceFile} file - The source file to analyze.
   * @returns {VariableDeclaration[]} - Array of non-exported variable declarations.
   */
  private getAllNonExportedVariableDeclarations(
    file: SourceFile
  ): VariableDeclaration[] {
    return file
      .getVariableDeclarations()
      .filter((variable) => !variable.isExported()); // Exclude exported variables.
  }

  /**
   * Gets all identifiers in the given file.
   *
   * This method collects all identifier nodes in the source file, which may include
   * variables, function names, and other identifiers used in the code.
   *
   * @param {SourceFile} file - The source file to analyze.
   * @returns {Identifier[]} - Array of identifiers found in the file.
   */
  private getAllIdentifiers(file: SourceFile): Identifier[] {
    return file.getDescendantsOfKind(SyntaxKind.Identifier); // Retrieve all identifier nodes.
  }

  /**
   * Runs the detector on the given source file to identify unused variables.
   *
   * This method checks all non-exported variable declarations against a set of used
   * identifiers to determine if any variables are declared but never utilized in the code.
   *
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about detected unused variables.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const variableDeclarations =
      this.getAllNonExportedVariableDeclarations(sourceFile);
    const identifiers = this.getAllIdentifiers(sourceFile);

    // Create a set of used identifiers for quick lookup.
    const usedIdentifiers = new Set(
      identifiers.map((identifier) => identifier.getText())
    );

    // Check each variable declaration to see if it is unused.
    variableDeclarations.forEach((variable) => {
      if (!usedIdentifiers.has(variable.getName())) {
        this.addFinding(
          `Variable '${variable.getName()}' is declared but never used.`,
          variable.getSourceFile().getFilePath(),
          variable.getStartLineNumber()
        );
      }
    });

    // Return all findings collected during the analysis.
    return this.getFindings();
  }
}

export { UnusedVariablesDetector };
