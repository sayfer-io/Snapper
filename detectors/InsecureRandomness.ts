import { SourceFile, SyntaxKind, CallExpression } from 'ts-morph';
import { Finding } from '../types';
import { RiskRating } from '../structures';

/**
 * Gets all call expressions in the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {CallExpression[]} - Array of call expressions.
 */
function getCallExpressions(file: SourceFile): CallExpression[] {
    return file.getDescendantsOfKind(SyntaxKind.CallExpression);
}

/**
 * Detects insecure randomness in the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Finding[]} - Array of findings with insecure randomness details.
 */
export function detectInsecureRandomness(file: SourceFile): Finding[] {
    const callExpressions = getCallExpressions(file);

    const insecureRandomnessExpressions = callExpressions.filter(expression => {
        const expressionText = expression.getExpression().getText();
        return expressionText === 'Math.random';
    });

    return insecureRandomnessExpressions.map(expression => ({
        type: "InsecureRandomness",
        description: `Insecure randomness detected: '${expression.getText()}'. Consider using a cryptographic random number generator.`,
        position: {
            filePath: file.getFilePath(),
            lineNum: expression.getStartLineNumber(),
        },
        riskRating: RiskRating.High,
        weight: 5
    }));
}