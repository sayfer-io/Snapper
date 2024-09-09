import * as path from "path";
import { execSync } from "child_process";
import { existsSync, mkdirSync, copyFileSync, rmSync } from "fs";
import { tmpdir } from "os";
import { SourceFile } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";

/**
 * Runs `npm audit` on the specified package.json file to list all vulnerable libraries.
 * This version uses a synchronous alternative and operates in a temporary directory.
 * @param {string} filePath - The path to the package.json file.
 * @returns {any[]} - An array of vulnerabilities.
 */
function auditPackageJsonSync(filePath: string): any[] {
  const tempDir = createTempDir();
  const tempPackageJsonPath = path.join(tempDir, "package.json");

  try {
    copyPackageJson(filePath, tempPackageJsonPath);
    createLockfile(tempDir);
    const vulnerabilities = runNpmAudit(tempDir);
    cleanUpTempDir(tempDir);
    return vulnerabilities;
  } catch (error: any) {
    console.error(`Error: ${error.stderr}`);
    cleanUpTempDir(tempDir);
    return [];
  }
}

/**
 * Creates a temporary directory.
 * @returns {string} - The path to the temporary directory.
 */
function createTempDir(): string {
  const tempDir = path.join(tmpdir(), `audit-${Date.now()}`);
  mkdirSync(tempDir);
  return tempDir;
}

/**
 * Copies the package.json file to the temporary directory.
 * @param {string} sourcePath - The source path of the package.json file.
 * @param {string} destPath - The destination path in the temporary directory.
 */
function copyPackageJson(sourcePath: string, destPath: string): void {
  copyFileSync(sourcePath, destPath);
}

/**
 * Creates a lockfile in the temporary directory.
 * @param {string} tempDir - The path to the temporary directory.
 */
function createLockfile(tempDir: string): void {
  execSync(`npm i --package-lock-only --prefix ${tempDir}`, {
    encoding: "utf-8",
  });
}

/**
 * Runs `npm audit` in the temporary directory.
 * @param {string} tempDir - The path to the temporary directory.
 * @returns {any[]} - An array of vulnerabilities.
 */
function runNpmAudit(tempDir: string): any[] {
  const stdout = execSync(`npm audit --json --force --prefix ${tempDir}`, {
    encoding: "utf-8",
  });
  const auditResult = JSON.parse(stdout);
  return auditResult.advisories ? Object.values(auditResult.advisories) : [];
}

/**
 * Cleans up the temporary directory.
 * @param {string} tempDir - The path to the temporary directory.
 */
function cleanUpTempDir(tempDir: string): void {
  rmSync(tempDir, { recursive: true, force: true });
}

/**
 * Maps the severity string to a RiskRating enum.
 * @param {string} severity - The severity string.
 * @returns {RiskRating} - The corresponding RiskRating enum value.
 */
function mapSeverityToRiskRating(severity: string): RiskRating {
  switch (severity) {
    case "critical":
      return RiskRating.Critical;
    case "high":
      return RiskRating.High;
    case "moderate":
      return RiskRating.Medium;
    default:
      return RiskRating.Low;
  }
}

/**
 * Parses the vulnerabilities and creates findings.
 * @param {any[]} vulnerabilities - The array of vulnerabilities.
 * @param {string} filePath - The path of the file being analyzed.
 * @returns {Finding[]} - Array of findings with dependency vulnerability details.
 */
function createFindings(vulnerabilities: any[], filePath: string): Finding[] {
  return vulnerabilities.flatMap((vulnerability) => {
    const {
      module_name,
      vulnerable_versions,
      severity,
      findings: vulnFindings,
    } = vulnerability;
    return vulnFindings.flatMap((vulnFinding: any) => {
      const { version, paths } = vulnFinding;
      return paths.map((path: any) => ({
        type: "VulnerableDependency",
        description: `Vulnerable dependency detected: ${module_name}@${version} (vulnerable versions: ${vulnerable_versions})`,
        position: {
          filePath,
          lineNum: 1, // Line number is not applicable for dependencies
        },
        riskRating: mapSeverityToRiskRating(severity),
      }));
    });
  });
}

/**
 * Checks if the file is package.json.
 * @param {string} filePath - The path of the file.
 * @returns {boolean} - True if the file is package.json, false otherwise.
 */
function isPackageJson(filePath: string): boolean {
  return path.basename(filePath) === "package.json";
}

/**
 * Detects dependencies with known vulnerabilities in the package.json file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Finding[]} - Array of findings with dependency vulnerability details.
 */
export function detectVulnerableDependencies(file: SourceFile): Finding[] {
  const filePath = file.getFilePath();

  if (!isPackageJson(filePath)) {
    return [];
  }

  const vulnerabilities = auditPackageJsonSync(filePath);
  return createFindings(vulnerabilities, filePath);
}
