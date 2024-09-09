// TODO: Going forward, this detector should be updated to also take into
// account the whole project (using tsconfig) and not just one file at a time.

import {
  SourceFile,
  SyntaxKind,
  FunctionDeclaration,
  VariableDeclaration,
  ImportDeclaration,
  Identifier,
} from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";

/**
 * Gets all non-exported function declarations in the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {FunctionDeclaration[]} - Array of non-exported function declarations.
 */
function getAllNonExportedFunctionDeclarations(
  file: SourceFile
): FunctionDeclaration[] {
  return file.getFunctions().filter((func) => !func.isExported());
}

/**
 * Gets all non-exported variable declarations in the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {VariableDeclaration[]} - Array of non-exported variable declarations.
 */
function getAllNonExportedVariableDeclarations(
  file: SourceFile
): VariableDeclaration[] {
  return file
    .getVariableDeclarations()
    .filter((variable) => !variable.isExported());
}

/**
 * Gets all import declarations in the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {ImportDeclaration[]} - Array of import declarations.
 */
function getAllImportDeclarations(file: SourceFile): ImportDeclaration[] {
  return file.getImportDeclarations();
}

/**
 * Gets all identifiers in the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Identifier[]} - Array of identifiers.
 */
function getAllIdentifiers(file: SourceFile): Identifier[] {
  return file.getDescendantsOfKind(SyntaxKind.Identifier);
}

/**
 * Detects unused elements (non-exported functions, non-exported variables, imports) in the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Finding[]} - Array of findings with details about the detected issues.
 */
export function detectUnusedElements(file: SourceFile): Finding[] {
  const findings: Finding[] = [];

  const functionDeclarations = getAllNonExportedFunctionDeclarations(file);
  const variableDeclarations = getAllNonExportedVariableDeclarations(file);
  const importDeclarations = getAllImportDeclarations(file);
  const identifiers = getAllIdentifiers(file);

  const usedIdentifiers = new Set(
    identifiers.map((identifier) => identifier.getText())
  );

  functionDeclarations.forEach((func) => {
    if (!usedIdentifiers.has(func.getName()!)) {
      findings.push({
        type: "UnusedFunction",
        description: `Function '${func.getName()}' is declared but never used.`,
        position: {
          filePath: func.getSourceFile().getFilePath(),
          lineNum: func.getStartLineNumber(),
        },
        riskRating: RiskRating.Low,
      });
    }
  });

  variableDeclarations.forEach((variable) => {
    if (!usedIdentifiers.has(variable.getName())) {
      findings.push({
        type: "UnusedVariable",
        description: `Variable '${variable.getName()}' is declared but never used.`,
        position: {
          filePath: variable.getSourceFile().getFilePath(),
          lineNum: variable.getStartLineNumber(),
        },
        riskRating: RiskRating.Low,
      });
    }
  });

  importDeclarations.forEach((importDecl) => {
    importDecl.getNamedImports().forEach((namedImport) => {
      if (!usedIdentifiers.has(namedImport.getName())) {
        findings.push({
          type: "UnusedImport",
          description: `Import '${namedImport.getName()}' is declared but never used.`,
          position: {
            filePath: importDecl.getSourceFile().getFilePath(),
            lineNum: importDecl.getStartLineNumber(),
          },
          riskRating: RiskRating.Low,
        });
      }
    });

    const defaultImport = importDecl.getDefaultImport();
    if (defaultImport && !usedIdentifiers.has(defaultImport.getText())) {
      findings.push({
        type: "UnusedImport",
        description: `Import '${defaultImport.getText()}' is declared but never used.`,
        position: {
          filePath: importDecl.getSourceFile().getFilePath(),
          lineNum: importDecl.getStartLineNumber(),
        },
        riskRating: RiskRating.Low,
      });
    }

    const namespaceImport = importDecl.getNamespaceImport();
    if (namespaceImport && !usedIdentifiers.has(namespaceImport.getText())) {
      findings.push({
        type: "UnusedImport",
        description: `Import '${namespaceImport.getText()}' is declared but never used.`,
        position: {
          filePath: importDecl.getSourceFile().getFilePath(),
          lineNum: importDecl.getStartLineNumber(),
        },
        riskRating: RiskRating.Low,
      });
    }
  });

  return findings;
}
