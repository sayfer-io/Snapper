import { promises as fs } from "fs";

import logger from "./utils/logger";
import { enableLogFile, enableLogVerbosity } from "./utils/logger";
import { configureYargs } from "./utils/config";
import { processFiles } from "./processor";
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

      // Save findings to the output file
      const sortedFindings = allFindings.sort((a, b) =>
        a.type.localeCompare(b.type)
      );
      await fs.writeFile(
        resultFileName,
        JSON.stringify(sortedFindings, null, 2)
      );
      logger.info(`Results saved to ${resultFileName}`);
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
