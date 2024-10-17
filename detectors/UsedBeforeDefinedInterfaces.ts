import { SourceFile, Node } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect if interfaces are used before they are defined in the given file.
 * This detector checks for instances where an interface is referenced in the code
 * prior to its declaration, which can lead to confusion and errors.
 */
class UsedBeforeDefinedInterfacesDetector extends DetectorBase {
  constructor() {
    super("UsedBeforeDefinedInterfaces", RiskRating.Medium);
  }

  /**
   * Analyzes the provided source file for interface declarations and their usages.
   * It traverses the Abstract Syntax Tree (AST) to identify any usages of interfaces
   * that occur before their respective declarations.
   *
   * @param {SourceFile} sourceFile - The source file to analyze for interface usage.
   * @returns {Finding[]} - An array of findings detailing any interfaces used before declaration.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const interfaceDeclarations: { [name: string]: number } = {}; // Store line numbers of declared interfaces
    const interfaceUsages: { [name: string]: number[] } = {}; // Store line numbers of interface usages

    // Traverse the AST to find interface declarations and their usages
    sourceFile.forEachDescendant((node: Node) => {
      if (Node.isInterfaceDeclaration(node)) {
        const name = node.getName();
        interfaceDeclarations[name] = node.getStartLineNumber(); // Record the declaration line number
      } else if (Node.isIdentifier(node)) {
        const parent = node.getParent();
        if (parent && Node.isTypeReference(parent)) {
          const name = node.getText();

          // Initialize usage array for the identified interface if not present
          if (!Array.isArray(interfaceUsages[name])) {
            interfaceUsages[name] = [];
          }

          interfaceUsages[name].push(node.getStartLineNumber()); // Record usage line number
        }
      }
    });

    // Check for usages before declarations
    for (const [name, usageLines] of Object.entries(interfaceUsages)) {
      if (interfaceDeclarations[name]) {
        const declarationLine = interfaceDeclarations[name];
        usageLines.forEach((usageLine) => {
          // Report any instance of usage occurring before the interface's declaration
          if (usageLine < declarationLine) {
            this.addFinding(
              `Interface '${name}' is used before it is defined.`,
              sourceFile.getFilePath(),
              usageLine
            );
          }
        });
      }
    }

    return this.getFindings(); // Return all collected findings
  }
}

export { UsedBeforeDefinedInterfacesDetector };
