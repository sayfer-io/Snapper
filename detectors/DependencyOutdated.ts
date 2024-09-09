import os from "os";
import path from "path";
import fsExtra from "fs-extra";
import { rmSync, mkdirSync } from "fs";
import { execSync } from "child_process";
import { SourceFile } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";

/**
 * Runs a command in the specified directory.
 * @param {string} command - The command to run.
 * @param {string} tempDir - The path to the temporary directory.
 * @returns {string} - The command's output.
 */
function runCommand(command: string, tempDir: string | null = null): string {
  const originalCwd = process.cwd();
  try {
    if (tempDir) {
      process.chdir(tempDir);
    }
    return execSync(command, { encoding: "utf-8" });
  } catch (err: any) {
    if (err.stdout) {
      return err.stdout.toString();
    }
    console.error(`Error running command: ${command}`, err);
    return "";
  } finally {
    if (tempDir) {
      process.chdir(originalCwd);
    }
  }
}

/**
 * Detects the package manager being used in the project.
 * @returns {string} - The package manager name ('npm' or 'pnpm').
 */
function detectPackageManager(): string {
  return runCommand("pnpm --version") ? "pnpm" : "npm";
}

/**
 * Creates a lockfile in the temporary directory.
 * @param {string} tempDir - The path to the temporary directory.
 * @param {string} packageManager - The package manager to use ('npm' or 'pnpm').
 */
function createLockfile(tempDir: string, packageManager: string): void {
  const command =
    packageManager === "pnpm"
      ? `pnpm install --lockfile-only --dir "${tempDir}"`
      : `npm install --package-lock-only --legacy-peer-deps --prefix "${tempDir}"`;
  runCommand(command, tempDir);
}

/**
 * Runs the audit command in the temporary directory.
 * @param {string} tempDir - The path to the temporary directory.
 * @param {string} packageManager - The package manager to use ('npm' or 'pnpm').
 * @returns {any[]} - An array of vulnerabilities.
 */
function runAudit(tempDir: string, packageManager: string): any[] {
  const command =
    packageManager === "pnpm"
      ? `pnpm audit --json --dir "${tempDir}"`
      : `npm audit --json --loglevel=error --legacy-peer-deps --prefix "${tempDir}"`;

  const stdout = runCommand(command, tempDir);
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
    case "low":
      return RiskRating.Low;
    default:
      return RiskRating.Informational;
  }
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

  const tempDir = path.join(os.tmpdir(), "dependency-outdated-temp");
  mkdirSync(tempDir, { recursive: true });
  console.log("tempDir", tempDir);

  const projectDir = path.dirname(filePath);
  fsExtra.copySync(projectDir, tempDir);

  const packageManager = detectPackageManager();
  createLockfile(tempDir, packageManager);
  const vulnerabilities = runAudit(tempDir, packageManager);
  cleanUpTempDir(tempDir);

  return createFindings(vulnerabilities, filePath);
}

/**
 * Creates findings from the vulnerabilities.
 * @param {any[]} vulnerabilities - The array of vulnerabilities.
 * @param {string} filePath - The path of the file.
 * @returns {Finding[]} - Array of findings with dependency vulnerability details.
 */
function createFindings(vulnerabilities: any[], filePath: string): Finding[] {
  return vulnerabilities.map((vulnerability) => ({
    type: "DependencyVulnerability",
    description: `Detected vulnerable dependency ${vulnerability.module_name}@${vulnerability.findings[0].version} (${vulnerability.vulnerable_versions})`,
    position: {
      filePath,
      lineNum: 1, // Not important for this detector
    },
    riskRating: mapSeverityToRiskRating(vulnerability.severity),
  }));
}
