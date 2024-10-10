import { SourceFile, Node } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect if function expressions are used before they are defined in the given file.
 */
class UsedBeforeDefinedFunctionsDetector extends DetectorBase {
  constructor() {
    super("UsedBeforeDefinedFunctions", RiskRating.Medium);
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const functionDeclarations: { [name: string]: number } = {};
    const functionUsages: { [name: string]: number[] } = {};

    // Traverse the AST to find function expressions and their usages
    sourceFile.forEachDescendant((node: Node) => {
      if (Node.isVariableDeclaration(node)) {
        const initializer = node.getInitializer();
        if (initializer && Node.isFunctionExpression(initializer)) {
          const name = node.getName();
          functionDeclarations[name] = node.getStartLineNumber();
        }
      } else if (Node.isCallExpression(node)) {
        const expression = node.getExpression();
        if (Node.isIdentifier(expression)) {
          const name = expression.getText();

          if (!Array.isArray(functionUsages[name])) {
            functionUsages[name] = [];
          }

          functionUsages[name].push(node.getStartLineNumber());
        }
      }
    });

    // Check for function usages before their declarations
    for (const [name, usageLines] of Object.entries(functionUsages)) {
      if (functionDeclarations[name]) {
        const declarationLine = functionDeclarations[name];
        usageLines.forEach((usageLine) => {
          if (usageLine < declarationLine) {
            this.addFinding(
              `Function '${name}' is used before it is defined.`,
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

export { UsedBeforeDefinedFunctionsDetector };
