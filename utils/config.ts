import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";
import path from "path";

interface CliOptions {
  path: string;
  detectors: string[];
  verbose: boolean;
  output?: string;
  logFile?: string;
}

/**
 * Configures command-line arguments using yargs.
 * Only defined options are accepted.
 *
 * @returns {CliOptions} - The parsed command-line arguments.
 */
export function configureYargs(): CliOptions {
  return yargs(hideBin(process.argv))
    .strict()
    .options({
      path: {
        alias: "p",
        type: "string",
        description: "Project path",
        demandOption: true,
        coerce: (arg: string) => {
          if (!fs.existsSync(arg) || !fs.statSync(arg).isDirectory()) {
            throw new Error(`Invalid project path: ${arg}`);
          }
          return path.resolve(arg);
        },
      },
      detectors: {
        alias: "d",
        type: "array",
        description: "Specify which detectors to run",
        default: [],
        coerce: (arg: string | string[]) =>
          Array.isArray(arg) ? arg : arg.split(","),
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
    .help()
    .parseSync() as CliOptions;
}
