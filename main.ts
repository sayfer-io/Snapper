import { promises as fs } from 'fs';
import { configureYargs, setupLogger } from './utils/config';
import logger from './utils/logger';
import { processFiles } from './processor';
import { generateTimestampFileName } from './utils/fileUtils';

/**
 * Main function to process TypeScript files based on specified rules.
 * 
 * @returns {Promise<void>} - A promise that resolves when the processing is complete.
 */
async function main(): Promise<void> {
    const argv = configureYargs();
    setupLogger(argv.verbose);

    try {
        const projectPath = argv.path;
        const rule = argv.rule;

        if (!projectPath) {
            throw new Error("Project path must be provided as a command line argument.");
        }

        logger.info(`Starting processing with path: ${projectPath} and rule: ${rule || 'all rules'}`);

        const allFindings = await processFiles(projectPath, rule, argv.recursive);

        // Determine the output file name
        const resultFileName = argv.output || generateTimestampFileName('result', 'json');

        // Save findings to the output file
        await fs.writeFile(resultFileName, JSON.stringify(allFindings, null, 2));
        logger.info(`Results saved to ${resultFileName}`);
    } catch (error) {
        if (error instanceof Error) {
            logger.error(error.message);
        } else {
            logger.error("An unknown error occurred");
        }
    }
}

main();