import mockFs from "mock-fs";
import { Project, SourceFile } from "ts-morph";

import { Finding } from "../../types";
import { InsecureCryptoLibrariesDetector } from "../../detectors/InsecureCryptoLibraries";

describe("InsecureCryptoLibrariesDetector", () => {
  let project: Project;
  let sourceFile: SourceFile;
  let detector: InsecureCryptoLibrariesDetector;

  beforeEach(() => {
    project = new Project();
    detector = new InsecureCryptoLibrariesDetector();
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("should detect non-native cryptography libraries", () => {
    mockFs({
      "test.ts": `
        import "crypto-js";
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1);
    expect(findings[0].description).toBe(
      "Use of a non-native cryptography library."
    );
  });

  it("should not flag native or unrelated libraries", () => {
    mockFs({
      "test.ts": `
        import "fs";
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });

  it("should detect multiple non-native cryptography libraries", () => {
    mockFs({
      "test.ts": `
        import "crypto-js";
        import "elliptic";
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(2);
    expect(findings[0].description).toBe(
      "Use of a non-native cryptography library."
    );
    expect(findings[1].description).toBe(
      "Use of a non-native cryptography library."
    );
  });

  it("should handle files with no imports gracefully", () => {
    mockFs({
      "test.ts": `
        // No imports here
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });

  it("should not flag comments or strings containing library names", () => {
    mockFs({
      "test.ts": `
        // This is a comment mentioning crypto-js
        const lib = "crypto-js";
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });
});
