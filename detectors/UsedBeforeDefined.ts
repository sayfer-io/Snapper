import { SourceFile, Node, FunctionDeclaration, CallExpression, InterfaceDeclaration, Identifier } from 'ts-morph';
import { Finding } from '../types';
import { RiskRating } from '../structures';

/**
 * Detects if functions and interfaces are used before they are defined in the given file.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Finding[]} - Array of findings with details about the detected issues.
 */
export function detectUsedBeforeDefined(file: SourceFile): Finding[] {
    const findings: Finding[] = [];
    const functionDeclarations: { [name: string]: number } = {};
    const functionUsages: { [name: string]: number[] } = {};
    const interfaceDeclarations: { [name: string]: number } = {};
    const interfaceUsages: { [name: string]: number[] } = {};

    // Traverse the AST to find function and interface declarations and their usages
    file.forEachDescendant((node: Node) => {
        if (Node.isFunctionDeclaration(node)) {
            handleFunctionDeclaration(node as FunctionDeclaration, functionDeclarations, file);
        } else if (Node.isCallExpression(node)) {
            handleCallExpression(node as CallExpression, functionUsages, file);
        } else if (Node.isInterfaceDeclaration(node)) {
            handleInterfaceDeclaration(node as InterfaceDeclaration, interfaceDeclarations, file);
        } else if (Node.isIdentifier(node)) {
            handleIdentifier(node as Identifier, interfaceUsages, file);
        }
    });

    // Check if any function or interface is used before it is defined
    checkUsages(functionUsages, functionDeclarations, findings, file, "Function");
    checkUsages(interfaceUsages, interfaceDeclarations, findings, file, "Interface");

    return findings;
}

/**
 * Handles function declaration nodes.
 * @param {FunctionDeclaration} node - The AST node.
 * @param {Object} functionDeclarations - The object to store function declarations.
 * @param {SourceFile} file - The source file.
 */
function handleFunctionDeclaration(node: FunctionDeclaration, functionDeclarations: { [name: string]: number }, file: SourceFile) {
    const functionName = node.getName();
    if (functionName) {
        const startLineNum = file.getLineAndColumnAtPos(node.getPos()).line;
        functionDeclarations[functionName] = startLineNum;
    }
}

/**
 * Handles call expression nodes.
 * @param {CallExpression} node - The AST node.
 * @param {Object} functionUsages - The object to store function usages.
 * @param {SourceFile} file - The source file.
 */
function handleCallExpression(node: CallExpression, functionUsages: { [name: string]: number[] }, file: SourceFile) {
    const expression = node.getExpression();
    if (Node.isIdentifier(expression)) {
        const functionName = expression.getText();
        const startLineNum = file.getLineAndColumnAtPos(node.getPos()).line;
        if (!Array.isArray(functionUsages[functionName])) {
            functionUsages[functionName] = [];
        }
        functionUsages[functionName].push(startLineNum);
    }
}

/**
 * Handles interface declaration nodes.
 * @param {InterfaceDeclaration} node - The AST node.
 * @param {Object} interfaceDeclarations - The object to store interface declarations.
 * @param {SourceFile} file - The source file.
 */
function handleInterfaceDeclaration(node: InterfaceDeclaration, interfaceDeclarations: { [name: string]: number }, file: SourceFile) {
    const interfaceName = node.getName();
    if (interfaceName) {
        const startLineNum = file.getLineAndColumnAtPos(node.getPos()).line;
        interfaceDeclarations[interfaceName] = startLineNum;
    }
}

/**
 * Handles identifier nodes to track interface usages.
 * @param {Identifier} node - The AST node.
 * @param {Object} interfaceUsages - The object to store interface usages.
 * @param {SourceFile} file - The source file.
 */
function handleIdentifier(node: Identifier, interfaceUsages: { [name: string]: number[] }, file: SourceFile) {
    const identifierName = node.getText();
    const startLineNum = file.getLineAndColumnAtPos(node.getPos()).line;
    if (!Array.isArray(interfaceUsages[identifierName])) {
        interfaceUsages[identifierName] = [];
    }
    interfaceUsages[identifierName].push(startLineNum);
}

/**
 * Checks if any function or interface is used before it is defined.
 * @param {Object} usages - The object storing usages.
 * @param {Object} declarations - The object storing declarations.
 * @param {Finding[]} findings - The array to store findings.
 * @param {SourceFile} file - The source file.
 * @param {string} type - The type of the entity being checked (Function or Interface).
 */
function checkUsages(
    usages: { [name: string]: number[] },
    declarations: { [name: string]: number },
    findings: Finding[],
    file: SourceFile,
    type: string
) {
    for (const name in usages) {
        if (usages.hasOwnProperty(name)) {
            const usageLines = usages[name];
            const declarationLine = declarations[name];
            if (declarationLine !== undefined) {
                usageLines.forEach(usageLine => {
                    if (usageLine < declarationLine) {
                        findings.push({
                            type: "UsedBeforeDefined",
                            description: `${type} '${name}' is used before it is defined.`,
                            position: {
                                filePath: file.getFilePath(),
                                lineNum: usageLine,
                            },
                            riskRating: RiskRating.Medium
                        });
                    }
                });
            }
        }
    }
}