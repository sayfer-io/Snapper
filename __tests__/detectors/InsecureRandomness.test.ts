import mockFs from "mock-fs";
import { Project, SourceFile } from "ts-morph";

import { Finding } from "../../types";
import { InsecureRandomnessDetector } from "../../detectors/InsecureRandomness";

describe("InsecureRandomnessDetector", () => {
  let project: Project;
  let sourceFile: SourceFile;
  let detector: InsecureRandomnessDetector;

  beforeEach(() => {
    project = new Project();
    detector = new InsecureRandomnessDetector();
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("should detect insecure randomness functions", () => {
    mockFs({
      "test.ts": `
        function test() {
          const randomValue = Math.random();
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1);
    expect(findings[0].description).toBe(
      "Insecure randomness detected: Math.random"
    );
  });

  it("should not flag secure or unrelated functions", () => {
    mockFs({
      "test.ts": `
        function test() {
          const secureValue = crypto.getRandomValues(new Uint32Array(1))[0];
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });

  it("should detect multiple insecure randomness functions", () => {
    mockFs({
      "test.ts": `
        function test() {
          const randomValue1 = Math.random();
          const randomValue2 = Math.random();
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

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
    mockFs({
      "test.ts": `
        // No functions here
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });

  it("should not flag comments or strings containing function names", () => {
    mockFs({
      "test.ts": `
        // This is a comment mentioning Math.random
        const funcName = "Math.random";
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });

  it("should detect insecure randomness in different scopes", () => {
    mockFs({
      "test.ts": `
        function outer() {
          function inner() {
            const randomValue = Math.random();
          }
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1);
    expect(findings[0].description).toBe(
      "Insecure randomness detected: Math.random"
    );
  });

  it("should detect insecure randomness in arrow functions", () => {
    mockFs({
      "test.ts": `
        const test = () => {
          const randomValue = Math.random();
        };
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1);
    expect(findings[0].description).toBe(
      "Insecure randomness detected: Math.random"
    );
  });

  it("should detect insecure randomness in class methods", () => {
    mockFs({
      "test.ts": `
        class TestClass {
          method() {
            const randomValue = Math.random();
          }
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1);
    expect(findings[0].description).toBe(
      "Insecure randomness detected: Math.random"
    );
  });
});
