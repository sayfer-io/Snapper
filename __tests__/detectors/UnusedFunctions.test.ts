import mockFs from "mock-fs";
import { SourceFile, Project } from "ts-morph";

import { UnusedFunctionsDetector } from "../../detectors/UnusedFunctions";

describe("UnusedFunctionsDetector", () => {
  let detector: UnusedFunctionsDetector;
  let project: Project;

  beforeEach(() => {
    detector = new UnusedFunctionsDetector();
    project = new Project();
  });

  afterEach(() => {
    mockFs.restore();
  });

  const createMockFile = (
    filePath: string,
    fileContent: string
  ): SourceFile => {
    mockFs({
      [filePath]: fileContent,
    });

    return project.addSourceFileAtPath(filePath);
  };

  it("should detect unused functions", () => {
    const mockFilePath = "mockFilePath1.ts";
    const mockFileContent = `
      function unusedFunction() {}
      function usedFunction() {}
      console.log(usedFunction);
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      "Function 'unusedFunction' is declared but never used."
    );
    expect(findings[0].position.filePath).toBe(sourceFile.getFilePath());
  });

  it("should not report used functions", () => {
    const mockFilePath = "mockFilePath2.ts";
    const mockFileContent = `
      function usedFunction() {}
      console.log(usedFunction);
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should handle exported functions", () => {
    const mockFilePath = "mockFilePath3.ts";
    const mockFileContent = `
      export function exportedFunction() {}
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });
});
