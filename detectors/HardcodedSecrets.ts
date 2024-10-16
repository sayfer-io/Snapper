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

/**
 * Detector class for identifying hardcoded secrets in code.
 */
class HardcodedSecretsDetector extends DetectorBase {
  // Regular expression patterns to identify different types of hardcoded secrets.
  private static SECRET_PATTERNS: RegExp[] = [
    /^(?:[A-Za-z0-9+/]{4}){2,}(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, // Base64 strings
    /-----BEGIN (RSA|EC|DSA|OPENSSH) PRIVATE KEY-----/, // Private Key Begin
    /-----BEGIN CERTIFICATE-----/, // Certificate Begin
    /\/\/[^\/\s:@]+:[^\/\s:@]+@/, // URL with credentials
    /eyJ[A-Za-z0-9_-]+\.([A-Za-z0-9_-]+\.?){1,2}/, // JWT Token

    // Add more patterns here
  ];

  constructor() {
    super("HardcodedSecrets", RiskRating.High); // Initializes the detector with a name and high risk rating.
  }

  /**
   * Validates if a string is a properly formatted base64 string.
   * @param {string} str - The string to validate.
   * @returns {boolean} - True if the string is a valid base64 string, false otherwise.
   */
  private isValidBase64(str: string): boolean {
    // Check if the string is empty or not the correct length to be a valid base64 string
    if (str.length === 0 || str.length % 4 !== 0) {
      return false; // Return false for empty or improperly sized strings.
    }

    try {
      // Attempt to validate the base64 string by encoding and decoding it.
      return btoa(atob(str)) === str; // Return true if the original string matches the decoded-then-encoded version.
    } catch (err) {
      return false; // Return false if an error occurs during decoding.
    }
  }

  /**
   * Runs the detector on the specified source file to find hardcoded secrets.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about detected hardcoded secrets.
   */
  public run(sourceFile: SourceFile): Finding[] {
    // Only analyze TypeScript files.
    if (!sourceFile.getFilePath().endsWith(".ts")) {
      return this.getFindings(); // Return findings if the file is not TypeScript.
    }

    // Skip test files and mocks.
    if (
      sourceFile.getFilePath().includes(".test.ts") ||
      sourceFile.getFilePath().includes("mock") ||
      sourceFile.getFilePath().includes("__test__")
    ) {
      return this.getFindings(); // Return findings if the file is a test or mock.
    }

    // Get all string literals in the source file.
    const stringLiterals = sourceFile.getDescendantsOfKind(
      SyntaxKind.StringLiteral
    );

    // Process each string literal to check for hardcoded secrets.
    stringLiterals.forEach((node) => {
      const text = node.getText().slice(1, -1); // Remove the surrounding quotes from the string literal.
      if (text.length < 16) return; // Skip strings that are too short to be meaningful.

      // Check each secret pattern against the string.
      HardcodedSecretsDetector.SECRET_PATTERNS.forEach((pattern) => {
        if (pattern.test(text)) { // If the pattern matches the text,
          if (
            pattern === HardcodedSecretsDetector.SECRET_PATTERNS[0] && // If it's a base64 pattern,
            !this.isValidBase64(text) // and it's not a valid base64 string,
          ) {
            return; // Skip this iteration.
          }
          // Add a finding for a potential hardcoded secret.
          this.addFinding(
            `Potential hardcoded secret detected: "${text}"`,
            sourceFile.getFilePath(),
            node.getStartLineNumber() // Log the line number where the secret was found.
          );
        }
      });
    });

    return this.getFindings(); // Return all findings.
  }
}

export { HardcodedSecretsDetector };
