import { SourceFile, SyntaxKind, Node, CallExpression, ImportDeclaration } from 'ts-morph';
import { Finding } from '../types';
import { RiskRating } from '../structures';

// Threshold for PBKDF2 iterations
const PBKDF2_ITERATION_THRESHOLD = 10000;

// Non-native cryptography libraries to detect
const NON_NATIVE_CRYPTO_LIBRARIES = ['crypto-js', 'CryptoJS', 'elliptic'];

/**
 * Checks if the given node is a call to PBKDF2 with a low number of iterations.
 * @param {Node} node - The node to check.
 * @returns {boolean} - True if the node is a call to PBKDF2 with a low number of iterations, false otherwise.
 */
function isLowIterationPBKDF2(node: Node): boolean {
    if (node.getKind() === SyntaxKind.CallExpression) {
        const callExpression = node as CallExpression;
        const expression = callExpression.getExpression().getText().toLowerCase();
        if (expression.includes('pbkdf2')) {
            const args = callExpression.getArguments();
            if (args.length >= 4) {
                const iterationsArg = args[2];
                if (iterationsArg.getKind() === SyntaxKind.NumericLiteral) {
                    const iterations = parseInt(iterationsArg.getText(), 10);
                    return iterations < PBKDF2_ITERATION_THRESHOLD;
                }
            }
        }
    }
    return false;
}

/**
 * Checks if the given node is an import declaration of a non-native cryptography library.
 * @param {Node} node - The node to check.
 * @returns {boolean} - True if the node is an import declaration of a non-native cryptography library, false otherwise.
 */
function isNonNativeCryptoLibraryImport(node: Node): boolean {
    if (node.getKind() === SyntaxKind.ImportDeclaration) {
        const importDeclaration = node as ImportDeclaration;
        const moduleSpecifier = importDeclaration.getModuleSpecifier().getText().replace(/['"]/g, '');
        return NON_NATIVE_CRYPTO_LIBRARIES.includes(moduleSpecifier);
    }
    return false;
}

/**
 * Creates a finding for a potential insecure cryptography usage.
 * @param {SourceFile} file - The source file containing the node.
 * @param {Node} node - The node representing the insecure cryptography usage.
 * @param {string} description - The description of the finding.
 * @returns {Finding} - The finding object.
 */
function createInsecureCryptographyFinding(file: SourceFile, node: Node, description: string): Finding {
    const startLineNum = file.getLineAndColumnAtPos(node.getPos()).line;
    return {
        type: "InsecureCryptography",
        description,
        position: {
            filePath: file.getFilePath(),
            lineNum: startLineNum,
        },
        riskRating: RiskRating.High
    };
}

/**
 * Detects insecure cryptography usage in the given file.
 * Flags low iteration PBKDF2 calls and non-native cryptography library imports as potential issues.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Finding[]} - Array of findings with details about the detected issues.
 */
export function detectInsecureCryptography(file: SourceFile): Finding[] {
    const findings: Finding[] = [];

    file.forEachDescendant((node: Node) => {
        if (isLowIterationPBKDF2(node)) {
            findings.push(createInsecureCryptographyFinding(file, node, 'Low number of iterations in PBKDF2.'));
        }
        if (isNonNativeCryptoLibraryImport(node)) {
            findings.push(createInsecureCryptographyFinding(file, node, 'Use of a non-native cryptography library.'));
        }
    });

    return findings;
}