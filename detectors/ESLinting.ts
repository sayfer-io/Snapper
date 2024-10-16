import { SourceFile } from "ts-morph";
import { ESLint } from "eslint";
import path from "path";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

const ESLINT_RULES: ESLint.ConfigData["rules"] = {
  "@typescript-eslint/no-explicit-any": "warn",
  "no-unused-vars": [
    "error",
    { vars: "all", args: "after-used", ignoreRestSiblings: false },
  ],
  "no-unused-expressions": "error",
  "no-unused-labels": "error",
};

/**
 * Checks a TypeScript file for common issues like the use of any types,
 * unused variables, unused expressions, and unused labels.
 */
class ESLintingDetector extends DetectorBase {
  constructor() {
    super("ESLinting", RiskRating.Low);
  }

  /**
   * Runs the detector on the given file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {Promise<Finding[]>} - Array of findings.
   */
  public async run(file: SourceFile): Promise<Finding[]> {
    const eslint = this.createESLintInstance(file);
    const filePath = file.getFilePath();

    const results = await eslint.lintFiles([filePath]);

    results.forEach((result) => {
      result.messages.forEach((message) => {
        this.addFinding(message.message, result.filePath, message.line);
      });
    });

    return this.getFindings();
  }

  /**
   * Creates an ESLint instance with the specified configuration.
   * @param {SourceFile} file - The source file for ESLint.
   * @returns {ESLint} - The ESLint instance.
   */
  private createESLintInstance(file: SourceFile): ESLint {
    return new ESLint({
      cwd: file.getDirectoryPath(),
      baseConfig: {
        files: [file.getBaseName()],
        languageOptions: {
          parser: require("@typescript-eslint/parser"),
          parserOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
          },
        },
        plugins: {
          "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
        },
        rules: ESLINT_RULES,
      },
      overrideConfigFile: true,
      ignore: false,
    });
  }
}

export { ESLintingDetector };
