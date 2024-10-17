/**
 * This file defines a detector that identifies outdated dependencies in the source code.
 * It uses the audit-ci tool to scan for vulnerabilities in the project's dependencies 
 * and flags them as medium-risk issues.
 */

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
 * Extends the DetectorBase class to implement detection functionality for dependency vulnerabilities.
 */
class DependencyOutdatedDetector extends DetectorBase {
  /**
   * Constructor for the DependencyOutdatedDetector.
   * Initializes the detector with a name and assigns a medium-risk rating.
   * @constructor
   */
  constructor() {
    super("DependencyOutdated", RiskRating.Medium);
  }

  /**
   * Creates a lockfile using the specified package manager.
   * This step is required before running the audit-ci tool to ensure that the 
   * correct dependency versions are installed and locked.
   *
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
      // Run the command to generate the lockfile
      const output = runCommand(command, tempDir);
      this.logDebug(`Lockfile creation output: ${output}`);

      // Define the expected lockfile names for different package managers
      const lockfileNames: { [key: string]: string } = {
        yarn: "yarn.lock",
        pnpm: "pnpm-lock.yaml",
        npm: "package-lock.json",
      };

      const lockfileName = lockfileNames[packageManager];
      const lockfilePath = path.join(tempDir, lockfileName);

      // Verify the lockfile was created successfully
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
   * This method is used to check the project's dependencies for security issues 
   * and returns an array of findings based on the audit results.
   *
   * @param {string} tempDir - The path to the temporary directory.
   * @returns {AuditCIFinding[]} - An array of findings with details about the detected issues.
   */
  private runAuditCi(tempDir: string): AuditCIFinding[] {
    const command = `npx audit-ci --output-format json --pass-enoaudit --report-type full`;
    const stdout = runCommand(command, tempDir);

    // Check for any output from the audit-ci command
    if (stdout.trim().length === 0) {
      this.logWarning("No output found in audit-ci response.");
      return [];
    }

    this.logDebug(
      "Audit-CI output: " +
        stdout.split("\n").slice(0, 5).join("\n") +
        "\n...snip..."
    );
    this.logDebug("End of Audit-CI output.");

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

    // Remove the trailing brace from the last object
    jsonObjects[jsonObjects.length - 1] = jsonObjects[
      jsonObjects.length - 1
    ].slice(0, -1);

    // Parse each JSON object and extract the relevant vulnerability data
    jsonObjects.forEach((jsonString) => {
      const auditResult = JSON.parse(jsonString);
      if (!auditResult) return;

      if (auditResult.data) {
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
      } else if (auditResult.vulnerabilities) {
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
              link:
                vulnerability.via
                  .filter((via: any) => typeof via === "object" && via.url)
                  .map((via: any) => via.url)
                  .join(", ") ||
                `https://www.npmjs.com/package/${vulnerability.name}`,
            });
          }
        );
      }
    });

    return findings;
  }

  /**
   * Maps the severity string to a RiskRating enum.
   * This method converts the severity level (e.g., 'critical', 'high') into a corresponding 
   * RiskRating enumeration for use in the findings.
   *
   * @param {string} severity - The severity string returned from the audit-ci report.
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
   * This method first verifies that the source file is a package.json file, then 
   * it creates a temporary directory to copy the project files and runs the audit-ci tool 
   * to identify any outdated dependencies or vulnerabilities.
   *
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - An array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const filePath = sourceFile.getFilePath();

    // Only proceed if the file is a package.json file
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

    // For each vulnerability found, add a finding
    vulnerabilities.forEach((vulnerability) => {
      const description = `Vulnerability in ${vulnerability.packageName} version ${vulnerability.affectedVersion}: ${vulnerability.description}`;
      this.addFinding(description, filePath, vulnerability.severity);
    });

    return this.getFindings();
  }
}

export { DependencyOutdatedDetector };
