import { SourceFile, Node } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect if interfaces are used before they are defined in the given file.
 */
class UsedBeforeDefinedInterfacesDetector extends DetectorBase {
  constructor() {
    super("UsedBeforeDefinedInterfaces", RiskRating.Medium);
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const interfaceDeclarations: { [name: string]: number } = {};
    const interfaceUsages: { [name: string]: number[] } = {};

    // Traverse the AST to find interfaces and their usages
    sourceFile.forEachDescendant((node: Node) => {
      if (Node.isInterfaceDeclaration(node)) {
        const name = node.getName();
        interfaceDeclarations[name] = node.getStartLineNumber();
      } else if (Node.isIdentifier(node)) {
        const parent = node.getParent();
        if (parent && Node.isTypeReference(parent)) {
          const name = node.getText();

          if (!Array.isArray(interfaceUsages[name])) {
            interfaceUsages[name] = [];
          }

          interfaceUsages[name].push(node.getStartLineNumber());
        }
      }
    });

    // Check for interface usages before their declarations
    for (const [name, usageLines] of Object.entries(interfaceUsages)) {
      if (interfaceDeclarations[name]) {
        const declarationLine = interfaceDeclarations[name];
        usageLines.forEach((usageLine) => {
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

    return this.getFindings();
  }
}

export { UsedBeforeDefinedInterfacesDetector };
