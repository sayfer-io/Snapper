import mockFs from "mock-fs";
import { Project, SourceFile } from "ts-morph";

import { Finding } from "../../types";
import { ExcessiveCommentsDetector } from "../../detectors/ExcessiveComments";

describe("ExcessiveComments", () => {
  let project: Project;
  let sourceFile: SourceFile;
  let detector: ExcessiveCommentsDetector;

  beforeEach(() => {
    project = new Project();
    detector = new ExcessiveCommentsDetector();
  });

  afterEach(() => {
    mockFs.restore();
  });

  const createSourceFileWithCode = (
    filePath: string,
    code: string
  ): SourceFile => {
    mockFs({
      [filePath]: code,
    });

    return project.addSourceFileAtPath(filePath);
  };

  test("should detect large sections of commented-out code", () => {
    const code = `
      // This is a comment
      // This is a comment
      // This is a comment
      // This is a comment
      // This is a comment
      // This is a comment
    `;
    sourceFile = createSourceFileWithCode("testFile1.ts", code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1); // One large section of commented-out code
    expect(findings[0].description).toBe(
      "Large section of commented-out code detected (1-7)."
    );
  });

  test("should not flag JSDoc comments", () => {
    const code = `
      /**
       * This is a JSDoc comment
       * @param {string} param - A parameter
       * @returns {void}
       */
      function example(param: string): void {
        // This is a comment
      }
    `;
    sourceFile = createSourceFileWithCode("testFile2.ts", code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0); // No findings, JSDoc comments should not be flagged
  });

  test("should not flag small comments", () => {
    const code = `
      // This is a comment
      // This is another comment
    `;
    sourceFile = createSourceFileWithCode("testFile3.ts", code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0); // No findings, small comments should not be flagged
  });

  test("should detect multiple large sections of commented-out code", () => {
    const code = `
      // Comment line 1
      // Comment line 2
      // Comment line 3
      // Comment line 4
      // Comment line 5
      // Comment line 6
  
      // Another comment line 1
      // Another comment line 2
      // Another comment line 3
      // Another comment line 4
      // Another comment line 5
      // Another comment line 6
    `;
    sourceFile = createSourceFileWithCode("testFile4.ts", code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1); // One large section of commented-out code
    expect(findings[0].description).toBe(
      "Large section of commented-out code detected (1-14)."
    );
  });

  test("should detect large multi-line comments that are not docstrings", () => {
    const code = `
      /*
       * Comment line 1
       * Comment line 2
       * Comment line 3
       * Comment line 4
       * Comment line 5
       * Comment line 6
       */
    `;
    sourceFile = createSourceFileWithCode("testFile5.ts", code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1); // One large multi-line comment
    expect(findings[0].description).toBe(
      "Large section of commented-out code detected (2-8)."
    );
  });

  test("should detect multiple large sections of commented-out code with tabs", () => {
    const code = `
  \t\t// This is a comment
  \t\t// This is a comment
  \t\t// This is a comment
  \t\t// This is a comment
  \t\t// This is a comment
  \t\t// This is a comment
  
  \t\t// Another large section
  \t\t// Another large section
  \t\t// Another large section
  \t\t// Another large section
  \t\t// Another large section
  \t\t// Another large section
    `;
    sourceFile = createSourceFileWithCode("testFile6.ts", code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1); // One large section of commented-out code
    expect(findings[0].description).toBe(
      "Large section of commented-out code detected (1-14)."
    );
  });

  test("should detect multiple large sections of commented-out code with spaces", () => {
    const code = `
        // This is a comment
        // This is a comment
        // This is a comment
        // This is a comment
        // This is a comment
        // This is a comment
  
        // Another large section
        // Another large section
        // Another large section
        // Another large section
        // Another large section
        // Another large section
      `;
    sourceFile = createSourceFileWithCode("testFile7.ts", code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1); // One large section of commented-out code
    expect(findings[0].description).toBe(
      "Large section of commented-out code detected (1-14)."
    );
  });
});
