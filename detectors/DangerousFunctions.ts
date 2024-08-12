import { SourceFile, SyntaxKind, CallExpression } from "ts-morph";
import { RiskRating } from "./structures";
import { Finding } from "./types";

/**
 * Structure to hold dangerous functions with their names and weights.
 */
const dangerousFunctions = [
    { name: "dangerouslySetInnerHTML", weight: 10 },
    { name: "eval", weight: 9 },
    // ... more dangerous functions as needed
];

/**
 * Filters and returns dangerous function call expressions from the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {CallExpression[]} - Array of dangerous function call expressions.
 */
function getDangerousFunctionExpressions(file: SourceFile): CallExpression[] {
    return file
        .getDescendantsOfKind(SyntaxKind.CallExpression)
        .filter((expression) => {
            const expressionText = expression.getExpression().getText();
            return dangerousFunctions.some(func => func.name === expressionText);
        });
}

/**
 * Detects dangerous function calls in the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Finding[]} - Array of findings with dangerous function details.
 */
export function detectDangerousFunctions(file: SourceFile): Finding[] {
    const dangerousFunctionExpressions = getDangerousFunctionExpressions(file);

    return dangerousFunctionExpressions.map((expression) => {
        const line = expression.getStartLineNumber();
        const functionName = expression.getExpression().getText();
        const functionDetails = dangerousFunctions.find(func => func.name === functionName);

        return {
            type: "DangerousFunction",
            description: `A dangerous function "${functionName}" was detected.`,
            position: {
                filePath: file.getFilePath(),
                lineNum: line,
            },
            riskRating: RiskRating.High,
            weight: functionDetails?.weight || 0,
        };
    });
}