import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface DependencyStatus {
  name: string;
  currentVersion: string;
  latestVersion: string;
  hasSecurityIssues: boolean;
}

interface Advisory {
  module_name: string;
  vulnerable_versions: string;
}

/**
 * Get the path to the package.json file in the current working directory.
 * @returns {string} The path to the package.json file.
 */
function getPackageJsonPath(): string {
  return path.resolve(process.cwd(), 'package.json');
}

/**
 * Read and parse the package.json file.
 * @param {string} packageJsonPath - The path to the package.json file.
 * @returns {any} The parsed package.json content.
 * @throws Will throw an error if the package.json file is not found.
 */
function readPackageJson(packageJsonPath: string): any {
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error('package.json not found in the current directory.');
  }
  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
}

/**
 * Get the dependencies from the package.json content.
 * @param {any} packageJson - The parsed package.json content.
 * @returns {Record<string, string>} An object containing all dependencies.
 */
function getDependencies(packageJson: any): Record<string, string> {
  return { ...packageJson.dependencies, ...packageJson.devDependencies };
}

/**
 * Check for outdated dependencies using npm-check-updates.
 * @param {Record<string, string>} dependencies - The current dependencies.
 * @returns {DependencyStatus[]} A list of outdated dependencies with their status.
 */
function checkOutdatedDependencies(dependencies: Record<string, string>): DependencyStatus[] {
  const outdatedDependencies: DependencyStatus[] = [];
  try {
    const outdated = JSON.parse(execSync('npx npm-check-updates --json').toString());
    for (const [name, latestVersion] of Object.entries(outdated)) {
      outdatedDependencies.push({
        name,
        currentVersion: dependencies[name],
        latestVersion: latestVersion as string,
        hasSecurityIssues: false,
      });
    }
  } catch (error) {
    console.error('Error checking for outdated dependencies:', error);
  }
  return outdatedDependencies;
}

/**
 * Check for security issues in the outdated dependencies using npm audit.
 * @param {DependencyStatus[]} outdatedDependencies - The list of outdated dependencies.
 * @returns {string[]} A list of dependencies with security issues.
 */
function checkSecurityIssues(outdatedDependencies: DependencyStatus[]): string[] {
  const securityIssues: string[] = [];
  try {
    const auditReport = JSON.parse(execSync('npm audit --json').toString());
    if (auditReport.advisories) {
      for (const advisory of Object.values(auditReport.advisories) as Advisory[]) {
        const { module_name, vulnerable_versions } = advisory;
        const dependency = outdatedDependencies.find(dep => dep.name === module_name);
        if (dependency) {
          dependency.hasSecurityIssues = true;
        } else {
          securityIssues.push(`${module_name} (${vulnerable_versions})`);
        }
      }
    }
  } catch (error) {
    console.error('Error checking for security issues:', error);
  }
  return securityIssues;
}

/**
 * Log the results of the dependency check.
 * @param {DependencyStatus[]} outdatedDependencies - The list of outdated dependencies.
 * @param {string[]} securityIssues - The list of dependencies with security issues.
 */
function logResults(outdatedDependencies: DependencyStatus[], securityIssues: string[]): void {
  console.log('Outdated Dependencies:');
  outdatedDependencies.forEach(dep => {
    console.log(
      `${dep.name}: ${dep.currentVersion} -> ${dep.latestVersion} ${dep.hasSecurityIssues ? '(Security Issues)' : ''}`
    );
  });

  if (securityIssues.length > 0) {
    console.log('\nDependencies with Security Issues:');
    securityIssues.forEach(issue => console.log(issue));
  }
}

/**
 * Main function to check for outdated dependencies and security issues.
 */
function checkDependencies() {
  try {
    const packageJsonPath = getPackageJsonPath();
    const packageJson = readPackageJson(packageJsonPath);
    const dependencies = getDependencies(packageJson);

    const outdatedDependencies = checkOutdatedDependencies(dependencies);
    const securityIssues = checkSecurityIssues(outdatedDependencies);

    logResults(outdatedDependencies, securityIssues);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
}

checkDependencies();