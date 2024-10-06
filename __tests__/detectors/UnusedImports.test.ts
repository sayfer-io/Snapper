import { SourceFile, Project } from "ts-morph";
import { UnusedImportsDetector } from "../../detectors/UnusedImports";
import mock from "mock-fs";

describe("UnusedImportsDetector", () => {
  let detector: UnusedImportsDetector;
  let project: Project;

  beforeEach(() => {
    detector = new UnusedImportsDetector();
    project = new Project();
  });

  afterEach(() => {
    // Restore the file system
    mock.restore();
  });

  it("should detect unused imports", () => {
    const mockFilePath = "mockFilePath1.ts";
    const mockFileContent = `
      import { unusedImport } from './unused';
      import { usedImport } from './used';
      console.log(usedImport);
    `;

    // Mock the file system
    mock({
      [mockFilePath]: mockFileContent,
    });

    // Add the source file to the project
    const sourceFile = project.addSourceFileAtPath(mockFilePath);

    const findings = detector.run(sourceFile);

    console.log("Source File Text:", sourceFile.getText());
    console.log("Findings:", findings);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      "Import 'unusedImport' is declared but never used."
    );
    expect(findings[0].position.filePath).toBe(sourceFile.getFilePath());
    expect(findings[0].position.lineNum).toBe(2);
  });

  it("should not report used imports", () => {
    const mockFilePath = "mockFilePath2.ts";
    const mockFileContent = `
      import { usedImport } from './used';
      console.log(usedImport);
    `;

    // Mock the file system
    mock({
      [mockFilePath]: mockFileContent,
    });

    // Add the source file to the project
    const sourceFile = project.addSourceFileAtPath(mockFilePath);

    const findings = detector.run(sourceFile);

    console.log("Source File Text:", sourceFile.getText());
    console.log("Findings:", findings);

    // Ensure that only the unused import is reported
    expect(findings).toHaveLength(0);
  });

  it("should handle files with no imports", () => {
    const mockFilePath = "mockFilePath3.ts";
    const mockFileContent = `
      console.log('No imports here');
    `;

    // Mock the file system
    mock({
      [mockFilePath]: mockFileContent,
    });

    // Add the source file to the project
    const sourceFile = project.addSourceFileAtPath(mockFilePath);

    const findings = detector.run(sourceFile);

    console.log("Source File Text:", sourceFile.getText());
    console.log("Findings:", findings);

    // Ensure no findings are reported
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
    mock({
      [mockFilePath]: mockFileContent,
    });

    // Add the source file to the project
    const sourceFile = project.addSourceFileAtPath(mockFilePath);

    const findings = detector.run(sourceFile);

    console.log("Source File Text:", sourceFile.getText());
    console.log("Findings:", findings);

    // Ensure no findings are reported
    expect(findings).toHaveLength(0);
  });
});
