import * as fs from "fs";
import stripJsonComments from "strip-json-comments";
import { SourceFile } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * List of strict type-checking options to check in tsconfig.json.
 */
const STRICT_TYPE_CHECKING_OPTIONS = [
  "strict",
  "noImplicitAny",
  "strictBindCallApply",
  "alwaysStrict",
];

/**
 * Class to detect missing explicit strict type-checking options in tsconfig.json.
 */
class MissingExplicitStrictTypeCheckingDetector extends DetectorBase {
  public allowedFileRegexes: RegExp[] = [/tsconfig\.json$/];

  constructor() {
    super("MissingExplicitStrictTypeChecking", RiskRating.Medium);
  }

  /**
   * Attempts to safely parse JSON content.
   * @param {string} content - The JSON content to parse.
   * @returns {object | null} - Parsed JSON object or null if parsing fails.
   */
  private safeParseJson(content: string): object | null {
    try {
      return JSON.parse(content);
    } catch (error) {
      return null;
    }
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const filePath = sourceFile.getFilePath();

    // Ensure the file is a tsconfig.json file
    if (!this.allowedFileRegexes.some((regex) => regex.test(filePath))) {
      return [];
    }

    // Read the tsconfig.json file
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Clean the file content with `strip-json-comments`
    const cleanedContent = stripJsonComments(fileContent).replace(
      /,(\s*[}\]])/g,
      "$1"
    );

    // Safely parse the cleaned JSON
    const tsconfig = this.safeParseJson(cleanedContent);
    if (!tsconfig || typeof tsconfig !== "object") {
      throw new Error("Malformed JSON content");
    }

    const compilerOptions = (tsconfig as any).compilerOptions || {};

    // Initialize an array to track missing strict type-checking options
    const missingOptions: string[] = [];

    // Check for specific missing options
    STRICT_TYPE_CHECKING_OPTIONS.forEach((option) => {
      if (compilerOptions[option] !== true) {
        missingOptions.push(option);
      }
    });

    // If any options are missing, add a finding
    if (missingOptions.length > 0) {
      this.addFinding(
        `Missing explicit strict type-checking options: ${missingOptions.join(
          ", "
        )}.`,
        filePath,
        1
      );
    }

    return this.getFindings();
  }
}

export { MissingExplicitStrictTypeCheckingDetector };
