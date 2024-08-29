import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import logger from './logger';

import { Project } from "ts-morph";
import { Finding } from "./detectors/types";

import { detectConsoleLog } from "./detectors/ConsoleLog";
import { detectDangerousFunctions } from "./detectors/DangerousFunctions";

type RuleFunction = (file: any) => Finding[];

const rules: { [key: string]: RuleFunction } = {
    consoleLog: detectConsoleLog,
    dangerousFunctions: detectDangerousFunctions,
};

async function processFiles(projectPath: string, rule?: string): Promise<Finding[]> {
    const project = new Project({
        tsConfigFilePath: `${projectPath}/tsconfig.json`,
    });

    const files = project.addSourceFilesAtPaths(`${projectPath}/**/*.ts`);
    const allFindings: Finding[] = [];

    logger.info(`Processing files in path: ${projectPath}`);

    for (const file of files) {
        logger.debug(`Processing file: ${file.getFilePath()}`);
        if (rule && rules[rule]) {
            logger.debug(`Running rule: ${rule}`);
            const findings = rules[rule](file);
            allFindings.push(...findings);
        } else {
            for (const ruleFunction of Object.values(rules)) {
                // logger.debug(`Running rule: ${ruleName}`);
                const findings = ruleFunction(file);
                allFindings.push(...findings);
            }
        }
    }

    return allFindings;
}

async function main() {
    const argv = yargs(hideBin(process.argv))
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
    .argv as unknown as {
        path: string;
        rule?: string;
        verbose?: boolean;
    };

    try {
        const projectPath = argv.path;
        const rule = argv.rule;

        if (argv.verbose) {
            logger.level = 'debug';
        }

        if (!projectPath) {
            throw new Error("Project path must be provided as a command line argument.");
        }

        logger.info(`Starting processing with path: ${projectPath} and rule: ${rule || 'all rules'}`);

        const allFindings = await processFiles(projectPath, rule);

        console.log(`Found ${allFindings.length} findings in ${allFindings.length} files`);
        allFindings.forEach(finding => {
            logger.info(JSON.stringify(finding, null, 2));
        });
    } catch (error) {
        if (error instanceof Error) {
            logger.error(error.message);
        } else {
            logger.error("An unknown error occurred");
        }
    }
}

main();