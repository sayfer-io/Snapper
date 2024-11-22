import { promises as fs } from "fs";

import logger from "./utils/logger";
import { Finding } from "./types";
import { enableLogFile, enableLogVerbosity } from "./utils/logger";
import { configureYargs } from "./utils/config";
import { processFiles } from "./processor";
import { generateHtmlReport } from "./utils/htmlReportUtils";
import { generateTimestampFileName } from "./utils/fileUtils";

/**
 * Main function to process TypeScript files based on specified detector(s).
 *
 * @returns {Promise<void>} - A promise that resolves when the processing is complete.
 */
async function main(): Promise<void> {
  const argv = configureYargs();
  if (argv.verbose) {
    enableLogVerbosity(argv.verbose);
  }
  if (argv.logFile) {
    enableLogFile(argv.logFile);
  }

  try {
    const projectPath = argv.path;
    const detectors = argv.detectors;

    if (!projectPath) {
      throw new Error(
        "Project path must be provided as a command line argument."
      );
    }

    logger.info(
      `Starting processing with path: ${projectPath} and detectors: ${
        detectors || "all detectors"
      }`
    );

    const allFindings = await processFiles(projectPath, detectors?.split(","));
    // Check if there are any findings
    if (allFindings.length > 0) {
      // Determine the output file name
      const resultFileName =
        argv.output || generateTimestampFileName("result", "json");

      // Group findings by type
      const groupedFindings = allFindings.reduce((acc, finding) => {
        const { type } = finding;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(finding);
        return acc;
      }, {} as Record<string, typeof allFindings>);

      // Save findings to the output file
      const sortedGroupedFindings = Object.keys(groupedFindings)
        .sort((a, b) => a.localeCompare(b))
        .reduce((acc, type) => {
          acc[type] = groupedFindings[type];
          return acc;
        }, {} as Record<string, typeof allFindings>);

      // Variable holding all findings sorted by type
      const allFindingsSortedByType: Finding[] = Object.values(
        sortedGroupedFindings
      ).flat();

      await fs.writeFile(
        resultFileName,
        JSON.stringify(sortedGroupedFindings, null, 2)
      );
      logger.info(`Results saved to ${resultFileName}`);

      // Generate HTML report if specified
      if (argv.htmlReport) {
        const htmlFileName = generateTimestampFileName("report", "html");
        const htmlContent = generateHtmlReport(allFindingsSortedByType);
        await fs.writeFile(htmlFileName, htmlContent);
        logger.info(`HTML report saved to ${htmlFileName}`);
      }
    } else {
      logger.info("No findings to report.");
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    } else {
      logger.error("An unknown error occurred");
    }
  }
}

main();
