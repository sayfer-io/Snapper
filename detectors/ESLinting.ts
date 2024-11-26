import { ESLint } from "eslint";
import { SourceFile } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Configuration for ESLint to lint TypeScript files.
 */
const modernConfig: ESLint.Options["baseConfig"] = {
  files: ["**/*.ts"],
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
  rules: {
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
  },
  linterOptions: {
    reportUnusedDisableDirectives: "off",
  },
};

/**
 * Detector class that checks a TypeScript file for common issues
 * such as the use of any types, unused variables, unused expressions, and unused labels.
 */
class ESLintingDetector extends DetectorBase {
  /**
   * Regular expressions to match allowed file types.
   * Only files matching these patterns will be processed.
   */
  public allowedFileRegexes: RegExp[] = [/\.ts$/];

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
    const eslint = new ESLint({
      baseConfig: modernConfig,
      overrideConfigFile: true,
      ignore: false,
    });

    const results = await eslint.lintText(file.getFullText());

    results.forEach((result) => {
      result.messages.forEach((message) => {
        this.addFinding(message.message, file.getFilePath(), message.line);
      });
    });

    return this.getFindings();
  }
}

export { ESLintingDetector };
