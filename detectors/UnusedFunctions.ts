import { Project, SourceFile, SyntaxKind, FunctionDeclaration, CallExpression } from 'ts-morph';
import { Finding } from '../types';
import { RiskRating } from '../structures';

/**
 * Gets all function declarations in the given project.
 * @param {SourceFile[]} files - The source files to analyze.
 * @returns {FunctionDeclaration[]} - Array of function declarations.
 */
function getAllFunctionDeclarations(files: SourceFile[]): FunctionDeclaration[] {
    return files.flatMap(file => file.getFunctions());
}

/**
 * Gets all function call expressions in the given project.
 * @param {SourceFile[]} files - The source files to analyze.
 * @returns {CallExpression[]} - Array of function call expressions.
 */
function getAllFunctionCallExpressions(files: SourceFile[]): CallExpression[] {
    return files.flatMap(file => file.getDescendantsOfKind(SyntaxKind.CallExpression));
}

/**
 * Detects unused functions in the given project.
 * @param {Project} project - The project to analyze.
 * @returns {Finding[]} - Array of findings with unused function details.
 */
export function detectUnusedFunctions(project: Project): Finding[] {
    // TODO: Check if this correctly gets all source files.
    const sourceFiles = project.getSourceFiles();
    const functionDeclarations = getAllFunctionDeclarations(sourceFiles);
    const functionCallExpressions = getAllFunctionCallExpressions(sourceFiles);

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
            filePath: func.getSourceFile().getFilePath(),
            lineNum: func.getStartLineNumber(),
        },
        riskRating: RiskRating.Low,
        weight: 1
    }));
}