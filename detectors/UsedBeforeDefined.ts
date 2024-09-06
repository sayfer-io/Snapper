import { SourceFile, Node, FunctionDeclaration, CallExpression } from 'ts-morph';

import { Finding } from '../types';
import { RiskRating } from '../structures';

/**
 * Detects if functions are used before they are defined in the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Finding[]} - Array of findings with details about the detected issues.
 */
export function detectUsedBeforeDefined(file: SourceFile): Finding[] {
    const findings: Finding[] = [];
    const functionDeclarations: { [name: string]: number } = {};
    const functionUsages: { [name: string]: number[] } = {};

    // Traverse the AST to find function declarations and their usages
    file.forEachDescendant((node: Node) => {
        if (Node.isFunctionDeclaration(node)) {
            handleFunctionDeclaration(node as FunctionDeclaration, functionDeclarations, file);
        } else if (Node.isCallExpression(node)) {
            handleCallExpression(node as CallExpression, functionUsages, file);
        }
    });

    // Check if any function is used before it is defined
    checkFunctionUsages(functionUsages, functionDeclarations, findings, file);

    return findings;
}

/**
 * Handles function declaration nodes.
 * @param {FunctionDeclaration} node - The AST node.
 * @param {Object} functionDeclarations - The object to store function declarations.
 * @param {SourceFile} file - The source file.
 */
function handleFunctionDeclaration(node: FunctionDeclaration, functionDeclarations: { [name: string]: number }, file: SourceFile) {
    const functionName = node.getName();
    if (functionName) {
        const startLineNum = file.getLineAndColumnAtPos(node.getPos()).line;
        functionDeclarations[functionName] = startLineNum;
    }
}

/**
 * Handles call expression nodes.
 * @param {CallExpression} node - The AST node.
 * @param {Object} functionUsages - The object to store function usages.
 * @param {SourceFile} file - The source file.
 */
function handleCallExpression(node: CallExpression, functionUsages: { [name: string]: number[] }, file: SourceFile) {
    const expression = node.getExpression();
    if (Node.isIdentifier(expression)) {
        const functionName = expression.getText();
        const startLineNum = file.getLineAndColumnAtPos(node.getPos()).line;
        if (!Array.isArray(functionUsages[functionName])) {
            functionUsages[functionName] = [];
        }
        functionUsages[functionName].push(startLineNum);
    }
}

/**
 * Checks if any function is used before it is defined.
 * @param {Object} functionUsages - The object storing function usages.
 * @param {Object} functionDeclarations - The object storing function declarations.
 * @param {Finding[]} findings - The array to store findings.
 * @param {SourceFile} file - The source file.
 */
function checkFunctionUsages(
    functionUsages: { [name: string]: number[] },
    functionDeclarations: { [name: string]: number },
    findings: Finding[],
    file: SourceFile
) {
    for (const functionName in functionUsages) {
        if (functionUsages.hasOwnProperty(functionName)) {
            const usageLines = functionUsages[functionName];
            const declarationLine = functionDeclarations[functionName];
            if (declarationLine !== undefined) {
                usageLines.forEach(usageLine => {
                    if (usageLine < declarationLine) {
                        findings.push({
                            type: "UsedBeforeDefined",
                            description: `Function '${functionName}' is used before it is defined.`,
                            position: {
                                filePath: file.getFilePath(),
                                lineNum: usageLine,
                            },
                            riskRating: RiskRating.Medium
                        });
                    }
                });
            }
        }
    }
}