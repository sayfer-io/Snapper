import * as fs from "fs";
import * as path from "path";
import { SourceFile } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect if strict null checks are not enabled in tsconfig.json.
 */
class StrictNullChecksDetector extends DetectorBase {
  constructor() {
    super("StrictNullChecks", RiskRating.Low);
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const findings: Finding[] = [];

    const filePath = sourceFile.getFilePath();
    if (path.basename(filePath) === "tsconfig.json") {
      const tsconfig = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      if (
        !tsconfig.compilerOptions ||
        tsconfig.compilerOptions.strict !== true
      ) {
        this.addFinding(
          "Strict null checks are not enabled in tsconfig.json.",
          filePath,
          1 // Line number is not available for tsconfig.json files
        );
      }
    }

    return this.getFindings();
  }
}

export { StrictNullChecksDetector };
