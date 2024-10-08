import path from "path";
import fs from "fs";
import fsExtra from "fs-extra";
import { rmSync, mkdirSync, readFileSync } from "fs";
import { SourceFile } from "ts-morph";
import { runCommand } from "../utils/commandUtils";
import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";
import { createTempDir } from "../utils/fileUtils";

// Add packageName to the Finding type
interface AuditCIFinding {
  description: string;
  severity: RiskRating;
  recommendation?: string;
  affectedVersion?: string;
  link?: string;
  packageName?: string; // Add this line
}

/**
 * Class to detect outdated dependencies in the source code.
 */
class DependencyOutdatedDetector extends DetectorBase {
  constructor() {
    super("DependencyOutdated", RiskRating.Medium);
  }

  private detectPackageManager(workingDir: string): string {
    const packageJsonPath = path.resolve(workingDir, "package.json");

    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
      if (packageJson.packageManager?.startsWith("yarn")) return "yarn";
      if (packageJson.packageManager?.startsWith("pnpm")) return "pnpm";
    }

    return fs.existsSync(path.resolve(workingDir, "yarn.lock"))
      ? "yarn"
      : fs.existsSync(path.resolve(workingDir, "pnpm-lock.yaml"))
      ? "pnpm"
      : "npm";
  }

  private createLockfile(tempDir: string, packageManager: string): void {
    let command: string;

    switch (packageManager) {
      case "pnpm":
        command = `pnpm install --lockfile-only --dir "${tempDir}"`;
        break;
      case "yarn":
        command = `yarn install --ignore-scripts --cwd "${tempDir}"`;
        break;
      case "npm":
        command = `npm install --package-lock-only --legacy-peer-deps --prefix "${tempDir}"`;
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
   * Runs the audit-ci command and parses the JSON output for vulnerabilities.
   * @param {string} tempDir - The path to the temporary directory.
   * @param {string} packageManager - The package manager to use ('npm', 'yarn', or 'pnpm').
   * @returns {AuditCIFinding[]} - An array of findings with details about the detected issues.
   */
  private runAuditCi(
    tempDir: string,
    packageManager: string
  ): AuditCIFinding[] {
    const command = `npx audit-ci --${packageManager} --json --report-type full`;
    const stdout = runCommand(command, tempDir);
    this.logDebug("[DependencyOutdated] Audit-CI output: " + stdout);

    const findings: AuditCIFinding[] = [];

    // Locate the start and end of the JSON block in stdout
    const jsonStart = stdout.indexOf("{");
    const jsonEnd = stdout.lastIndexOf("}") + 1;

    if (jsonStart === -1 || jsonEnd === -1) {
      this.logError(
        "[DependencyOutdated] No JSON output found in audit-ci response."
      );
      return findings;
    }

    try {
      const auditResult = JSON.parse(stdout.slice(jsonStart, jsonEnd));
      const vulnerabilities = auditResult.vulnerabilities;

      for (const [packageName, details] of Object.entries(vulnerabilities)) {
        const detail = details as any;
        const vulnerabilityDescription = detail.via
          .map((v: any) => v.title)
          .join(", ");
        findings.push({
          packageName,
          description: `Vulnerable package ${packageName} found: ${vulnerabilityDescription}`,
          severity: this.mapSeverityToRiskRating(detail.severity),
          recommendation: detail.fixAvailable
            ? `Upgrade to ${detail.fixAvailable.name} version ${detail.fixAvailable.version}`
            : "No fix available",
          affectedVersion: detail.range,
          link: detail.via.map((v: any) => v.url).join(", "),
        });
      }
    } catch (error) {
      this.logError(
        "[DependencyOutdated] Failed to parse audit-ci output as JSON",
        error as Error
      );
    }
    return findings;
  }

  private mapSeverityToRiskRating(severity: string): RiskRating {
    return (
      {
        critical: RiskRating.Critical,
        high: RiskRating.High,
        moderate: RiskRating.Medium,
        low: RiskRating.Low,
      }[severity] || RiskRating.Informational
    );
  }

  public run(sourceFile: SourceFile): Finding[] {
    const filePath = sourceFile.getFilePath();

    if (!filePath.endsWith("package.json")) return [];

    const tempDir = createTempDir();
    fsExtra.copySync(path.dirname(filePath), tempDir);
    const packageManager = this.detectPackageManager(tempDir);

    this.logDebug(`Detected package manager: ${packageManager}`);

    try {
      this.createLockfile(tempDir, packageManager);
    } catch (error) {
      this.logError("Failed to create a lockfile", error as Error);
      return [];
    }

    const vulnerabilities = this.runAuditCi(tempDir, packageManager);

    vulnerabilities.forEach((vulnerability) => {
      const description = `Vulnerability in ${vulnerability.packageName} version ${vulnerability.affectedVersion}: ${vulnerability.description}`;
      this.addFinding(description, filePath, vulnerability.severity);
    });

    return this.getFindings();
  }
}

export { DependencyOutdatedDetector };
