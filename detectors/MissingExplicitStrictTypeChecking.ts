import * as fs from "fs";
import * as path from "path";
import { SourceFile } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect missing explicit strict type-checking options in tsconfig.json.
 */
class MissingExplicitStrictTypeCheckingDetector extends DetectorBase {
  constructor() {
    super("MissingExplicitStrictTypeChecking", RiskRating.Medium);
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const findings: Finding[] = [];

    // Get the file path of the source file
    const filePath = sourceFile.getFilePath();
    
    // Check if the current file is tsconfig.json
    if (path.basename(filePath) === "tsconfig.json") {
      // Read and parse the tsconfig.json file
      const tsconfig = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const compilerOptions = tsconfig.compilerOptions || {};

      // Initialize an array to track missing strict type-checking options
      const missingOptions: string[] = [];

      // Check if the strict option is enabled
      if (compilerOptions.strict) {
        // Check for specific missing options
        if (compilerOptions.noImplicitAny !== true) {
          missingOptions.push("noImplicitAny");
        }
        if (compilerOptions.strictBindCallApply !== true) {
          missingOptions.push("strictBindCallApply");
        }
        if (compilerOptions.alwaysStrict !== true) {
          missingOptions.push("alwaysStrict");
        }
      }

      // If any options are missing, add a finding
      if (missingOptions.length > 0) {
        this.addFinding(
          `Missing explicit strict type-checking options: ${missingOptions.join(", ")}.`,
          filePath,
          1 // Line number is not available for tsconfig.json files
        );
      }
    }

    return this.getFindings();
  }
}

export { MissingExplicitStrictTypeCheckingDetector };
