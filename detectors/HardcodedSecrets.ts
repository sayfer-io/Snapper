// TODO:
// 1. Fix the issue with the isValidBase64 function.
//    - The current implementation incorrectly identifies strings such as
//      "location", "filePath", "iconPath", and "registry" as valid base64 strings.
//    - Ensure that the function accurately validates base64 strings.
// 2. Add more patterns to the SECRET_PATTERNS array to detect additional types of hardcoded secrets.
//
// To reproduce the issue, run the following command in the terminal:
// $ npx ts-node main.ts --path '.\testcases\Injection Flaws\push-protocol-snaps\snap' --verbose --detector hardcodedSecret

import { SourceFile, SyntaxKind } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

class HardcodedSecretsDetector extends DetectorBase {
  private static SECRET_PATTERNS: RegExp[] = [
    /^(?:[A-Za-z0-9+/]{4}){2,}(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, // Base64 strings
    // /^[0-9a-fA-F]{8,}$/, // Hex strings over 7 characters long
    /-----BEGIN (RSA|EC|DSA|OPENSSH) PRIVATE KEY-----/, // Private Key Begin
    // Add more patterns here
  ];

  constructor() {
    super("HardcodedSecrets", RiskRating.High);
  }

  /**
   * Validates if a string is a real base64 string.
   * @param {string} str - The string to validate.
   * @returns {boolean} - True if the string is a valid base64 string, false otherwise.
   */
  private isValidBase64(str: string): boolean {
    // Check if the string is empty or not the right length to be a valid base64 string
    if (str.length === 0 || str.length % 4 !== 0) {
      return false;
    }

    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const stringLiterals = sourceFile.getDescendantsOfKind(
      SyntaxKind.StringLiteral
    );

    stringLiterals.forEach((node) => {
      const text = node.getText().slice(1, -1); // Remove the surrounding quotes
      HardcodedSecretsDetector.SECRET_PATTERNS.forEach((pattern) => {
        if (text.length < 16) {
          return; // Skip if the string is too short
        }
        if (pattern.test(text)) {
          if (
            pattern === HardcodedSecretsDetector.SECRET_PATTERNS[0] &&
            !this.isValidBase64(text)
          ) {
            return; // Skip if it's not a valid base64 string
          }
          this.addFinding(
            `Potential hardcoded secret detected: "${text}"`,
            sourceFile.getFilePath(),
            node.getStartLineNumber()
          );
        }
      });
    });

    return this.getFindings();
  }
}

export { HardcodedSecretsDetector };
