import { SourceFile, Node } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect if arrow functions are used before they are defined in the given file.
 * This detector scans the source code for arrow function declarations and their usages,
 * reporting any instances where an arrow function is called before it is declared.
 */
class UsedBeforeDefinedArrowFunctionsDetector extends DetectorBase {
  constructor() {
    super("UsedBeforeDefinedArrowFunctions", RiskRating.Medium);
  }

  /**
   * Runs the detector on the given source file to identify arrow functions
   * that are used before they are defined.
   *
   * This method traverses the Abstract Syntax Tree (AST) of the source file to collect
   * the declarations and usages of arrow functions, then checks for any violations
   * of the declaration-before-use rule.
   *
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const arrowFunctionDeclarations: { [name: string]: number } = {}; // Store arrow function declarations with line numbers
    const arrowFunctionUsages: { [name: string]: number[] } = {}; // Store usages of arrow functions with their line numbers

    // Traverse the AST to find arrow functions and their usages
    sourceFile.forEachDescendant((node: Node) => {
      // Check for variable declarations
      if (Node.isVariableDeclaration(node)) {
        const initializer = node.getInitializer();
        // Identify arrow function initializers
        if (initializer && Node.isArrowFunction(initializer)) {
          const name = node.getName(); // Get the function name
          arrowFunctionDeclarations[name] = node.getStartLineNumber(); // Store the declaration line number
        }
      }
      // Check for identifier usages
      else if (Node.isIdentifier(node)) {
        const parent = node.getParent();
        // Identify function call expressions
        if (parent && Node.isCallExpression(parent)) {
          const name = node.getText(); // Get the identifier text

          // Initialize the usage array if not already present
          if (!Array.isArray(arrowFunctionUsages[name])) {
            arrowFunctionUsages[name] = [];
          }

          // Store the line number of the usage
          arrowFunctionUsages[name].push(node.getStartLineNumber());
        }
      }
    });

    // Check for arrow function usages before their declarations
    for (const [name, usageLines] of Object.entries(arrowFunctionUsages)) {
      if (arrowFunctionDeclarations[name]) {
        const declarationLine = arrowFunctionDeclarations[name]; // Get the declaration line
        usageLines.forEach((usageLine) => {
          // Report if the usage line is before the declaration line
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

    // Return all findings collected during the analysis
    return this.getFindings();
  }
}

export { UsedBeforeDefinedArrowFunctionsDetector };
