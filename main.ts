#!/usr/bin/env node
import { promises as fs } from "fs";

import { Finding } from "./types";
import logger, { enableLogFile, enableLogVerbosity } from "./utils/logger";
import { configureYargs } from "./utils/config";
import { processFiles } from "./processor";
import { generateHtmlReport } from "./utils/htmlReportUtils";
import { generateTimestampFileName } from "./utils/fileUtils";

/**
 * Groups findings by type for better organization.
 *
 * @param {Finding[]} findings - Array of findings.
 * @returns {Record<string, Finding[]>} - Findings grouped by type.
 */
function groupFindingsByType(findings: Finding[]): Record<string, Finding[]> {
  return findings.reduce((acc, finding) => {
    const { type } = finding;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(finding);
    return acc;
  }, {} as Record<string, Finding[]>);
}

/**
 * Saves findings to a JSON file.
 *
 * @param {string} fileName - Name of the output file.
 * @param {Record<string, Finding[]>} findings - Findings grouped by type.
 * @returns {Promise<void>} - A promise that resolves when the file is saved.
 */
async function saveFindingsAsJson(
  fileName: string,
  findings: Record<string, Finding[]>
): Promise<void> {
  const sortedFindings = Object.keys(findings)
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, type) => {
      acc[type] = findings[type];
      return acc;
    }, {} as Record<string, Finding[]>);

  try {
    await fs.writeFile(fileName, JSON.stringify(sortedFindings, null, 2));
    logger.info(`Results saved to ${fileName}`);
  } catch (error) {
    logger.error(
      `Failed to save JSON file: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
}

/**
 * Generates and saves an HTML report.
 *
 * @param {Finding[]} findings - Array of findings sorted by type.
 * @returns {Promise<void>} - A promise that resolves when the file is saved.
 */
async function generateAndSaveHtmlReport(findings: Finding[]): Promise<void> {
  const htmlFileName = generateTimestampFileName("report", "html");
  const htmlContent = generateHtmlReport(findings);

  try {
    await fs.writeFile(htmlFileName, htmlContent);
    logger.info(`HTML report saved to ${htmlFileName}`);
  } catch (error) {
    logger.error(
      `Failed to save HTML report: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
}

/**
 * Main function to process TypeScript files based on specified detector(s).
 *
 * @returns {Promise<void>} - A promise that resolves when the processing is complete.
 */
async function main(): Promise<void> {
  const argv = configureYargs();

  // Enable logging configurations
  if (argv.verbose) enableLogVerbosity(argv.verbose);
  if (argv.logFile) enableLogFile(argv.logFile);

  try {
    const projectPath = argv.path;
    const detectors = argv.detectors?.split(",") ?? [];
    const ignoreDetectors = argv.ignoreDetectors?.split(",") ?? [];
    if (detectors.some((d) => ignoreDetectors.includes(d)))
      throw new Error("Overlap between 'detectors' and 'ignoreDetectors'");

    const filteredDetectors = detectors.filter(
      (d) => !ignoreDetectors.includes(d)
    );

    logger.info(
      `Starting processing with path: ${projectPath} and detectors: ${
        filteredDetectors ?? "all detectors"
      }`
    );

    const findings = await processFiles(projectPath, filteredDetectors);

    if (findings.length === 0) {
      logger.info("No findings to report.");
      return;
    }

    // Process findings
    const groupedFindings = groupFindingsByType(findings);
    const allFindingsSortedByType = Object.values(groupedFindings).flat();

    // Save findings to JSON
    const jsonFileName =
      argv.output ?? generateTimestampFileName("result", "json");
    await saveFindingsAsJson(jsonFileName, groupedFindings);

    // Optionally generate HTML report
    if (argv.htmlReport) {
      await generateAndSaveHtmlReport(allFindingsSortedByType);
    }
  } catch (error) {
    logger.error(
      `Processing failed: ${
        error instanceof Error ? error.message : "An unknown error occurred"
      }`
    );
  }
}

main();
