import mockFs from "mock-fs";
import { Project, SourceFile } from "ts-morph";

import { FloatingPointPrecisionDetector } from "../../detectors/FloatingPointPrecision";

describe("FloatingPointPrecisionDetector", () => {
  let detector: FloatingPointPrecisionDetector;
  let project: Project;

  beforeEach(() => {
    detector = new FloatingPointPrecisionDetector();
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

  it("should detect floating-point precision issue in simple division", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const result = 0.1 / 0.2;
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toContain(
      "Potential floating-point precision issue detected in division operation."
    );
  });

  it("should detect floating-point precision issue in complex division", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const value = t?.value / (t?.token?.symbol === 'tBTC' ? 1e6 : 1e12);
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toContain(
      "Potential floating-point precision issue detected in division operation."
    );
  });

  it("should not detect issue in integer division", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const result = 10 / 2;
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should not detect issue in non-division operations", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const result = 0.1 * 0.2;
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });
});
