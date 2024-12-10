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
 * Detector class for identifying improper usage of 'any' type in TypeScript code.
 */
class ImproperTypeUsageDetector extends DetectorBase {
  constructor() {
    super("ImproperTypeUsage", RiskRating.Medium); // Initializes the detector with a name and medium risk rating.
  }

  /**
   * Analyzes the given source file for instances of 'any' type usage.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {Finding[]} - List of findings related to 'any' type usage.
   */
  public run(file: SourceFile): Finding[] {
    const findings: Finding[] = [];

    // Check for 'any' type in variable declarations.
    const variableDeclarations = file.getDescendantsOfKind(
      SyntaxKind.VariableDeclaration
    );
    variableDeclarations.forEach((declaration) => {
      if (this.isAnyType(declaration)) {
        this.addFinding(
          `Variable '${declaration.getName()}' uses 'any' type, which reduces type safety.`,
          file.getFilePath(),
          declaration.getStart() // Log the start position of the declaration.
        );
      }
    });

    // Check for 'any' type in function parameters.
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
            parameter.getStart() // Log the start position of the parameter.
          );
        }
      });
    });

    // Check for 'any' type in arrow function parameters.
    const arrowFunctions = file.getDescendantsOfKind(SyntaxKind.ArrowFunction);
    arrowFunctions.forEach((arrowFunction) => {
      arrowFunction.getParameters().forEach((parameter) => {
        if (this.isAnyType(parameter)) {
          this.addFinding(
            `Parameter '${this.getParameterName(
              parameter
            )}' in arrow function uses 'any' type, which reduces type safety.`,
            file.getFilePath(),
            parameter.getStart() // Log the start position of the parameter.
          );
        }
      });
    });

    return this.getFindings(); // Return all findings related to 'any' type usage.
  }

  /**
   * Checks if a variable or parameter declaration uses the 'any' type.
   * @param {VariableDeclaration | ParameterDeclaration} declaration - The declaration to check.
   * @returns {boolean} - True if the declaration uses 'any' type, false otherwise.
   */
  private isAnyType(
    declaration: VariableDeclaration | ParameterDeclaration
  ): boolean {
    const typeNode = declaration.getTypeNode();
    return typeNode?.getText() === "any"; // Return true if the type is 'any'.
  }

  /**
   * Retrieves the parameter name, accounting for destructured parameters.
   * @param {ParameterDeclaration} parameter - The parameter declaration to get the name of.
   * @returns {string} - The name of the parameter or a representation for destructured parameters.
   */
  private getParameterName(parameter: ParameterDeclaration): string {
    const nameNode = parameter.getNameNode();
    if (nameNode?.getKind() === SyntaxKind.ObjectBindingPattern) {
      // Handle destructured parameters (e.g., { data } becomes "data").
      const bindingPattern = nameNode as ObjectBindingPattern;
      const elements = bindingPattern.getElements();
      return elements.map((el) => el.getName()).join(", "); // Return a comma-separated string of parameter names.
    }
    return parameter.getName(); // Return the name of the parameter directly.
  }
}

export { ImproperTypeUsageDetector };
