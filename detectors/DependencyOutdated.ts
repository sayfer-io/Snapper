import * as path from "path";
import { exec } from "child_process";
import { SourceFile } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";

/**
 * Runs `npm audit` on the specified package.json file to list all vulnerable libraries.
 * @param {string} filePath - The path to the package.json file.
 * @returns {Promise<any[]>} - A promise that resolves to an array of vulnerabilities.
 */
function auditPackageJson(filePath: string): Promise<any[]> {
  const directoryPath = path.dirname(filePath);

  return new Promise((resolve, reject) => {
    exec(
      `npm audit --json --prefix ${directoryPath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${stderr}`);
          return;
        }

        try {
          const auditResult = JSON.parse(stdout);
          const vulnerabilities = auditResult.advisories
            ? Object.values(auditResult.advisories)
            : [];
          resolve(vulnerabilities);
        } catch (parseError: any) {
          reject(`Failed to parse npm audit output: ${parseError.message}`);
        }
      }
    );
  });
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
  const findings: Finding[] = [];

  vulnerabilities.forEach((vulnerability) => {
    const {
      module_name,
      vulnerable_versions,
      severity,
      findings: vulnFindings,
    } = vulnerability;
    vulnFindings.forEach((vulnFinding: any) => {
      const { version, paths } = vulnFinding;
      paths.forEach((path: any) => {
        findings.push({
          type: "VulnerableDependency",
          description: `Vulnerable dependency detected: ${module_name}@${version} (vulnerable versions: ${vulnerable_versions})`,
          position: {
            filePath,
            lineNum: 1, // Line number is not applicable for dependencies
          },
          riskRating: mapSeverityToRiskRating(severity),
        });
      });
    });
  });

  return findings;
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
 * @returns {Promise<Finding[]>} - Array of findings with dependency vulnerability details.
 */
export async function detectVulnerableDependencies(
  file: SourceFile
): Promise<Finding[]> {
  const filePath = file.getFilePath();

  if (!isPackageJson(filePath)) {
    return [];
  }

  try {
    const vulnerabilities = await auditPackageJson(filePath);
    return createFindings(vulnerabilities, filePath);
  } catch (error) {
    console.error(`Failed to get vulnerabilities: ${error}`);
    return [];
  }
}
