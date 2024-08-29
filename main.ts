import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import logger from './logger';

import { promises as fs } from 'fs';
import path from 'path';

import { Project } from "ts-morph";
import { Finding } from "./detectors/types";

import { detectConsoleLog } from "./detectors/ConsoleLog";
import { detectDangerousFunctions } from "./detectors/DangerousFunctions";
// import {detectDependencyOutdated} from "./detectors/DependencyOutdated";
import {detectNonExactDependencies} from "./detectors/DependencyVersioning";
import { log } from 'console';


type RuleFunction = (file: any) => Finding[];

const rules: { [key: string]: RuleFunction } = {
    consoleLog: detectConsoleLog,
    dangerousFunctions: detectDangerousFunctions,
    // dependencyOutdated: detectDependencyOutdated
    dependencyVersioning: detectNonExactDependencies
};

function configureYargs() {
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

function setupLogger(verbose: boolean) {
    if (verbose) {
        logger.level = 'debug';
    }
}

async function findTsConfig(projectPath: string): Promise<string[]> {
    const tsConfigPaths: string[] = [];
    await findTsConfigRecursive(projectPath, tsConfigPaths);
    return tsConfigPaths;
}

async function findTsConfigRecursive(currentPath: string, tsConfigPaths: string[]): Promise<void> {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });

    let foundTsConfig = false;
    for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);
        if (entry.isFile() && entry.name === 'tsconfig.json') {
            tsConfigPaths.push(fullPath);
            foundTsConfig = true;
            break;
        }
    }

    if (!foundTsConfig) {
        for (const entry of entries) {
            if (entry.isDirectory()) {
                await findTsConfigRecursive(path.join(currentPath, entry.name), tsConfigPaths);
            }
        }
    }
}

async function processFiles(projectPath: string, rule?: string, recursive: boolean = false): Promise<Finding[]> {
    const tsConfigPaths = await findTsConfig(projectPath);
    if (tsConfigPaths.length === 0) {
        logger.error(`No tsconfig.json files found in: ${projectPath}`);
        return [];
    }

    const allFindings: Finding[] = [];

    for (const tsConfigPath of tsConfigPaths) {
        const folderPath = path.dirname(tsConfigPath);
        const project = new Project({
            tsConfigFilePath: tsConfigPath,
        });
        logger.debug(`Processing project with tsconfig: ${tsConfigPath}`);

        const files = project.addSourceFilesAtPaths(`${path.dirname(folderPath)}/**/*.ts`);
        logger.info(`Processing files in path: ${path.dirname(folderPath)}`);

        let findingsCount = 0;
        for (const file of files) {
            // logger.debug(`Processing file: ${file.getFilePath()}`);
            const applicableRules = rule && rules[rule] ? [rules[rule]] : Object.values(rules);

            for (const ruleFunction of applicableRules) {
                // logger.debug(`Running rule: ${ruleFunction.name}`);
                const findings = ruleFunction(file);
                // logger.debug(`Found ${findings.length} findings`);
                allFindings.push(...findings);
                findingsCount += findings.length;
            }
        }

        logger.info(`Number of issues found for: ${findingsCount}`);

    }

    return allFindings;
}

async function main() {
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

        console.log(`Found ${allFindings.length} findings in ${allFindings.length} files`);
        // allFindings.forEach(finding => {
        //     logger.info(JSON.stringify(finding, null, 2));
        // });
    } catch (error) {
        if (error instanceof Error) {
            logger.error(error.message);
        } else {
            logger.error("An unknown error occurred");
        }
    }
}

main();