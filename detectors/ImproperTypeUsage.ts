import {
  SourceFile,
  SyntaxKind,
  VariableDeclaration,
  ParameterDeclaration,
  ObjectBindingPattern,
} from "ts-morph";
import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Class to detect improper usage of 'any' type in TypeScript code.
 */
class ImproperTypeUsageDetector extends DetectorBase {
  constructor() {
    super("ImproperTypeUsage", RiskRating.Medium);
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {Finding[]} - List of findings.
   */
  public run(file: SourceFile): Finding[] {
    const findings: Finding[] = [];

    // Check for 'any' type in variable declarations
    const variableDeclarations = file.getDescendantsOfKind(
      SyntaxKind.VariableDeclaration
    );
    variableDeclarations.forEach((declaration) => {
      if (this.isAnyType(declaration)) {
        this.addFinding(
          `Variable '${declaration.getName()}' uses 'any' type, which reduces type safety.`,
          file.getFilePath(),
          declaration.getStart()
        );
      }
    });

    // Check for 'any' type in function parameters
    const functionDeclarations = file.getDescendantsOfKind(
      SyntaxKind.FunctionDeclaration
    );
    functionDeclarations.forEach((declaration) => {
      declaration.getParameters().forEach((parameter) => {
        if (this.isAnyType(parameter)) {
          this.addFinding(
            `Parameter '${this.getParameterName(
              parameter
            )}' in function '${declaration.getName()}' uses 'any' type, which reduces type safety.`,
            file.getFilePath(),
            parameter.getStart()
          );
        }
      });
    });

    // Check for 'any' type in arrow function parameters
    const arrowFunctions = file.getDescendantsOfKind(SyntaxKind.ArrowFunction);
    arrowFunctions.forEach((arrowFunction) => {
      arrowFunction.getParameters().forEach((parameter) => {
        if (this.isAnyType(parameter)) {
          this.addFinding(
            `Parameter '${this.getParameterName(
              parameter
            )}' in arrow function uses 'any' type, which reduces type safety.`,
            file.getFilePath(),
            parameter.getStart()
          );
        }
      });
    });

    return this.getFindings();
  }

  /**
   * Checks if a variable or parameter declaration uses 'any' type.
   * @param {VariableDeclaration | ParameterDeclaration} declaration - The declaration to check.
   * @returns {boolean} - True if the declaration uses 'any' type, false otherwise.
   */
  private isAnyType(
    declaration: VariableDeclaration | ParameterDeclaration
  ): boolean {
    const typeNode = declaration.getTypeNode();
    return typeNode?.getText() === "any";
  }

  /**
   * Gets the parameter name, handling destructured parameters gracefully.
   * @param {ParameterDeclaration} parameter - The parameter declaration to get the name of.
   * @returns {string} - The name of the parameter or a more suitable representation.
   */
  private getParameterName(parameter: ParameterDeclaration): string {
    const nameNode = parameter.getNameNode();
    if (nameNode?.getKind() === SyntaxKind.ObjectBindingPattern) {
      // Extracts the names within a destructured parameter (e.g., { data } becomes "data")
      const bindingPattern = nameNode as ObjectBindingPattern;
      const elements = bindingPattern.getElements();
      return elements.map((el) => el.getName()).join(", ");
    }
    return parameter.getName();
  }
}

export { ImproperTypeUsageDetector };
