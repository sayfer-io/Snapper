import mockFs from "mock-fs";
import { SourceFile, Project } from "ts-morph";

import { DeprecatedFunctionsDetector } from "../../detectors/DeprecatedFunctions";

describe("DeprecatedFunctionsDetector", () => {
  let project: Project;
  let sourceFile: SourceFile;
  let detector: DeprecatedFunctionsDetector;

  beforeEach(() => {
    project = new Project();
    detector = new DeprecatedFunctionsDetector();
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("should detect usage of deprecated functions", () => {
    mockFs({
      "test.ts": `
        function testFunction() {
          atob("test");
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings = detector.run(sourceFile);
    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe("Usage of deprecated function: atob");
  });

  it("should return the correct file path and line number", () => {
    mockFs({
      "test.ts": `
        function testFunction() {
          atob("test");
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings = detector.run(sourceFile);
    expect(findings).toHaveLength(1);
    expect(findings[0].position.lineNum).toBe(2);
  });

  it("should return an empty array if no deprecated functions are used", () => {
    mockFs({
      "test.ts": `
        function normalFunction() {}
        normalFunction();
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings = detector.run(sourceFile);
    expect(findings).toHaveLength(0);
  });
});
