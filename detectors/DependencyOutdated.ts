import path from "path";
import fsExtra from "fs-extra";
import { SourceFile } from "ts-morph";
import { runCommand } from "../utils/commandUtils";
import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";
import { createTempDir, detectPackageManager } from "../utils/fileUtils";

interface AuditCIFinding {
  description: string;
  severity: RiskRating;
  recommendation?: string;
  affectedVersion?: string;
  link?: string;
  packageName?: string;
}

/**
 * Class to detect outdated dependencies in the source code.
 */
class DependencyOutdatedDetector extends DetectorBase {
  constructor() {
    super("DependencyOutdated", RiskRating.Medium);
  }

  /**
   * Creates a lockfile using the specified package manager.
   * @param {string} tempDir - The path to the temporary directory.
   * @param {string} packageManager - The package manager to use ('npm', 'yarn', or 'pnpm').
   * @throws Will throw an error if the lockfile creation fails.
   */
  private createLockfile(tempDir: string, packageManager: string): void {
    let command: string;

    switch (packageManager) {
      case "pnpm":
        command = `pnpm install --silent --lockfile-only --dir "${tempDir}"`;
        break;
      case "yarn":
        command = `yarn install --no-progress --silent --cwd "${tempDir}"`;
        break;
      case "npm":
        command = `npm install --silent --package-lock-only --legacy-peer-deps --prefix "${tempDir}"`;
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
   * @returns {AuditCIFinding[]} - An array of findings with details about the detected issues.
   */
  private runAuditCi(tempDir: string): AuditCIFinding[] {
    const command = `npx audit-ci --output-format json --report-type full`;
    let stdout = runCommand(command, tempDir);
    this.logDebug("Audit-CI output: " + stdout);
    this.logDebug("End of Audit-CI output.");

    if (stdout.trim().length === 0) {
      this.logError("No output found in audit-ci response.");
      return [];
    }

    const findings: AuditCIFinding[] = [];

    let jsonObjects = stdout
      .trim()
      .split("\n}\n")
      .map((obj) => obj.trim() + "}")
      .filter(Boolean);

    if (jsonObjects.length < 1) {
      this.logError("No JSON output found in audit-ci response.");
      return findings;
    }

    jsonObjects[jsonObjects.length - 1] = jsonObjects[
      jsonObjects.length - 1
    ].slice(0, -1);

    jsonObjects.forEach((jsonString) => {
      const auditResult = JSON.parse(jsonString);
      if (!auditResult || !auditResult.data || !auditResult.data.advisory)
        return;

      const advisory = auditResult.data.advisory;

      const vulnerabilityURLs = advisory.references
        .split("\n")
        .filter((url: string) => url.trim().startsWith("http"))
        .join(", ");

      const recommendation = advisory.recommendation || "No fix available";

      findings.push({
        packageName: advisory.module_name,
        description: advisory.title,
        severity: this.mapSeverityToRiskRating(advisory.severity),
        recommendation: recommendation,
        affectedVersion: advisory.vulnerable_versions,
        link: vulnerabilityURLs,
      });
    });

    return findings;
  }

  /**
   * Maps the severity string to a RiskRating enum.
   * @param {string} severity - The severity string.
   * @returns {RiskRating} - The corresponding RiskRating enum.
   */
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

  /**
   * Runs the dependency outdated detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - An array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const filePath = sourceFile.getFilePath();

    if (!filePath.endsWith("package.json")) return [];

    const tempDir = createTempDir();
    fsExtra.copySync(path.dirname(filePath), tempDir);
    const packageManager = detectPackageManager(tempDir);

    this.logDebug(`Detected package manager: ${packageManager}`);

    try {
      this.createLockfile(tempDir, packageManager);
    } catch (error) {
      this.logError("Failed to create a lockfile", error as Error);
      return [];
    }

    const vulnerabilities = this.runAuditCi(tempDir);

    vulnerabilities.forEach((vulnerability) => {
      const description = `Vulnerability in ${vulnerability.packageName} version ${vulnerability.affectedVersion}: ${vulnerability.description}`;
      this.addFinding(description, filePath, vulnerability.severity);
    });

    return this.getFindings();
  }
}

export { DependencyOutdatedDetector };
