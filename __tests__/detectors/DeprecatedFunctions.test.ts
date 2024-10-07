import { SourceFile, Project } from "ts-morph";

import { DeprecatedFunctionsDetector } from "../../detectors/DeprecatedFunctions";

describe("DeprecatedFunctionsDetector", () => {
  let detector: DeprecatedFunctionsDetector;
  let sourceFile: SourceFile;

  beforeEach(() => {
    detector = new DeprecatedFunctionsDetector();
    const project = new Project();
    sourceFile = project.createSourceFile(
      "test.ts",
      `
        function testFunction() {
          atob("test");
        }
      `
    );
  });

  it("should detect usage of deprecated functions", () => {
    const findings = detector.run(sourceFile);
    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe("Usage of deprecated function: atob");
  });

  it("should return the correct file path and line number", () => {
    const findings = detector.run(sourceFile);
  });

  it("should return an empty array if no deprecated functions are used", () => {
    const project = new Project();
    const sourceFile = project.createSourceFile(
      "test.ts",
      `
        function normalFunction() {}
        normalFunction();
      `
    );
    const findings = detector.run(sourceFile);
    expect(findings).toHaveLength(0);
  });
});
