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
   * Runs the detector on the given source file to check for strict null checks in tsconfig.json.
   * 
   * This function reads the tsconfig.json file and evaluates the compilerOptions.
   * If strict null checks are not enabled, it adds a finding indicating this issue.
   * 
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - An array of findings that detail any issues detected regarding strict null checks.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const findings: Finding[] = [];

    const filePath = sourceFile.getFilePath();
    // Process only the tsconfig.json file
    if (path.basename(filePath) === "tsconfig.json") {
      // Read and parse the tsconfig.json file
      const tsconfig = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      // Check if strict null checks are enabled
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

    // Return any findings collected during the analysis
    return this.getFindings();
  }
}

export { StrictNullChecksDetector };
