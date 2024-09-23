import { createLogger, format, transports } from "winston";
import { TransformableInfo } from "logform";

/**
 * Creates a logger instance with specified configuration.
 *
 * The logger is configured to:
 * - Use 'info' as the default logging level.
 * - Colorize the output.
 * - Add timestamps to log messages.
 * - Format log messages as: `timestamp [level]: message`.
 * - Output logs to the console.
 *
 * @returns {Logger} - A configured Winston logger instance.
 */
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf((info: TransformableInfo) => {
      const { timestamp, level, message } = info as TransformableInfo & {
        timestamp: string;
      };
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [new transports.Console()],
});

export default logger;
