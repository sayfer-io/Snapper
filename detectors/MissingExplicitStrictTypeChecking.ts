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

    const filePath = sourceFile.getFilePath();
    if (path.basename(filePath) === "tsconfig.json") {
      const tsconfig = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const compilerOptions = tsconfig.compilerOptions || {};

      const missingOptions = [];
      if (compilerOptions.strict) {
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

      if (missingOptions.length > 0) {
        this.addFinding(
          `Missing explicit strict type-checking options: ${missingOptions.join(
            ", "
          )}.`,
          filePath,
          1 // Line number is not available for tsconfig.json files
        );
      }
    }

    return this.getFindings();
  }
}

export { MissingExplicitStrictTypeCheckingDetector };
