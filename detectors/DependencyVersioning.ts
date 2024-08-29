import { SourceFile, SyntaxKind, PropertyAssignment, ObjectLiteralElementLike } from "ts-morph";
import { RiskRating } from "../types/structures";
import { Finding } from "../types";

/**
 * Detects dependencies with non-exact versions in the given file.
 * This is a security rule (detector) that checks for dependencies specified with only a minimum version.
 * @param {SourceFile} file - The source file to analyze.
 * @returns {Finding[]} - Array of findings with dependency version details.
 */
export function detectNonExactDependencies(file: SourceFile): Finding[] {
    const findings: Finding[] = [];
    const objectLiterals = file.getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression);

    objectLiterals.forEach((obj) => {
        const properties = obj.getProperties();
        properties.forEach((prop) => {
            if (isNonExactDependency(prop)) {
                const assignment = prop as PropertyAssignment;
                const version = getVersion(assignment);
                findings.push(createFinding(file, assignment, version));
            }
        });
    });

    return findings;
}

/**
 * Checks if a property assignment is a non-exact dependency.
 * @param {ObjectLiteralElementLike} prop - The property assignment to check.
 * @returns {boolean} - True if the property is a non-exact dependency, false otherwise.
 */
function isNonExactDependency(prop: ObjectLiteralElementLike): boolean {
    if (prop.getKind() !== SyntaxKind.PropertyAssignment) return false;
    const assignment = prop as PropertyAssignment;
    const initializer = assignment.getInitializer();
    if (!initializer || SyntaxKind[initializer.getKind()] !== "StringLiteral") return false;
    const version = initializer.getText().replace(/['"]/g, "");
    return /^[\^~]/.test(version);
}

/**
 * Extracts the version string from a property assignment.
 * @param {PropertyAssignment} assignment - The property assignment to extract the version from.
 * @returns {string} - The version string.
 */
function getVersion(assignment: PropertyAssignment): string {
    const initializer = assignment.getInitializer();
    return initializer ? initializer.getText().replace(/['"]/g, "") : "";
}

/**
 * Creates a finding for a non-exact dependency.
 * @param {SourceFile} file - The source file containing the dependency.
 * @param {PropertyAssignment} assignment - The property assignment of the dependency.
 * @param {string} version - The version string of the dependency.
 * @returns {Finding} - The created finding.
 */
function createFinding(file: SourceFile, assignment: PropertyAssignment, version: string): Finding {
    return {
        type: "NonExactDependency",
        description: `Dependency "${assignment.getName()}" has a non-exact version "${version}".`,
        position: {
            filePath: file.getFilePath(),
            lineNum: assignment.getStartLineNumber(),
        },
        riskRating: RiskRating.Medium,
        weight: 5,
    };
}