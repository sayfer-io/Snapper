import { Project, SourceFile } from "ts-morph";

import { Finding } from "../../types";
import { InsecureRandomnessDetector } from "../../detectors/InsecureRandomness";

describe("InsecureRandomnessDetector", () => {
  let project: Project;
  let sourceFile: SourceFile;
  let detector: InsecureRandomnessDetector;

  beforeEach(() => {
    project = new Project();
    sourceFile = project.createSourceFile("test.ts", "", { overwrite: true });
    detector = new InsecureRandomnessDetector();
  });

  it("should detect insecure randomness functions", () => {
    sourceFile.addStatements([
      `function test() {`,
      `  const randomValue = Math.random();`,
      `}`,
    ]);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1);
    expect(findings[0].description).toBe(
      "Insecure randomness detected: Math.random"
    );
  });

  it("should not flag secure or unrelated functions", () => {
    sourceFile.addStatements([
      `function test() {`,
      `  const secureValue = crypto.getRandomValues(new Uint32Array(1))[0];`,
      `}`,
    ]);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });

  it("should detect multiple insecure randomness functions", () => {
    sourceFile.addStatements([
      `function test() {`,
      `  const randomValue1 = Math.random();`,
      `  const randomValue2 = Math.random();`,
      `}`,
    ]);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(2);
    expect(findings[0].description).toBe(
      "Insecure randomness detected: Math.random"
    );
    expect(findings[1].description).toBe(
      "Insecure randomness detected: Math.random"
    );
  });

  it("should handle files with no functions gracefully", () => {
    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });

  it("should not flag comments or strings containing function names", () => {
    sourceFile.addStatements([
      `// This is a comment mentioning Math.random`,
      `const funcName = "Math.random";`,
    ]);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });

  it("should detect insecure randomness in different scopes", () => {
    sourceFile.addStatements([
      `function outer() {`,
      `  function inner() {`,
      `    const randomValue = Math.random();`,
      `  }`,
      `}`,
    ]);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1);
    expect(findings[0].description).toBe(
      "Insecure randomness detected: Math.random"
    );
  });

  it("should detect insecure randomness in arrow functions", () => {
    sourceFile.addStatements([
      `const test = () => {`,
      `  const randomValue = Math.random();`,
      `};`,
    ]);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1);
    expect(findings[0].description).toBe(
      "Insecure randomness detected: Math.random"
    );
  });

  it("should detect insecure randomness in class methods", () => {
    sourceFile.addStatements([
      `class TestClass {`,
      `  method() {`,
      `    const randomValue = Math.random();`,
      `  }`,
      `}`,
    ]);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1);
    expect(findings[0].description).toBe(
      "Insecure randomness detected: Math.random"
    );
  });
});
