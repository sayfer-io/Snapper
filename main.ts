import { Project } from "ts-morph";
import { argv } from 'process';
import { detectConsoleLog } from "./detectors/ConsoleLog";
import { Finding } from "./detectors/types";

async function processFiles(projectPath: string): Promise<Finding[]> {
    const project = new Project({
        tsConfigFilePath: `${projectPath}/tsconfig.json`,
    });

    const files = project.addSourceFilesAtPaths(`${projectPath}/**/*.ts`);
    const allFindings: Finding[] = [];

    for (const file of files) {
        const findings = detectConsoleLog(file);
        allFindings.push(...findings);
    }

    return allFindings;
}

async function main() {
    try {
        const projectPath = argv[2];
        if (!projectPath) {
            throw new Error("Project path must be provided as a command line argument.");
        }

        const allFindings = await processFiles(projectPath);

        console.log(`Found ${allFindings.length} console logs in ${allFindings.length} files`);
        allFindings.forEach(finding => {
            console.log(`Type: ${finding.type}
                File: ${finding.position.filePath}
                Line: ${finding.position.lineNum}
                Risk Rating: ${finding.riskRating}
                Weight: ${finding.weight}`);
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error processing files:", error.message);
        } else {
            console.error("Unknown error occurred");
        }
    }
}

main();