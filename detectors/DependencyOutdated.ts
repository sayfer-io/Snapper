import os from "os";
import path from "path";
import fs from "fs";
import fsExtra from "fs-extra";
import { rmSync, mkdirSync, readFileSync } from "fs";
import { SourceFile } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";
import { runCommand } from "../utils/commandUtils";

/**
 * Class to detect outdated dependencies in the source code.
 */
class DependencyOutdatedDetector extends DetectorBase {
  constructor() {
    super("DependencyOutdated", RiskRating.Medium);
  }

  /**
   * Detects the package manager being used in the project.
   * @returns {string} - The package manager name ('npm', 'yarn', or 'pnpm').
   */
  private detectPackageManager(workingDir: string): string {
    const packageJsonPath = path.resolve(workingDir, "package.json");

    // Check if package.json exists
    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

        // Check for packageManager field in package.json
        if (packageJson.packageManager) {
          if (packageJson.packageManager.startsWith("yarn")) {
            return "yarn";
          } else if (packageJson.packageManager.startsWith("pnpm")) {
            return "pnpm";
          } else if (packageJson.packageManager.startsWith("npm")) {
            return "npm";
          }
        }

        // Check for Yarn-specific fields in package.json
        if (packageJson.workspaces || packageJson.resolutions) {
          return "yarn";
        }

        if (packageJson.scripts) {
          for (const script of Object.values(packageJson.scripts)) {
            if (typeof script === "string" && script.includes("yarn")) {
              return "yarn";
            }
          }
        }

        if (packageJson.dependencies) {
          for (const dep of Object.values(packageJson.dependencies)) {
            if (typeof dep === "string" && dep.startsWith("workspace:")) {
              return "yarn";
            }
          }
        }
      } catch (error) {
        console.error("Error reading or parsing package.json:", error);
      }
    }

    // Check for lock files
    const yarnLockPath = path.resolve(workingDir, "yarn.lock");
    const pnpmLockPath = path.resolve(workingDir, "pnpm-lock.yaml");
    const npmLockPath = path.resolve(workingDir, "package-lock.json");

    if (fs.existsSync(yarnLockPath)) {
      return "yarn";
    } else if (fs.existsSync(pnpmLockPath)) {
      return "pnpm";
    } else if (fs.existsSync(npmLockPath)) {
      return "npm";
    }

    // Check for Yarn configuration files
    const yarnRcPath = path.resolve(workingDir, ".yarnrc");
    const yarnRcYamlPath = path.resolve(workingDir, ".yarnrc.yml");

    if (fs.existsSync(yarnRcPath) || fs.existsSync(yarnRcYamlPath)) {
      return "yarn";
    }

    // Default to npm if no specific manager is detected
    return "npm";
  }

  /**
   * Creates a lockfile in the temporary directory.
   * @param {string} tempDir - The path to the temporary directory.
   * @param {string} packageManager - The package manager to use ('npm', 'yarn', or 'pnpm').
   */
  private createLockfile(tempDir: string, packageManager: string): void {
    let command: string;

    switch (packageManager) {
      case "pnpm":
        command = `pnpm install --lockfile-only --dir "${tempDir}"`; // 2>/dev/null
        break;
      case "yarn":
        command = `yarn install --ignore-scripts --cwd "${tempDir}"`; // 2>/dev/null
        break;
      case "npm":
        command = `npm install --package-lock-only --legacy-peer-deps --prefix "${tempDir}"`; // 2>/dev/null
        break;
      default:
        throw new Error(`Unsupported package manager: ${packageManager}`);
    }

    try {
      const output = runCommand(command, tempDir);
      this.logDebug(`Lockfile creation output: ${output}`);

      let lockfileName: string;

      switch (packageManager) {
        case "yarn":
          lockfileName = "yarn.lock";
          break;
        case "pnpm":
          lockfileName = "pnpm-lock.yaml";
          break;
        case "npm":
        default:
          lockfileName = "package-lock.json";
          break;
      }

      const lockfilePath = path.join(tempDir, lockfileName);
      if (!fsExtra.existsSync(lockfilePath)) {
        throw new Error(`Failed to create lockfile at ${lockfilePath}`);
      }

      this.logDebug("Lockfile created successfully");
    } catch (error) {
      this.logError(
        `Error creating lockfile with ${packageManager}`,
        error as Error
      );
      throw error;
    }
  }

  /**
   * Runs the audit command in the temporary directory.
   * @param {string} tempDir - The path to the temporary directory.
   * @param {string} packageManager - The package manager to use ('npm' or 'pnpm').
   * @returns {any[]} - An array of vulnerabilities.
   */
  private runAudit(tempDir: string, packageManager: string): any[] {
    let command: string;

    switch (packageManager) {
      case "pnpm":
        command = `pnpm audit --json --dir "${tempDir}"`; // 2>/dev/null
        break;
      case "yarn":
        command = `yarn audit --json --cwd "${tempDir}"`; // 2>/dev/null
        break;
      case "npm":
        command = `npm audit --json --prefix "${tempDir}"`; // 2>/dev/null
        break;
      default:
        throw new Error(`Unsupported package manager: ${packageManager}`);
    }

    const stdout = runCommand(command, tempDir);
    this.logDebug("STDOUT: " + stdout);
    try {
      const auditResult = JSON.parse(stdout);
      return auditResult.advisories
        ? Object.values(auditResult.advisories)
        : [];
    } catch (error) {
      this.logError("Failed to parse audit output as JSON", error as Error);
      return [];
    }
  }

  /**
   * Cleans up the temporary directory.
   * @param {string} tempDir - The path to the temporary directory.
   */
  private cleanUpTempDir(tempDir: string): void {
    rmSync(tempDir, { recursive: true, force: true });
  }

  /**
   * Maps the severity string to a RiskRating enum.
   * @param {string} severity - The severity string.
   * @returns {RiskRating} - The corresponding RiskRating enum value.
   */
  private mapSeverityToRiskRating(severity: string): RiskRating {
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
  private isPackageJson(filePath: string): boolean {
    return path.basename(filePath) === "package.json";
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

    const tempDir = path.join(os.tmpdir(), "dependency-outdated-temp");
    mkdirSync(tempDir, { recursive: true });

    const projectDir = path.dirname(filePath);
    fsExtra.copySync(projectDir, tempDir);

    const packageManager = this.detectPackageManager(tempDir);
    this.logDebug(`Detected package manager: ${packageManager}`);

    this.createLockfile(tempDir, packageManager);

    const vulnerabilities = this.runAudit(tempDir, packageManager);
    this.cleanUpTempDir(tempDir);

    vulnerabilities.forEach((vulnerability) => {
      this.addFinding(
        `Detected vulnerable dependency ${vulnerability.module_name} (${vulnerability.vulnerable_versions})`,
        filePath
      );
    });

    return this.getFindings();
  }
}

export { DependencyOutdatedDetector };
