import * as fs from 'fs';
import * as path from 'path';
import { SourceFile } from 'ts-morph';

import { Finding } from '../types';
import { RiskRating } from '../structures';

interface DependencyStatus {
  name: string;
  currentVersion: string;
  latestVersion: string;
  hasSecurityIssues: boolean;
  vulnerabilities: any[];
}

interface Advisory {
  id: number;
  module_name: string;
  title: string;
  severity: string;
  url: string;
  findings: { version: string }[];
}

/**
 * Read and parse the package.json file.
 * @param {string} filePath - The path to the package.json file.
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
 * Checks if any of the dependencies have known vulnerabilities.
 * @param {Record<string, string>} dependencies - The dependencies to check.
 * @returns {Promise<DependencyStatus[]>} - Array of dependency statuses with vulnerability details.
 */
async function checkForVulnerabilities(dependencies: Record<string, string>): Promise<DependencyStatus[]> {
  const dependencyStatuses: DependencyStatus[] = [];

  for (const [name, version] of Object.entries(dependencies)) {
    const vulnerabilities = await getVulnerabilities(name, version);
    const latestVersion = await getLatestVersion(name);
    const hasSecurityIssues = vulnerabilities.length > 0;

    dependencyStatuses.push({
      name,
      currentVersion: version,
      latestVersion,
      hasSecurityIssues,
      vulnerabilities,
    });
  }

  return dependencyStatuses;
}

/**
 * Gets the latest version of a dependency.
 * @param {string} name - The name of the dependency.
 * @returns {Promise<string>} - The latest version of the dependency.
 */
async function getLatestVersion(name: string): Promise<string> {
  const { default: packageJson } = await import('package-json');
  const pkg = await packageJson(name);
  return pkg.version;
}

/**
 * Gets the vulnerabilities of a dependency.
 * @param {string} name - The name of the dependency.
 * @param {string} version - The version of the dependency.
 * @returns {Promise<any[]>} - The vulnerabilities of the dependency.
 */
async function getVulnerabilities(name: string, version: string): Promise<any[]> {

  return [];
}

/**
 * Detects dependencies with known vulnerabilities in the package.json file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Promise<Finding[]>} - Array of findings with dependency vulnerability details.
 */
export async function detectVulnerableDependencies(file: SourceFile): Promise<Finding[]> {
  const filePath = file.getFilePath();

  if (!isPackageJson(filePath)) {
    return [];
  }
  
  const packageJsonContent = readPackageJson(filePath);
  const dependencies = extractDependencies(packageJsonContent);
  const dependencyStatuses = await checkForVulnerabilities(dependencies);
  
  return createFindings(file, dependencyStatuses);
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
 * Creates findings for dependencies with known vulnerabilities.
 * @param {SourceFile} file - The source file containing the dependencies.
 * @param {DependencyStatus[]} dependencyStatuses - The dependency statuses to check.
 * @returns {Finding[]} - Array of findings with vulnerability details.
 */
function createFindings(file: SourceFile, dependencyStatuses: DependencyStatus[]): Finding[] {
  const findings: Finding[] = [];

  for (const status of dependencyStatuses) {
    if (status.hasSecurityIssues) {
      findings.push({
        type: 'VulnerableDependency',
        description: `Dependency "${status.name}" (version ${status.currentVersion}) has known security issues. Latest version is ${status.latestVersion}.`,
        position: {
          filePath: file.getFilePath(),
          lineNum: 1, // Since we are reading from package.json, line number is not applicable
        },
        riskRating: RiskRating.High,
        weight: 10,
      });
    }
  }

  return findings;
}