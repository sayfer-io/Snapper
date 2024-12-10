import { SourceFile, Node } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect if function expressions are used before they are defined in the given file.
 * This detector scans the source code for function expressions and their usages,
 * reporting any instances where a function is called before it is declared.
 */
class UsedBeforeDefinedFunctionsDetector extends DetectorBase {
  constructor() {
    super("UsedBeforeDefinedFunctions", RiskRating.Medium);
  }

  /**
   * Runs the detector on the given source file to identify function expressions
   * that are used before they are defined.
   *
   * This method traverses the Abstract Syntax Tree (AST) of the source file to collect
   * the declarations and usages of function expressions, then checks for any violations
   * of the declaration-before-use rule.
   *
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const functionDeclarations: { [name: string]: number } = {}; // Store function declarations with line numbers
    const functionUsages: { [name: string]: number[] } = {}; // Store usages of functions with their line numbers

    // Traverse the AST to find function expressions and their usages
    sourceFile.forEachDescendant((node: Node) => {
      // Check for variable declarations
      if (Node.isVariableDeclaration(node)) {
        const initializer = node.getInitializer();
        // Identify function expressions as initializers
        if (initializer && Node.isFunctionExpression(initializer)) {
          const name = node.getName(); // Get the function name
          functionDeclarations[name] = node.getStartLineNumber(); // Store the declaration line number
        }
      }
      // Check for call expressions
      else if (Node.isCallExpression(node)) {
        const expression = node.getExpression();
        // Check if the called expression is an identifier
        if (Node.isIdentifier(expression)) {
          const name = expression.getText(); // Get the identifier text

          // Initialize the usage array if not already present
          if (!Array.isArray(functionUsages[name])) {
            functionUsages[name] = [];
          }

          // Store the line number of the usage
          functionUsages[name].push(node.getStartLineNumber());
        }
      }
    });

    // Check for function usages before their declarations
    for (const [name, usageLines] of Object.entries(functionUsages)) {
      if (functionDeclarations[name]) {
        const declarationLine = functionDeclarations[name]; // Get the declaration line
        usageLines.forEach((usageLine) => {
          // Report if the usage line is before the declaration line
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

    // Return all findings collected during the analysis
    return this.getFindings();
  }
}

export { UsedBeforeDefinedFunctionsDetector };
