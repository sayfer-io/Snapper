import { createLogger, format, transports } from 'winston';
import { TransformableInfo } from 'logform';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf((info: TransformableInfo) => {
            const { timestamp, level, message } = info as TransformableInfo & { timestamp: string };
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console()
    ],
});

export default logger;