import { SourceFile, SyntaxKind } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";

// List of regular expressions for detecting potential secrets
const SECRET_PATTERNS: RegExp[] = [
  /^[A-Za-z0-9+/]{8,}={0,2}$/, // Base64 strings over 7 characters long
  /^[0-9a-fA-F]{8,}$/, // Hex strings over 7 characters long
  /^[0-9a-f]{40,}$/i, // SHA-X hashes
  // Add more patterns here
];

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
