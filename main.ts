import {Project, SyntaxKind} from "ts-morph";
import {argv} from 'process';


// grab from cmd line arg
const projectPath = argv[2];
const project = new Project({
    tsConfigFilePath: `${projectPath}/tsconfig.json`,
});

const files = project.addSourceFilesAtPaths(`${projectPath}/**/*.ts`);

files.forEach(file => {
    const consoleLogs = file.getDescendantsOfKind(SyntaxKind.CallExpression).filter(expression => {
        const expressionText = expression.getExpression().getText();
        return expressionText === "console.log" || expressionText.startsWith("console.");
    });

    if (consoleLogs.length > 0) {
        console.log(`File: ${file.getFilePath()}`);
        consoleLogs.forEach(log => {
            const line = log.getStartLineNumber();
            console.log(`  Console log at line ${line}`);
        });
    }
});
