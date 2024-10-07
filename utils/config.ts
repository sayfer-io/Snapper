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
    .options({
      path: {
        alias: "p",
        type: "string",
        description: "Project path",
        demandOption: true,
      },
      detector: {
        alias: "d",
        type: "string",
        description: "Specify which detector to run",
      },
      verbose: {
        alias: "v",
        type: "boolean",
        description: "Enable verbose logging",
        default: false,
      },
      recursive: {
        alias: "r",
        type: "boolean",
        description: "Parse projects recursively",
        default: false,
      },
      output: {
        alias: "o",
        type: "string",
        description: "Specify output file",
      },
    })
    .fail((msg, err, yargs) => {
      const errorMessage = err
        ? `Error: ${err.message}`
        : `Error: ${msg || "Unknown argument provided."}`;
      console.error(errorMessage);
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
  logger.level = verbose ? "debug" : "info";
}
