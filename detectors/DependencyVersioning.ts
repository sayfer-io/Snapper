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
    if (!packageJsonContent || Object.keys(packageJsonContent).length === 0) {
      return [];
    }

    const dependencies = this.extractDependencies(
      packageJsonContent,
      "dependencies"
    );
    const devDependencies = this.extractDependencies(
      packageJsonContent,
      "devDependencies"
    );

    // Check both dependencies and devDependencies
    this.checkForNonExactVersions(dependencies, sourceFile);
    this.checkForNonExactVersions(devDependencies, sourceFile);

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
   * @returns {object|null} - The parsed content of the package.json file or null if the file is empty.
   */
  private readPackageJson(filePath: string): any | null {
    try {
      const packageJsonContent = fs.readFileSync(filePath, "utf-8");
      return packageJsonContent ? JSON.parse(packageJsonContent) : null;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error reading package.json file: ${error.message}`);
      } else {
        console.error(`Unknown error reading package.json file: ${error}`);
      }
      return null;
    }
  }

  /**
   * Extracts all dependencies from the package.json file.
   * @param {object} packageJsonContent - The content of the package.json file.
   * @param {string} section - The section to extract (e.g., 'dependencies', 'devDependencies').
   * @returns {object} - The extracted dependencies.
   */
  private extractDependencies(
    packageJsonContent: any,
    section: string
  ): Record<string, string> {
    return packageJsonContent[section] || {};
  }

  /**
   * Checks for non-exact versions in the dependencies.
   * @param {object} dependencies - The list of dependencies to check.
   * @param {SourceFile} sourceFile - The source file.
   */
  private checkForNonExactVersions(
    dependencies: Record<string, string>,
    sourceFile: SourceFile
  ): void {
    for (const [dependency, version] of Object.entries(dependencies)) {
      if (this.isNonExactVersion(version)) {
        this.addFinding(
          `Dependency "${dependency}" has a non-exact version "${version}".`,
          sourceFile.getFilePath()
        );
      }
    }
  }

  /**
   * Determines if the version is non-exact.
   * @param {string} version - The version of the dependency.
   * @returns {boolean} - True if the version is non-exact, false otherwise.
   */
  private isNonExactVersion(version: string): boolean {
    return version.startsWith("^") || version.startsWith("~");
  }
}

export { DependencyVersioningDetector };
