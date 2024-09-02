import path from 'path';
import { Project } from 'ts-morph';
import logger from './utils/logger';
import { findTsConfig } from './utils/fileUtils';
import { Finding } from './types';
import { 
    detectConsoleLog, 
    detectDangerousFunctions, 
    detectNonExactDependencies, 
    detectVulnerableDependencies,
    detectUnusedFunctions,
    detectInsecureRandomness
} from './detectors';

type RuleFunction = (file: any) => Finding[];

const rules: { [key: string]: RuleFunction } = {
    consoleLog: detectConsoleLog,
    dangerousFunctions: detectDangerousFunctions,
    dependencyVersioning: detectNonExactDependencies,
    // dependencyOutdated: detectVulnerableDependencies
    unusedFunctions: detectUnusedFunctions,
    insecureRandomness: detectInsecureRandomness
};

/**
 * Processes files in a TypeScript project to find issues based on specified rules.
 * 
 * @param {string} projectPath - The path to the TypeScript project.
 * @param {string} [rule] - The specific rule to apply. If not provided, all rules will be applied.
 * @param {boolean} [recursive=false] - Whether to process projects recursively.
 * @returns {Promise<Finding[]>} - A promise that resolves to an array of findings.
 */
export async function processFiles(projectPath: string, rule?: string, recursive: boolean = false): Promise<Finding[]> {
    const tsConfigPaths = await findTsConfig(projectPath);
    if (tsConfigPaths.length === 0) {
        logger.error(`No tsconfig.json files found in: ${projectPath}`);
        return [];
    }

    const allFindings: Finding[] = [];

    for (const tsConfigPath of tsConfigPaths) {
        const folderPath = path.dirname(tsConfigPath);
        const project = new Project({ tsConfigFilePath: tsConfigPath });
        logger.debug(`Processing project with tsconfig: ${tsConfigPath}`);

        const files = project.addSourceFilesAtPaths([
            `${folderPath}/**/*.ts`,
            `${folderPath}/**/package.json`
        ]);
        logger.info(`Processing files in path: ${folderPath}`);

        let findingsCount = 0;
        for (const file of files) {
            logger.debug(`Processing file: ${file.getFilePath()}`);
            const applicableRules = rule && rules[rule] ? [rules[rule]] : Object.values(rules);

            for (const ruleFunction of applicableRules) {
                logger.debug(`Running rule: ${ruleFunction.name}`);
                const findings = ruleFunction(file);
                logger.debug(`Found ${findings.length} findings`);
                allFindings.push(...findings);
                findingsCount += findings.length;
            }
        }

        logger.info(`Number of issues found for ${tsConfigPath}: ${findingsCount}`);
    }

    logger.info(`Total number of issues found: ${allFindings.length}`);
    return allFindings;
}