"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_morph_1 = require("ts-morph");
const process_1 = require("process");
const ConsoleLog_1 = require("./detectors/ConsoleLog");
// grab from cmd line arg
const projectPath = process_1.argv[2];
const project = new ts_morph_1.Project({
  tsConfigFilePath: `${projectPath}/tsconfig.json`,
});
const files = project.addSourceFilesAtPaths(`${projectPath}/**/*.ts`);
const allFindings = [];
files.forEach((file) => {
  let findings = (0, ConsoleLog_1.detectConsoleLog)(file);
  allFindings.push(...findings);
});
console.log(
  `Found ${allFindings.length} console logs in ${files.length} files`
);
allFindings.forEach((finding) => {
  console.log(finding.type);
  console.log(`\t${finding.position.filePath}:${finding.position.lineNum}`);
});
