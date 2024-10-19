import yargs from "yargs";
import { hideBin } from "yargs/helpers";

/**
 * Configures command-line arguments using yargs.
 * Only defined options are accepted.
 *
 * @returns {object} - The parsed command-line arguments.
 */
export function configureYargs() {
  return yargs(hideBin(process.argv))
    .strict()
    .options({
      path: {
        alias: "p",
        type: "string",
        description: "Project path",
        demandOption: true,
      },
      detectors: {
        alias: "d",
        type: "string",
        description: "Specify which detector to run, specify multiple detectors with a comma",
      },
      verbose: {
        alias: "v",
        type: "boolean",
        description: "Enable verbose logging",
        default: false,
      },
      output: {
        alias: "o",
        type: "string",
        description: "Specify output file",
      },
      logFile: {
        alias: "l",
        type: "string",
        description: "Specify log file path",
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
    detectors?: string;
    verbose: boolean;
    output?: string;
    logFile?: string;
  };
}
