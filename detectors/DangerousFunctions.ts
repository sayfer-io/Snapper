import { SourceFile, SyntaxKind, CallExpression } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";

/**
 * Structure to hold dangerous functions with their names and weights.
 */
const dangerousFunctions = [
  { name: "dangerouslySetInnerHTML", risk: RiskRating.High },
  { name: "eval", risk: RiskRating.High },
  { name: "signData", risk: RiskRating.High },
  { name: "atob", risk: RiskRating.Informational },
  { name: "btoa", risk: RiskRating.Informational },
  // ... more dangerous functions as needed
];

/**
 * Filters and returns dangerous function call expressions from the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {CallExpression[]} - Array of dangerous function call expressions.
 */
function getDangerousFunctionExpressions(file: SourceFile): CallExpression[] {
  const dangerousFunctionNames = dangerousFunctions.map((func) => func.name);
  const dangerousExpressions: CallExpression[] = [];

  file.forEachDescendant((node) => {
    if (node.getKind() === SyntaxKind.CallExpression) {
      const callExpression = node as CallExpression;
      const expression = callExpression.getExpression().getText();
      if (dangerousFunctionNames.includes(expression)) {
        dangerousExpressions.push(callExpression);
      }
    }
  });

  return dangerousExpressions;
}

/**
 * Creates findings for dangerous function usages in the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Finding[]} - Array of findings with details about the detected issues.
 */
export function detectDangerousFunctions(file: SourceFile): Finding[] {
  const findings: Finding[] = [];
  const dangerousExpressions = getDangerousFunctionExpressions(file);

  dangerousExpressions.forEach((expression) => {
    const functionName = expression.getExpression().getText();
    const dangerousFunction = dangerousFunctions.find(
      (func) => func.name === functionName
    );
    if (dangerousFunction) {
      const startLineNum = file.getLineAndColumnAtPos(expression.getPos()).line;
      findings.push({
        type: "DangerousFunction",
        description: `Usage of dangerous function: ${functionName}`,
        position: {
          filePath: file.getFilePath(),
          lineNum: startLineNum,
        },
        riskRating: dangerousFunction.risk,
      });
    }
  });

  return findings;
}
