import { SourceFile, Node } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect if arrow functions are used before they are defined in the given file.
 */
class UsedBeforeDefinedArrowFunctionsDetector extends DetectorBase {
  constructor() {
    super("UsedBeforeDefinedArrowFunctions", RiskRating.Medium);
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const arrowFunctionDeclarations: { [name: string]: number } = {};
    const arrowFunctionUsages: { [name: string]: number[] } = {};

    // Traverse the AST to find arrow functions and their usages
    sourceFile.forEachDescendant((node: Node) => {
      if (Node.isVariableDeclaration(node)) {
        const initializer = node.getInitializer();
        if (initializer && Node.isArrowFunction(initializer)) {
          const name = node.getName();
          arrowFunctionDeclarations[name] = node.getStartLineNumber();
        }
      } else if (Node.isIdentifier(node)) {
        const parent = node.getParent();
        if (parent && Node.isCallExpression(parent)) {
          const name = node.getText();
          if (!arrowFunctionUsages[name]) {
            arrowFunctionUsages[name] = [];
          }
          arrowFunctionUsages[name].push(node.getStartLineNumber());
        }
      }
    });

    // Check for arrow function usages before their declarations
    for (const [name, usageLines] of Object.entries(arrowFunctionUsages)) {
      if (arrowFunctionDeclarations[name]) {
        const declarationLine = arrowFunctionDeclarations[name];
        usageLines.forEach((usageLine) => {
          if (usageLine < declarationLine) {
            this.addFinding(
              `Arrow function '${name}' is used before it is defined.`,
              sourceFile.getFilePath(),
              usageLine
            );
          }
        });
      }
    }

    return this.getFindings();
  }
}

export { UsedBeforeDefinedArrowFunctionsDetector };
