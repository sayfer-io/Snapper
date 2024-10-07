import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import logger from "./logger";

/**
 * Configures command-line arguments using yargs.
 *
 * @returns {object} - The parsed command-line arguments.
 */
export function configureYargs() {
  return yargs(hideBin(process.argv))
    .strict() // Ensure only defined options are accepted
    .option("path", {
      alias: "p",
      type: "string",
      description: "Project path",
      demandOption: true,
    })
    .option("detector", {
      alias: "r",
      type: "string",
      description: "Specify which detector to run",
    })
    .option("verbose", {
      alias: "v",
      type: "boolean",
      description: "Enable verbose logging",
      default: false,
    })
    .option("recursive", {
      alias: "R",
      type: "boolean",
      description: "Parse projects recursively",
      default: false,
    })
    .option("output", {
      alias: "o",
      type: "string",
      description: "Specify output file",
    })
    .fail((msg, err, yargs) => {
      if (err) {
        console.error(`Error: ${err.message}`);
      } else {
        console.error(`Error: ${msg || "Unknown argument provided."}`);
      }
      console.log(yargs.help());
      process.exit(1);
    })
    .help().argv as unknown as {
    path: string;
    detector?: string;
    verbose: boolean;
    recursive: boolean;
    output?: string;
  };
}

/**
 * Sets up the logger based on the verbosity flag.
 *
 * @param {boolean} verbose - Flag to enable verbose logging.
 */
export function setupLogger(verbose: boolean) {
  if (verbose) {
    logger.level = "debug";
  }
}
