import * as fs from "fs";
import * as path from "path";
import { SourceFile } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect dependencies with non-exact versions in the package.json file.
 */
class DependencyVersioningDetector extends DetectorBase {
  constructor() {
    super("DependencyVersioning", RiskRating.Medium);
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const filePath = sourceFile.getFilePath();

    if (!this.isPackageJson(filePath)) {
      return [];
    }

    const packageJsonContent = this.readPackageJson(filePath);
    const dependencies = this.extractDependencies(packageJsonContent);

    for (const [dependency, version] of Object.entries(dependencies)) {
      if (this.isNonExactVersion(version)) {
        this.addFinding(
          `Dependency "${dependency}" has a non-exact version "${version}".`,
          sourceFile.getFilePath()
        );
      }
    }

    return this.getFindings();
  }

  /**
   * Checks if the file is package.json.
   * @param {string} filePath - The path of the file.
   * @returns {boolean} - True if the file is package.json, false otherwise.
   */
  private isPackageJson(filePath: string): boolean {
    return path.basename(filePath) === "package.json";
  }

  /**
   * Reads the content of package.json file.
   * @param {string} filePath - The path of the package.json file.
   * @returns {object} - The parsed content of the package.json file.
   */
  private readPackageJson(filePath: string): any {
    const packageJsonContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(packageJsonContent);
  }

  /**
   * Extracts all dependencies from the package.json content.
   * @param {object} packageJson - The parsed content of the package.json file.
   * @returns {Record<string, string>} - An object containing all dependencies.
   */
  private extractDependencies(packageJson: any): Record<string, string> {
    return {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
      ...packageJson.peerDependencies,
      ...packageJson.optionalDependencies,
    };
  }

  /**
   * Checks if a version string is non-exact.
   * @param {string} version - The version string to check.
   * @returns {boolean} - True if the version is non-exact, false otherwise.
   */
  private isNonExactVersion(version: string): boolean {
    return /^[\^~>=]/.test(version);
  }
}

export { DependencyVersioningDetector };
