import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import logger from './logger';

/**
 * Configures command-line arguments using yargs.
 * 
 * @returns {object} - The parsed command-line arguments.
 */
export function configureYargs() {
    return yargs(hideBin(process.argv))
        .option('path', {
            alias: 'p',
            type: 'string',
            description: 'Project path',
            demandOption: true
        })
        .option('rule', {
            alias: 'r',
            type: 'string',
            description: 'Optional rule argument'
        })
        .option('verbose', {
            alias: 'v',
            type: 'boolean',
            description: 'Enable verbose logging',
            default: false
        })
        .option('recursive', {
            alias: 'R',
            type: 'boolean',
            description: 'Parse projects recursively',
            default: false
        })
        .argv as unknown as {
            path: string;
            rule?: string;
            verbose: boolean;
            recursive: boolean;
        };
}

/**
 * Sets up the logger based on the verbosity flag.
 * 
 * @param {boolean} verbose - Flag to enable verbose logging.
 */
export function setupLogger(verbose: boolean) {
    if (verbose) {
        logger.level = 'debug';
    }
}