import { createLogger, format, transports } from "winston";
import { TransformableInfo } from "logform";

/**
 * Generates the log format.
 *
 * @returns {Format} - The log format.
 */
const generateLogFormat = () =>
  format.combine(
    format.timestamp(),
    format.printf((info: TransformableInfo) => {
      const { timestamp, level, message } = info as TransformableInfo & {
        timestamp: string;
      };
      return `${timestamp} [${level}]: ${message}`;
    })
  );

const logger = createLogger({
  level: "info",
  format: generateLogFormat(),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), generateLogFormat()),
    }),
  ],
});

/**
 * Sets up the logger based on the verbosity flag.
 *
 * @param {boolean} verbose - Flag to enable verbose logging.
 */
export function enableLogVerbosity(verbose: boolean): void {
  logger.level = verbose ? "debug" : "info";
}

/**
 * Enables logging to a file.
 *
 * @param {string} logFilePath - The path to the log file.
 */
export function enableLogFile(logFilePath: string): void {
  logger.add(
    new transports.File({
      filename: logFilePath,
      format: generateLogFormat(),
    })
  );
}

export default logger;
