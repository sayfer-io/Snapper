// TODO: Going forward, this detector should be updated to also take into
// account the whole project (using tsconfig) and not just one file at a time.

import {
  SourceFile,
  SyntaxKind,
  FunctionDeclaration,
  Identifier,
} from "ts-morph";

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
   * Gets all non-exported function declarations in the given file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {FunctionDeclaration[]} - Array of non-exported function declarations.
   */
  private getAllNonExportedFunctionDeclarations(
    file: SourceFile
  ): FunctionDeclaration[] {
    return file.getFunctions().filter((func) => !func.isExported());
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
    const functionDeclarations =
      this.getAllNonExportedFunctionDeclarations(sourceFile);
    const identifiers = this.getAllIdentifiers(sourceFile);

    const usedIdentifiers = new Set(
      identifiers.map((identifier) => identifier.getText())
    );

    functionDeclarations.forEach((func) => {
      if (!usedIdentifiers.has(func.getName()!)) {
        this.addFinding(
          `Function '${func.getName()}' is declared but never used.`,
          func.getSourceFile().getFilePath(),
          func.getStartLineNumber()
        );
      }
    });

    return this.getFindings();
  }
}

export { UnusedFunctionsDetector };
