import { SourceFile, SyntaxKind, CallExpression } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";

/**
 * Filters and returns console log expressions from the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {CallExpression[]} - Array of console log call expressions.
 */
function getConsoleLogExpressions(file: SourceFile): CallExpression[] {
    return file
        .getDescendantsOfKind(SyntaxKind.CallExpression)
        .filter((expression) => {
            const expressionText = expression.getExpression().getText();
            return (
                expressionText === "console.log" ||
                expressionText.startsWith("console.")
            );
        });
}

/**
 * Detects console log statements in the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Finding[]} - Array of findings with console log details.
 */
export function detectConsoleLog(file: SourceFile): Finding[] {
    const consoleLogExpressions = getConsoleLogExpressions(file);

    return consoleLogExpressions.map((log) => {
        const line = log.getStartLineNumber();
        return {
            type: "ConsoleLog",
            description: "Presence of console log function detected.",
            position: {
                filePath: file.getFilePath(),
                lineNum: line,
            },
            riskRating: RiskRating.Low
        };
    });
}