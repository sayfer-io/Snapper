import {Project} from "ts-morph";
import {argv} from 'process';
import {detectConsoleLog} from "./detectors/ConsoleLog";
import {Finding} from "./detectors/types";


// grab from cmd line arg
const projectPath = argv[2];
const project = new Project({
    tsConfigFilePath: `${projectPath}/tsconfig.json`,
});

const files = project.addSourceFilesAtPaths(`${projectPath}/**/*.ts`);

const allFindings: Finding[] = [];

files.forEach(file => {
    let findings = detectConsoleLog(file);
    allFindings.push(...findings);
});

console.log(`Found ${allFindings.length} console logs in ${files.length} files`);
allFindings.forEach(finding => {
    console.log(finding.type);
    console.log(`\t${finding.position.filePath}:${finding.position.lineNum}`);
});