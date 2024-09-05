import { exec } from 'child_process';
import { SourceFile } from 'ts-morph';
import { Finding } from '../types';
import { RiskRating } from '../structures';

/**
 * Runs `npm audit` on the entire package.json file to list all vulnerable libraries.
 * @returns {Promise<any[]>} - A promise that resolves to an array of vulnerabilities.
 */
function auditPackageJson(): Promise<any[]> {
    return new Promise((resolve, reject) => {
        exec('npm audit --json', (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${stderr}`);
                return;
            }

            try {
                const auditResult = JSON.parse(stdout);
                const vulnerabilities = auditResult.advisories ? Object.values(auditResult.advisories) : [];
                resolve(vulnerabilities);
            } catch (parseError: any) {
                reject(`Failed to parse npm audit output: ${parseError.message}`);
            }
        });
    });
}

/**
 * Parses the vulnerabilities and creates findings.
 * @param {any[]} vulnerabilities - The array of vulnerabilities.
 * @param {string} filePath - The path of the file being analyzed.
 * @returns {Finding[]} - Array of findings with dependency vulnerability details.
 */
function createFindings(vulnerabilities: any[], filePath: string): Finding[] {
    const findings: Finding[] = [];

    vulnerabilities.forEach(vulnerability => {
        const { module_name, vulnerable_versions, severity, findings: vulnFindings } = vulnerability;
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
                    riskRating: severity === 'critical' ? RiskRating.Critical : severity === 'high' ? RiskRating.High : severity === 'moderate' ? RiskRating.Medium : RiskRating.Low,
                });
            });
        });
    });

    return findings;
}

/**
 * Detects dependencies with known vulnerabilities in the package.json file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Promise<Finding[]>} - Array of findings with dependency vulnerability details.
 */
export async function detectVulnerableDependencies(file: SourceFile): Promise<Finding[]> {
    try {
        const vulnerabilities = await auditPackageJson();
        return createFindings(vulnerabilities, file.getFilePath());
    } catch (error) {
        console.error(`Failed to get vulnerabilities: ${error}`);
        return [];
    }
}