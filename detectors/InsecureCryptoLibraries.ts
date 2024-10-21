import { SourceFile, SyntaxKind, Node, ImportDeclaration } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect insecure cryptography libraries in the source code.
 */
class InsecureCryptoLibrariesDetector extends DetectorBase {
  // List of non-native cryptography libraries to detect
  private static NON_NATIVE_CRYPTO_LIBRARIES = [
    "crypto-js",
    "CryptoJS",
    "elliptic",
  ];

  constructor() {
    super("InsecureCryptoLibraries", RiskRating.High);
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    // Traverse each descendant node in the source file
    sourceFile.forEachDescendant((node: Node) => {
      // Check if the node is an import declaration
      if (node.getKind() === SyntaxKind.ImportDeclaration) {
        const importDeclaration = node as ImportDeclaration;
        // Get the module specifier, removing surrounding quotes
        const moduleSpecifier = importDeclaration
          .getModuleSpecifier()
          .getText()
          .replace(/['"]/g, "");

        // Check if the module specifier is in the list of non-native libraries
        if (
          InsecureCryptoLibrariesDetector.NON_NATIVE_CRYPTO_LIBRARIES.includes(
            moduleSpecifier
          )
        ) {
          this.addFinding(
            "Use of a non-native cryptography library.",
            sourceFile.getFilePath(),
            sourceFile.getLineAndColumnAtPos(node.getPos()).line
          );
        }
      }
    });

    return this.getFindings();
  }
}

export { InsecureCryptoLibrariesDetector };
