import { Project, SourceFile, SyntaxKind, FunctionDeclaration, CallExpression } from 'ts-morph';
import { Finding } from '../types';
import { RiskRating } from '../structures';

/**
 * Gets all function declarations in the given files.
 * @param {SourceFile[]} files - The source files to analyze.
 * @returns {FunctionDeclaration[]} - Array of function declarations.
 */
function getAllFunctionDeclarations(files: SourceFile[]): FunctionDeclaration[] {
    return files.flatMap(file => file.getFunctions());
}

/**
 * Gets all function call expressions in the given files.
 * @param {SourceFile[]} files - The source files to analyze.
 * @returns {CallExpression[]} - Array of function call expressions.
 */
function getAllFunctionCallExpressions(files: SourceFile[]): CallExpression[] {
    return files.flatMap(file => file.getDescendantsOfKind(SyntaxKind.CallExpression));
}

/**
 * Identifies unused functions from the given function declarations and call expressions.
 * @param {FunctionDeclaration[]} functionDeclarations - Array of function declarations.
 * @param {Set<string>} calledFunctionNames - Set of called function names.
 * @returns {Finding[]} - Array of findings with unused function details.
 */
function identifyUnusedFunctions(functionDeclarations: FunctionDeclaration[], calledFunctionNames: Set<string>): Finding[] {
    return functionDeclarations
        .filter(func => {
            const functionName = func.getName();
            return functionName && !calledFunctionNames.has(functionName);
        })
        .map(func => ({
            type: "UnusedFunction",
            description: `Function '${func.getName()}' is declared but never used.`,
            position: {
                filePath: func.getSourceFile().getFilePath(),
                lineNum: func.getStartLineNumber(),
            },
            riskRating: RiskRating.Low
        }));
}

/**
 * Detects unused functions in the given source file or project.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Finding[]} - Array of findings with unused function details.
 */
export function detectUnusedFunctions(file: SourceFile): Finding[] {
    if (file.getBaseName() === 'tsconfig.json') {
        const project = new Project({
            tsConfigFilePath: file.getFilePath()
        });

        const sourceFiles = project.getSourceFiles();
        const functionDeclarations = getAllFunctionDeclarations(sourceFiles);
        const functionCallExpressions = getAllFunctionCallExpressions(sourceFiles);

        const calledFunctionNames = new Set(
            functionCallExpressions.map(expression => expression.getExpression().getText())
        );

        return identifyUnusedFunctions(functionDeclarations, calledFunctionNames);
    } 
    // TODO: Implement the case where the input is a single source file.
    // else {
    //     const functionDeclarations = file.getFunctions();
    //     const functionCallExpressions = file.getDescendantsOfKind(SyntaxKind.CallExpression);

    //     const calledFunctionNames = new Set(
    //         functionCallExpressions.map(expression => expression.getExpression().getText())
    //     );

    //     return identifyUnusedFunctions(functionDeclarations, calledFunctionNames);
    // }
    return [];
}