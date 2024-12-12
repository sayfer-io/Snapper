import path from "path";
import { ESLint } from "eslint";
import { SourceFile } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Detector class that checks a TypeScript file for common issues
 * such as the use of any types, unused variables, unused expressions, and unused labels.
 */
class ESLintingDetector extends DetectorBase {
  /**
   * Regular expressions to match allowed file types.
   * Only files matching these patterns will be processed.
   */
  public allowedFileRegexes: RegExp[] = [/\.ts$/, /\.mts$/, /\.cts$/];

  /**
   * Creates an instance of the ESLintingDetector.
   */
  constructor() {
    super("ESLinting", RiskRating.Low);
  }

  /**
   * Analyzes the given TypeScript file for linting issues.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {Finding[]} - An array of findings.
   */
  public async run(file: SourceFile): Promise<Finding[]> {
    const typescriptConfig = (
      await import("@metamask/eslint-config-typescript")
    ).default;

    const eslint = new ESLint({
      baseConfig: typescriptConfig,
      overrideConfigFile: true,
      cwd: path.dirname(file.getFilePath()),
      ignore: false,
    });

    const results = await eslint.lintText(file.getFullText(), {
      filePath: file.getFilePath(),
    });

    results.forEach((result) => {
      result.messages.forEach((message) => {
        this.addFinding(message.message, file.getFilePath(), message.line);
      });
    });

    return this.getFindings();
  }
}

export { ESLintingDetector };
