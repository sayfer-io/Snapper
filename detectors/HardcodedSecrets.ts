// TODO: The base64 detection logic is not working as expected.
// Fix the issue and add more patterns to detect hardcoded secrets.

import { SourceFile, SyntaxKind } from "ts-morph";
import { Finding } from "../types";
import { RiskRating } from "../structures";

// List of regular expressions for detecting potential secrets
const SECRET_PATTERNS: RegExp[] = [
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, // Base64 strings
  // /^[0-9a-fA-F]{8,}$/, // Hex strings over 7 characters long
  // Add more patterns here
];

/**
 * Validates if a string is a real base64 string.
 * @param {string} str - The string to validate.
 * @returns {boolean} - True if the string is a valid base64 string, false otherwise.
 */
function isValidBase64(str: string): boolean {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}

/**
 * Detects hardcoded secrets in the given source file.
 * @param {SourceFile} sourceFile - The source file to analyze.
 * @returns {Finding[]} - Array of findings with details about the detected issues.
 */
export function detectHardcodedSecrets(sourceFile: SourceFile): Finding[] {
  const findings: Finding[] = [];
  const stringLiterals = sourceFile.getDescendantsOfKind(
    SyntaxKind.StringLiteral
  );

  stringLiterals.forEach((node) => {
    const text = node.getText().slice(1, -1); // Remove the surrounding quotes
    SECRET_PATTERNS.forEach((pattern) => {
      if (pattern.test(text)) {
        if (pattern === SECRET_PATTERNS[0] && !isValidBase64(text)) {
          return; // Skip if it's not a valid base64 string
        }
        findings.push({
          type: "HardcodedSecret",
          description: `Potential hardcoded secret detected: "${text}"`,
          position: {
            filePath: sourceFile.getFilePath(),
            lineNum: node.getStartLineNumber(),
          },
          riskRating: RiskRating.High,
        });
      }
    });
  });

  return findings;
}
