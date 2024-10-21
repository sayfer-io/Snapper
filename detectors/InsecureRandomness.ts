import { SourceFile, SyntaxKind, CallExpression } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Detector for identifying insecure randomness usage in code.
 *
 * This class checks for the usage of insecure randomness functions like Math.random.
 * It extends the DetectorBase class and is assigned a medium risk rating.
 */
class InsecureRandomnessDetector extends DetectorBase {
  // List of notable functions considered insecure
  private static NOTABLE_FUNCTIONS: string[] = ["Math.random"];

  constructor() {
    super("InsecureRandomness", RiskRating.Medium);
  }

  /**
   * Retrieves all call expressions in the given source file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {CallExpression[]} - Array of call expressions found in the file.
   */
  private getCallExpressions(file: SourceFile): CallExpression[] {
    return file.getDescendantsOfKind(SyntaxKind.CallExpression);
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings detailing insecure randomness usage.
   */
  public run(sourceFile: SourceFile): Finding[] {
    // Get all call expressions from the source file
    const callExpressions = this.getCallExpressions(sourceFile);

    // Filter for call expressions that match notable insecure functions
    const insecureRandomnessExpressions = callExpressions.filter(
      (expression) => {
        const expressionText = expression.getExpression().getText();
        return InsecureRandomnessDetector.NOTABLE_FUNCTIONS.includes(
          expressionText
        );
      }
    );

    // Add findings for each insecure randomness expression detected
    insecureRandomnessExpressions.forEach((expression) => {
      this.addFinding(
        `Insecure randomness detected: ${expression.getExpression().getText()}`,
        sourceFile.getFilePath(),
        expression.getStartLineNumber()
      );
    });

    return this.getFindings();
  }
}

export { InsecureRandomnessDetector };
