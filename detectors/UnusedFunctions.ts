import { SourceFile, SyntaxKind, FunctionDeclaration, CallExpression } from 'ts-morph';
import { Finding } from '../types';
import { RiskRating } from '../structures';

/**
 * Gets all function declarations in the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {FunctionDeclaration[]} - Array of function declarations.
 */
function getFunctionDeclarations(file: SourceFile): FunctionDeclaration[] {
    return file.getFunctions();
}

/**
 * Gets all function call expressions in the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {CallExpression[]} - Array of function call expressions.
 */
function getFunctionCallExpressions(file: SourceFile): CallExpression[] {
    return file.getDescendantsOfKind(SyntaxKind.CallExpression);
}

/**
 * Detects unused functions in the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Finding[]} - Array of findings with unused function details.
 */
export function detectUnusedFunctions(file: SourceFile): Finding[] {
    const functionDeclarations = getFunctionDeclarations(file);
    const functionCallExpressions = getFunctionCallExpressions(file);

    const calledFunctionNames = new Set(
        functionCallExpressions.map(expression => expression.getExpression().getText())
    );

    const unusedFunctions = functionDeclarations.filter(func => {
        const functionName = func.getName();
        return functionName && !calledFunctionNames.has(functionName);
    });

    return unusedFunctions.map(func => ({
        type: "UnusedFunction",
        description: `Function '${func.getName()}' is declared but never used.`,
        position: {
            filePath: file.getFilePath(),
            lineNum: func.getStartLineNumber(),
        },
        riskRating: RiskRating.Low,
        weight: 1
    }));
}