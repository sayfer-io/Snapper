import { SourceFile, SyntaxKind, Node } from 'ts-morph';
import { Finding } from '../types';
import { RiskRating } from '../structures';

const MIN_SECRET_LENGTH = 6;

/**
 * Checks if the given node is a string literal.
 * @param {Node} node - The node to check.
 * @returns {boolean} - True if the node is a string literal, false otherwise.
 */
function isStringLiteral(node: Node): boolean {
    return node.getKind() === SyntaxKind.StringLiteral;
}

/**
 * Creates a finding for a potential hardcoded secret.
 * @param {SourceFile} file - The source file containing the node.
 * @param {Node} node - The node representing the string literal.
 * @param {string} stringValue - The string value of the literal.
 * @returns {Finding} - The finding object.
 */
function createHardcodedSecretFinding(file: SourceFile, node: Node, stringValue: string): Finding {
    const startLineNum = file.getLineAndColumnAtPos(node.getPos()).line;
    return {
        type: "HardcodedSecret",
        description: `Potential hardcoded secret detected: '${stringValue}'.`,
        position: {
            filePath: file.getFilePath(),
            lineNum: startLineNum,
        },
        riskRating: RiskRating.High,
        weight: 3
    };
}

/**
 * Detects hardcoded secrets in the given file.
 * Flags string literals longer than 6 characters as potential hardcoded secrets.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Finding[]} - Array of findings with details about the detected issues.
 */
export function detectHardcodedSecrets(file: SourceFile): Finding[] {
    const findings: Finding[] = [];

    file.forEachDescendant((node: Node) => {
        if (isStringLiteral(node)) {
            const text = node.getText();
            // Remove the surrounding quotes
            const stringValue = text.slice(1, -1);

            if (stringValue.length > MIN_SECRET_LENGTH) {
                findings.push(createHardcodedSecretFinding(file, node, stringValue));
            }
        }
    });

    return findings;
}