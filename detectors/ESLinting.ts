import { ESLint } from "eslint";
import { SourceFile } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

// ESLint rules configuration to check for common issues in TypeScript files.
const ESLINT_RULES: ESLint.ConfigData["rules"] = {
  "@typescript-eslint/no-explicit-any": "warn",
  "no-unused-vars": [
    "error",
    { vars: "all", args: "after-used", ignoreRestSiblings: false },
  ],
  "no-unused-expressions": "error",
  "no-unused-labels": "error",
  "import/no-unassigned-import": "error",
  "import/unambiguous": "error",
  "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
  "no-restricted-globals": ["error", "event", "fdescribe"],
};

/**
 * Detector class that checks a TypeScript file for common issues
 * such as the use of any types, unused variables, unused expressions, and unused labels.
 */
class ESLintingDetector extends DetectorBase {
  constructor() {
    super("ESLinting", RiskRating.Low);
  }

  /**
   * Analyzes the given TypeScript file for linting issues.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {Promise<Finding[]>} - A promise that resolves to an array of findings.
   */
  public async run(file: SourceFile): Promise<Finding[]> {
    const eslint = this.createESLintInstance(file);
    const filePath = file.getFilePath();

    const results = await eslint.lintText(file.getFullText(), { filePath });

    results.forEach((result) => {
      result.messages.forEach((message) => {
        this.addFinding(message.message, result.filePath, message.line);
      });
    });

    return this.getFindings();
  }

  /**
   * Creates and configures an ESLint instance for the given source file.
   * @param {SourceFile} file - The source file for which the ESLint instance is created.
   * @returns {ESLint} - The configured ESLint instance.
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
          import: require("eslint-plugin-import"),
        },
        rules: ESLINT_RULES,
        linterOptions: {
          reportUnusedDisableDirectives: "off",
        },
      },
      overrideConfigFile: true,
      ignore: false,
    });
  }
}

export { ESLintingDetector };
