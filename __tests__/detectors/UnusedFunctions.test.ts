import mockFs from "mock-fs";
import { Project } from "ts-morph";

import { UnusedFunctionsDetector } from "../../src/detectors/UnusedFunctions";

describe("UnusedFunctionsDetector", () => {
  let project: Project;
  let detector: UnusedFunctionsDetector;

  beforeEach(() => {
    project = new Project();
    detector = new UnusedFunctionsDetector();
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("should detect unused functions", () => {
    mockFs({
      "mockFilePath1.ts": `
        function unusedFunction() {}
        function usedFunction() {}
        console.log(usedFunction);
      `,
    });

    const sourceFile = project.addSourceFileAtPath("mockFilePath1.ts");
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      "Function 'unusedFunction' is declared but never used."
    );
    expect(findings[0].position.filePath).toBe(sourceFile.getFilePath());
  });

  it("should not report used functions", () => {
    mockFs({
      "mockFilePath2.ts": `
        function usedFunction() {}
        console.log(usedFunction);
      `,
    });

    const sourceFile = project.addSourceFileAtPath("mockFilePath2.ts");
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should handle exported functions", () => {
    mockFs({
      "mockFilePath3.ts": `
        export function exportedFunction() {}
      `,
    });

    const sourceFile = project.addSourceFileAtPath("mockFilePath3.ts");
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });
});
