import {SourceFile} from "ts-morph";
import {ESLint} from 'eslint';

import {Finding} from "../types";
import {RiskRating} from "../structures";
import {DetectorBase} from "./DetectorBase";
import {glob} from "glob";
import path from "path";

class ESLinting extends DetectorBase {
  count = 0;

  constructor() {
    super("ESLinting", RiskRating.Low);
  }


  /**
   * Runs the detector on the given file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {Finding[]} - Array of findings.
   */
  public async run(file: SourceFile): Promise<Finding[]> {
    this.count++;
    if (this.count > 1) {
      return this.getFindings();
    }
    // Instantiate ESLint
    const eslint = new ESLint({
      cwd: file.getDirectoryPath(),
      baseConfig: {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
          parser: require('@typescript-eslint/parser'),
          parserOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
          }
        },
        plugins: {
          "@typescript-eslint": require("@typescript-eslint/eslint-plugin")
        },
        rules: {
          "@typescript-eslint/no-explicit-any": "warn",
          "no-unused-vars": ["error", {"vars": "all", "args": "after-used", "ignoreRestSiblings": false}],
          "no-unused-expressions": "error",
          "no-unused-labels": "error"
        },
      },
      overrideConfigFile: true,
      ignore: false,
    });
    console.log('ESLint instantiated');
    // Lint the target files in another project
    let files = glob.sync("**/*.ts", {cwd: file.getDirectoryPath()});
    files.map(f => path.join(file.getDirectoryPath(), f))
    files = files.filter(f => !f.includes('node_modules'));
    // Lint the files
    const results = await eslint.lintFiles(files);
    console.log('ESLint linted files');

    // Format results to JSON
    const formatter = await eslint.loadFormatter('json');
    const resultText = await formatter.format(results);
    console.log(JSON.stringify(JSON.parse(resultText), null, 2));

    return this.getFindings();
  }
}


export {ESLinting};
