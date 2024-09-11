import { SourceFile, SyntaxKind, Node, ImportDeclaration } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect insecure cryptography libraries in the source code.
 */
class InsecureCryptoLibrariesDetector extends DetectorBase {
  // Non-native cryptography libraries to detect
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
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    sourceFile.forEachDescendant((node: Node) => {
      if (node.getKind() === SyntaxKind.ImportDeclaration) {
        const importDeclaration = node as ImportDeclaration;
        const moduleSpecifier = importDeclaration
          .getModuleSpecifier()
          .getText()
          .replace(/['"]/g, "");

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
