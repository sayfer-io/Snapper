import mockFs from "mock-fs";
import { Project } from "ts-morph";

import { UnusedImportsDetector } from "../../detectors/UnusedImports";

describe("UnusedImportsDetector", () => {
  let project: Project;
  let detector: UnusedImportsDetector;

  beforeEach(() => {
    project = new Project();
    detector = new UnusedImportsDetector();
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("should handle files with no imports", () => {
    const mockFilePath = "mockFilePath1.ts";
    const mockFileContent = `
      console.log('No imports here');
    `;

    mockFs({
      [mockFilePath]: mockFileContent,
    });

    const sourceFile = project.addSourceFileAtPath(mockFilePath);

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should handle files with all used imports", () => {
    const mockFilePath = "mockFilePath4.ts";
    const mockFileContent = `
      import { usedImport1 } from './used1';
      import { usedImport2 } from './used2';
      console.log(usedImport1, usedImport2);
    `;

    // Mock the file system
    mockFs({
      [mockFilePath]: mockFileContent,
    });

    // Add the source file to the project
    const sourceFile = project.addSourceFileAtPath(mockFilePath);

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should detect unused imports", () => {
    const mockFilePath = "mockFilePath5.ts";
    const mockFileContent = `
      import { unusedImport } from './unused';
      console.log('This file has an unused import');
    `;

    mockFs({
      [mockFilePath]: mockFileContent,
    });

    const sourceFile = project.addSourceFileAtPath(mockFilePath);

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      "Import 'unusedImport' is declared but never used."
    );
  });

  it("should handle files with mixed used and unused imports", () => {
    const mockFilePath = "mockFilePath6.ts";
    const mockFileContent = `
      import { usedImport } from './used';
      import { unusedImport } from './unused';
      console.log(usedImport);
    `;

    mockFs({
      [mockFilePath]: mockFileContent,
    });

    const sourceFile = project.addSourceFileAtPath(mockFilePath);

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      "Import 'unusedImport' is declared but never used."
    );
  });
});
