import { SourceFile } from "ts-morph";
import { ESLint } from "eslint";

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

const ESLINT_BASIC_CONFIG: ESLint.Options = {
  baseConfig: {
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },
    rules: ESLINT_RULES,
  },
  overrideConfigFile: true,
  ignore: false,
};

/**
 * Detects common TypeScript issues such as 'any' types, unused variables, expressions, and labels.
 */
class ESLintingDetector extends DetectorBase {
  constructor() {
    super("ESLinting", RiskRating.Low);
  }

  /**
   * Runs the ESLint detector on the provided TypeScript source file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {Promise<Finding[]>} - A promise that resolves with an array of findings.
   */
  public async run(file: SourceFile): Promise<Finding[]> {
    const eslint = new ESLint(ESLINT_BASIC_CONFIG);

    const results = await eslint.lintText(file.getFullText());

    if (results.length) {
      results.forEach(({ messages, filePath }) => {
        messages.forEach(({ message, line }) =>
          this.addFinding(message, filePath, line)
        );
      });
    }

    return this.getFindings();
  }
}

export { ESLintingDetector };
