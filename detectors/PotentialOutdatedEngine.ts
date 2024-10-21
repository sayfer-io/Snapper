import * as fs from "fs";
import { SourceFile } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect potential outdated engine specifications in package.json files.
 */
class PotentialOutdatedEngineDetector extends DetectorBase {
  public allowedFileRegexes: RegExp[] = [/package\.json$/];

  constructor() {
    super("PotentialOutdatedEngine", RiskRating.Low);
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const filePath = sourceFile.getFilePath();
    // Only process package.json files
    const packageJson = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Check for missing or outdated Node.js engine specification
    if (!packageJson.engines || !packageJson.engines.node) {
      this.addFinding(
        "Missing or outdated Node.js engine specification in package.json.",
        filePath,
        1 // Line number is not available for package.json files
      );
    }

    return this.getFindings();
  }
}

export { PotentialOutdatedEngineDetector };
