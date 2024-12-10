import mockFs from "mock-fs";
import { Project } from "ts-morph";

import { UnusedImportsDetector } from "../../src/detectors/UnusedImports";

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
    mockFs({
      "mockFilePath1.ts": `
        console.log('No imports here');
      `,
    });

    const sourceFile = project.addSourceFileAtPath("mockFilePath1.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should handle files with all used imports", () => {
    mockFs({
      "mockFilePath4.ts": `
        import { usedImport1 } from './used1';
        import { usedImport2 } from './used2';
        console.log(usedImport1, usedImport2);
      `,
    });

    const sourceFile = project.addSourceFileAtPath("mockFilePath4.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should detect unused imports", () => {
    mockFs({
      "mockFilePath5.ts": `
        import { unusedImport } from './unused';
        console.log('This file has an unused import');
      `,
    });

    const sourceFile = project.addSourceFileAtPath("mockFilePath5.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      "Import 'unusedImport' is declared but never used."
    );
  });

  it("should handle files with mixed used and unused imports", () => {
    mockFs({
      "mockFilePath6.ts": `
        import { usedImport } from './used';
        import { unusedImport } from './unused';
        console.log(usedImport);
      `,
    });

    const sourceFile = project.addSourceFileAtPath("mockFilePath6.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      "Import 'unusedImport' is declared but never used."
    );
  });
});
