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
    const commands: { [key: string]: string } = {
      pnpm: `pnpm install --silent --lockfile-only --dir "${tempDir}"`,
      yarn: `yarn install --silent --cwd "${tempDir}"`,
      npm: `npm install --silent --package-lock-only --legacy-peer-deps --prefix "${tempDir}"`,
    };

    const command = commands[packageManager];
    if (!command) {
      throw new Error(`Unsupported package manager: ${packageManager}`);
    }

    try {
      const output = runCommand(command, tempDir);
      this.logDebug(`Lockfile creation output: ${output}`);

      const lockfileNames: { [key: string]: string } = {
        yarn: "yarn.lock",
        pnpm: "pnpm-lock.yaml",
        npm: "package-lock.json",
      };

      const lockfileName = lockfileNames[packageManager];
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
    const stdout = runCommand(command, tempDir);
    this.logDebug("Audit-CI output: " + stdout);
    this.logDebug("End of Audit-CI output.");

    if (stdout.trim().length === 0) {
      this.logError("No output found in audit-ci response.");
      return [];
    }

    const findings: AuditCIFinding[] = [];
    const jsonObjects = stdout
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
      if (!auditResult) return;

      if (auditResult.data && auditResult.data.advisory) {
        const advisory = auditResult.data.advisory;

        findings.push({
          packageName: advisory.module_name,
          description: advisory.title,
          severity: this.mapSeverityToRiskRating(advisory.severity),
          recommendation: advisory.recommendation || "No fix available",
          affectedVersion: advisory.vulnerable_versions,
          link: advisory.references
            .split("\n")
            .filter((url: string) => url.trim().startsWith("http"))
            .join(", "),
        });
      }

      if (auditResult.auditReportVersion && auditResult.vulnerabilities) {
        Object.values(auditResult.vulnerabilities).forEach(
          (vulnerability: any) => {
            findings.push({
              packageName: vulnerability.name,
              description: `Vulnerability in ${vulnerability.name}`,
              severity: this.mapSeverityToRiskRating(vulnerability.severity),
              recommendation: vulnerability.fixAvailable
                ? "Update to a fixed version"
                : "No fix available",
              affectedVersion: vulnerability.range,
              link: `https://www.npmjs.com/package/${vulnerability.name}`,
            });
          }
        );
      }
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
