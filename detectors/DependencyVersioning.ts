
import * as fs from 'fs';
import * as path from 'path';
import { SourceFile } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";

/**
 * Detects dependencies with non-exact versions in the package.json file.
 * This is a security rule (detector) that checks for dependencies specified with only a minimum version.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Finding[]} - Array of findings with dependency version details.
 */
export function detectNonExactDependencies(file: SourceFile): Finding[] {
    const filePath = file.getFilePath();

    if (!isPackageJson(filePath)) {
        return [];
    }

    const packageJsonContent = readPackageJson(filePath);
    const dependencies = extractDependencies(packageJsonContent);

    return findNonExactDependencies(file, dependencies);
}

/**
 * Checks if the file is package.json.
 * @param {string} filePath - The path of the file.
 * @returns {boolean} - True if the file is package.json, false otherwise.
 */
function isPackageJson(filePath: string): boolean {
    return path.basename(filePath) === 'package.json';
}

/**
 * Reads the content of package.json file.
 * @param {string} filePath - The path of the package.json file.
 * @returns {object} - The parsed content of the package.json file.
 */
function readPackageJson(filePath: string): any {
    const packageJsonContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(packageJsonContent);
}

/**
 * Extracts all dependencies from the package.json content.
 * @param {object} packageJson - The parsed content of the package.json file.
 * @returns {Record<string, string>} - An object containing all dependencies.
 */
function extractDependencies(packageJson: any): Record<string, string> {
    return {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
        ...packageJson.peerDependencies,
        ...packageJson.optionalDependencies,
    };
}

/**
 * Finds dependencies with non-exact versions.
 * @param {SourceFile} file - The source file containing the dependencies.
 * @param {Record<string, string>} dependencies - The dependencies to check.
 * @returns {Finding[]} - Array of findings with non-exact dependency version details.
 */
function findNonExactDependencies(file: SourceFile, dependencies: Record<string, string>): Finding[] {
    const findings: Finding[] = [];

    for (const [dependency, version] of Object.entries(dependencies)) {
        if (isNonExactVersion(version)) {
            findings.push(createFinding(file, dependency, version));
        }
    }

    return findings;
}

/**
 * Checks if a version string is non-exact.
 * @param {string} version - The version string to check.
 * @returns {boolean} - True if the version is non-exact, false otherwise.
 */
function isNonExactVersion(version: string): boolean {
    return /^[\^~>=]/.test(version);
}

/**
 * Creates a finding for a non-exact dependency.
 * @param {SourceFile} file - The source file containing the dependency.
 * @param {string} dependency - The name of the dependency.
 * @param {string} version - The version string of the dependency.
 * @returns {Finding} - The created finding.
 */
function createFinding(file: SourceFile, dependency: string, version: string): Finding {
    return {
        type: "NonExactDependency",
        description: `Dependency "${dependency}" has a non-exact version "${version}".`,
        position: {
            filePath: file.getFilePath(),
            lineNum: 1, // Since we are reading from package.json, line number is not applicable
        },
        riskRating: RiskRating.Medium
    };
}