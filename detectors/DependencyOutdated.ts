import path from "path";
import fsExtra from "fs-extra";
import { SourceFile } from "ts-morph";

import { runCommand } from "../utils/commandUtils";
import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";
import {
  createTempDir,
  detectPackageManager,
  detectPackageManagerVersion,
} from "../utils/fileUtils";

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
  public allowedFileRegexes = [/package\.json$/];

  /**
   * Constructor for the DependencyOutdatedDetector.
   * Initializes the detector with a name and assigns a medium-risk rating.
   * @constructor
   */
  constructor() {
    super("DependencyOutdated", RiskRating.Medium);
  }

  /**
   * Ensures Corepack is enabled and prepares the right Yarn version if specified in package.json.
   * @param packageManagerVersion - The package manager version specified in package.json
   */
  private handleCorepack(packageManagerVersion: string): void {
    try {
      // Enable Corepack if it is not already enabled
      this.logDebug("Enabling Corepack...");
      runCommand("corepack enable");

      // Prepare the specified version of Yarn, npm, or pnpm as defined in package.json
      this.logDebug(`Preparing ${packageManagerVersion} version...`);
      runCommand(`corepack prepare ${packageManagerVersion} --activate`);
    } catch (error) {
      this.logError(
        "Failed to enable Corepack or prepare the package manager.",
        error as Error
      );
      throw error;
    }
  }

  /**
   * Fetches the latest version of a package from npm/yarn registry.
   * @param packageName - The name of the package.
   * @returns {string} - The latest version of the package.
   */
  private getLatestVersion(packageName: string): string {
    try {
      const result = runCommand(`npm show ${packageName} version`);
      this.logDebug(`Fetched version for ${packageName}: ${result}`);
      return result.trim();
    } catch (error) {
      this.logError(`Error fetching version for ${packageName}: ${error}`);
      throw error;
    }
  }

  /**
   * Updates the package.json dependencies with the latest version if the version is "workspace:^".
   * Iterates through all dependencies to find and update ones set as "workspace:^".
   * @param tempDir - The temporary directory where the package.json file is located.
   */
  private updateWorkspaceVersions(tempDir: string): void {
    const packageJsonPath = path.resolve(tempDir, "package.json");
    const packageJson = JSON.parse(
      fsExtra.readFileSync(packageJsonPath, "utf8")
    );

    let updated = false;

    // Check both dependencies and devDependencies
    const sections = ["dependencies", "devDependencies"];

    sections.forEach((section) => {
      if (packageJson[section]) {
        Object.keys(packageJson[section]).forEach((packageName) => {
          if (packageJson[section][packageName] === "workspace:^") {
            const latestVersion = this.getLatestVersion(packageName);
            packageJson[section][packageName] = latestVersion;
            this.logDebug(
              `Updated ${packageName} to version ${latestVersion} in package.json`
            );
            updated = true;
          }
        });
      }
    });

    // Remove the workspaces field if it exists
    if (packageJson.workspaces) {
      delete packageJson.workspaces;
      this.logDebug("Removed workspaces field from package.json");
      updated = true;
    }

    // If any updates were made, write them back to package.json
    if (updated) {
      fsExtra.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2)
      );
      this.logInfo("Updated package.json with the latest versions.");
    } else {
      this.logDebug(
        "No dependencies with 'workspace:^' found, no update needed."
      );
    }
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
      yarn: `yarn install --silent`,
      npm: `npm install --silent --package-lock-only --legacy-peer-deps --prefix "${tempDir}"`,
    };

    const command = commands[packageManager];
    if (!command) {
      throw new Error(`Unsupported package manager: ${packageManager}`);
    }

    const output = runCommand(command, tempDir);

    const lockfileNames: { [key: string]: string } = {
      yarn: "yarn.lock",
      pnpm: "pnpm-lock.yaml",
      npm: "package-lock.json",
    };

    const lockfileName = lockfileNames[packageManager];
    const lockfilePath = path.join(tempDir, lockfileName);

    if (!fsExtra.existsSync(lockfilePath)) {
      throw new Error(`Error: ${output}`);
    }

    this.logDebug("Lockfile created successfully");
  }

  /**
   * Runs the audit-ci command and parses the JSON output for vulnerabilities.
   * This method is used to check the project's dependencies for security issues
   * and returns an array of findings based on the audit results.
   *
   * @param {string} tempDir - The path to the temporary directory.
   * @param {string} packageManager - The package manager used in the project.
   * @returns {AuditCIFinding[]} - An array of findings with details about the detected issues.
   */
  private runAuditCi(
    tempDir: string,
    packageManager: string
  ): AuditCIFinding[] {
    if (packageManager !== "npm") {
      this.logDebug("Running npm install to generate package-lock.json...");
      runCommand("npm i --package-lock-only --legacy-peer-deps", tempDir);
    }
    const stdout = runCommand(
      `npx audit-ci --output-format json --pass-enoaudit --report-type full`,
      tempDir
    );

    if (stdout.trim().length === 0) {
      this.logWarning("No output found in audit-ci response.");
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
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - An array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const filePath = sourceFile.getFilePath();
    const tempDir = createTempDir();
    fsExtra.copySync(path.dirname(filePath), tempDir);
    const packageManager = detectPackageManager(tempDir);

    this.logDebug(`Detected package manager: ${packageManager}`);

    const packageManagerVersion = detectPackageManagerVersion(tempDir);
    if (packageManagerVersion) {
      this.handleCorepack(packageManagerVersion);
    }

    this.updateWorkspaceVersions(tempDir);

    try {
      //TODO: Potentionally we may not need to create this, as we are not always using it
      this.logDebug("Creating lockfile...");
      this.createLockfile(tempDir, packageManager);
    } catch (error) {
      this.logError("Failed to create a lockfile. ", error as Error);
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
