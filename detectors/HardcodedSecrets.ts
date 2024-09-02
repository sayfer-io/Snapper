import { SourceFile, SyntaxKind, Node, VariableDeclaration } from 'ts-morph';
import { Finding } from '../types';
import { RiskRating } from '../structures';

// Regular expression for detecting potential secrets
const SECRET_PATTERN = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{7,}$/;

/**
 * Checks if the given node is a string literal or a variable declaration with a string initializer.
 * @param {Node} node - The node to check.
 * @returns {boolean} - True if the node is a string literal or a variable declaration with a string initializer, false otherwise.
 */
function isStringLiteralOrVariableWithStringInitializer(node: Node): boolean {
    if (node.getKind() === SyntaxKind.StringLiteral) {
        return true;
    }
    if (node.getKind() === SyntaxKind.VariableDeclaration) {
        const variableDeclaration = node as VariableDeclaration;
        const initializer = variableDeclaration.getInitializer();
        return initializer !== undefined && initializer.getKind() === SyntaxKind.StringLiteral;
    }
    return false;
}

/**
 * Creates a finding for a potential hardcoded secret.
 * @param {SourceFile} file - The source file containing the node.
 * @param {Node} node - The node representing the string literal or variable declaration.
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
        riskRating: RiskRating.High
    };
}

/**
 * Detects hardcoded secrets in the given file.
 * Flags string literals or variable initializers matching the secret pattern as potential hardcoded secrets.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Finding[]} - Array of findings with details about the detected issues.
 */
export function detectHardcodedSecrets(file: SourceFile): Finding[] {
    const findings: Finding[] = [];

    file.forEachDescendant((node: Node) => {
        if (isStringLiteralOrVariableWithStringInitializer(node)) {
            let stringValue: string;
            if (node.getKind() === SyntaxKind.StringLiteral) {
                stringValue = node.getText().slice(1, -1); // Remove the surrounding quotes
            } else {
                const variableDeclaration = node as VariableDeclaration;
                const initializer = variableDeclaration.getInitializer();
                if (initializer) {
                    stringValue = initializer.getText().slice(1, -1); // Remove the surrounding quotes
                } else {
                    return;
                }
            }

            // Check if the string matches the secret pattern
            if (SECRET_PATTERN.test(stringValue)) {
                findings.push(createHardcodedSecretFinding(file, node, stringValue));
            }
        }
    });

    return findings;
}