import { SourceFile, Node} from 'ts-morph';

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
            const functionName = node.getName();
            if (functionName) {
                const startLineNum = file.getLineAndColumnAtPos(node.getPos()).line;
                functionDeclarations[functionName] = startLineNum;
            }
        } else if (Node.isCallExpression(node)) {
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
    });

    // Check if any function is used before it is defined
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

    return findings;
}