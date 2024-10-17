import { SourceFile } from "ts-morph";
import { ESLint } from "eslint";
import path from "path";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

// ESLint rules configuration to check for common issues in TypeScript files.
const ESLINT_RULES: ESLint.ConfigData["rules"] = {
  "@typescript-eslint/no-explicit-any": "warn", // Warn for usage of 'any' type.
  "no-unused-vars": [
    "error",
    { vars: "all", args: "after-used", ignoreRestSiblings: false }, // Error for unused variables.
  ],
  "no-unused-expressions": "error", // Error for unused expressions.
  "no-unused-labels": "error", // Error for unused labels.
};

/**
 * Detector class that checks a TypeScript file for common issues
 * such as the use of any types, unused variables, unused expressions, and unused labels.
 */
class ESLintingDetector extends DetectorBase {
  constructor() {
    super("ESLinting", RiskRating.Low); // Initializes with a name and low risk rating.
  }

  /**
   * Analyzes the given TypeScript file for linting issues.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {Promise<Finding[]>} - A promise that resolves to an array of findings.
   */
  public async run(file: SourceFile): Promise<Finding[]> {
    const eslint = this.createESLintInstance(file); // Create an ESLint instance for the file.
    const filePath = file.getFilePath(); // Get the file path for linting.

    const results = await eslint.lintFiles([filePath]); // Lint the file.

    // Process linting results and create findings for any detected issues.
    results.forEach((result) => {
      result.messages.forEach((message) => {
        this.addFinding(message.message, result.filePath, message.line); // Add findings for each message.
      });
    });

    return this.getFindings(); // Return all findings.
  }

  /**
   * Creates and configures an ESLint instance for the given source file.
   * @param {SourceFile} file - The source file for which the ESLint instance is created.
   * @returns {ESLint} - The configured ESLint instance.
   */
  private createESLintInstance(file: SourceFile): ESLint {
    return new ESLint({
      cwd: file.getDirectoryPath(), // Set the current working directory.
      baseConfig: {
        files: [file.getBaseName()], // Specify the file to lint.
        languageOptions: {
          parser: require("@typescript-eslint/parser"), // Use TypeScript parser.
          parserOptions: {
            ecmaVersion: 2020, // Set ECMAScript version.
            sourceType: "module", // Specify module source type.
          },
        },
        plugins: {
          "@typescript-eslint": require("@typescript-eslint/eslint-plugin"), // Use TypeScript ESLint plugin.
        },
        rules: ESLINT_RULES, // Set the defined ESLint rules.
      },
      overrideConfigFile: true, // Override the config file for this instance.
      ignore: false, // Do not ignore any files.
    });
  }
}

export { ESLintingDetector };
