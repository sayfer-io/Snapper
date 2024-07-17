import {SourceFile, SyntaxKind} from "ts-morph";

import { Finding } from "./types"; // Ensure this path is correct

export function detectConsoleLog(file: SourceFile): Finding[] {
    const consoleLogs = file.getDescendantsOfKind(SyntaxKind.CallExpression).filter(expression => {
        const expressionText = expression.getExpression().getText();
        return expressionText === "console.log" || expressionText.startsWith("console.");
    });

    return consoleLogs.map(log => {
        const line = log.getStartLineNumber();
        return {
            type: "ConsoleLog",
            description: `Console log at line ${line}`,
            position: {
                filePath: file.getFilePath(),
                lineNum: line
            }
        };
    });
}