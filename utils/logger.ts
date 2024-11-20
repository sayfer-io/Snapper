import { createLogger, format, transports } from "winston";
import { TransformableInfo } from "logform";

/**
 * Generates the log format.
 *
 * This function creates a custom log format using the `winston` library. The format includes the timestamp, log level, and the log message.
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
 * This function allows you to enable or disable verbose logging. When `verbose` is set to `true`, the log level is set to `"debug"`, otherwise, it is set to `"info"`.
 *
 * @param {boolean} verbose - Flag to enable verbose logging.
 */
export function enableLogVerbosity(verbose: boolean): void {
  logger.level = verbose ? "debug" : "info";
}

/**
 * Enables logging to a file.
 *
 * This function adds a file transport to the logger, which will write the logs to the specified file path.
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
