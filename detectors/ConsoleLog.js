"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectConsoleLog = detectConsoleLog;
const ts_morph_1 = require("ts-morph");
function detectConsoleLog(file) {
  const consoleLogs = file
    .getDescendantsOfKind(ts_morph_1.SyntaxKind.CallExpression)
    .filter((expression) => {
      const expressionText = expression.getExpression().getText();
      return (
        expressionText === "console.log" ||
        expressionText.startsWith("console.")
      );
    });
  return consoleLogs.map((log) => {
    const line = log.getStartLineNumber();
    return {
      type: "ConsoleLog",
      description: `Console log at line ${line}`,
      position: {
        filePath: file.getFilePath(),
        lineNum: line,
      },
    };
  });
}
