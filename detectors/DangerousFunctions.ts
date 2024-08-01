import {SourceFile, SyntaxKind} from "ts-morph";

import { Finding } from "./types";

export function detectDangerousFunctions(file: SourceFile): Finding[] {
    const consoleLogs = file.getDescendantsOfKind(SyntaxKind.CallExpression).filter(expression => {
        const expressionText = expression.getExpression().getText();
        return expressionText === "dangerouslySetInnerHTML";
    });

    return consoleLogs.map(log => {
        const line = log.getStartLineNumber();
        return {
            type: "DangerousFunction",
            description: `A dangerous command is being used at line ${line}`,
            position: {
                filePath: file.getFilePath(),
                lineNum: line
            }
        };
    });
}