import * as fs from "fs";
import { SourceFile } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect dependencies with non-exact versions in the package.json file.
 * Non-exact versions (e.g., versions starting with "^" or "~") allow the installation
 * of newer versions of a dependency, which may introduce breaking changes or vulnerabilities.
 */
class DependencyVersioningDetector extends DetectorBase {
  public allowedFileRegexes = [/package\.json$/];

  /**
   * Constructor for the DependencyVersioningDetector.
   * Initializes the detector with a name and assigns a medium-risk rating.
   * @constructor
   */
  constructor() {
    super("DependencyVersioning", RiskRating.Medium);
  }

  /**
   * Runs the detector on the given source file to identify any non-exact versioning in dependencies.
   * This method checks both "dependencies" and "devDependencies" in the package.json file.
   *
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const filePath = sourceFile.getFilePath();

    // Read the contents of package.json
    const packageJsonContent = this.readPackageJson(filePath);
    if (!packageJsonContent || Object.keys(packageJsonContent).length === 0) {
      return [];
    }

    // Extract both dependencies and devDependencies sections
    const dependencies = this.extractDependencies(
      packageJsonContent,
      "dependencies"
    );
    const devDependencies = this.extractDependencies(
      packageJsonContent,
      "devDependencies"
    );

    // Check for non-exact versions in both dependencies and devDependencies
    this.checkForNonExactVersions(dependencies, sourceFile);
    this.checkForNonExactVersions(devDependencies, sourceFile);

    return this.getFindings();
  }

  /**
   * Reads the content of the package.json file and parses it as a JSON object.
   * If the file is empty or there's an error reading it, the method returns null.
   *
   * @param {string} filePath - The path of the package.json file.
   * @returns {object|null} - The parsed content of the package.json file or null if the file is empty or unreadable.
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
   * Extracts all dependencies from the package.json file for a given section.
   * It can extract either "dependencies" or "devDependencies" as specified by the section argument.
   *
   * @param {object} packageJsonContent - The content of the package.json file.
   * @param {string} section - The section to extract (e.g., 'dependencies', 'devDependencies').
   * @returns {object} - An object containing the extracted dependencies.
   */
  private extractDependencies(
    packageJsonContent: any,
    section: string
  ): Record<string, string> {
    return packageJsonContent[section] || {};
  }

  /**
   * Checks for non-exact versions (e.g., versions starting with "^" or "~") in the list of dependencies.
   * For each non-exact version found, a finding is added with the relevant details.
   *
   * @param {object} dependencies - The list of dependencies to check (key-value pairs of dependency names and versions).
   * @param {SourceFile} sourceFile - The source file being analyzed (used to record findings).
   */
  private checkForNonExactVersions(
    dependencies: Record<string, string>,
    sourceFile: SourceFile
  ): void {
    // Iterate through each dependency and check if its version is non-exact
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
   * Determines if a given dependency version is non-exact.
   * Non-exact versions are typically indicated by a caret (^) or tilde (~) at the start of the version string.
   *
   * @param {string} version - The version of the dependency.
   * @returns {boolean} - True if the version is non-exact, false otherwise.
   */
  private isNonExactVersion(version: string): boolean {
    return version.startsWith("^") || version.startsWith("~");
  }
}

export { DependencyVersioningDetector };
