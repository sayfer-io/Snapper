import { Project, SourceFile } from "ts-morph";

import { Finding } from "../../types";
import { InsecureCryptoLibrariesDetector } from "../../detectors/InsecureCryptoLibraries";

describe("InsecureCryptoLibrariesDetector", () => {
  let project: Project;
  let sourceFile: SourceFile;
  let detector: InsecureCryptoLibrariesDetector;

  beforeEach(() => {
    project = new Project();
    sourceFile = project.createSourceFile("test.ts", "", { overwrite: true });
    detector = new InsecureCryptoLibrariesDetector();
  });

  it("should detect non-native cryptography libraries", () => {
    sourceFile.addImportDeclaration({
      moduleSpecifier: "crypto-js",
    });

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1);
    expect(findings[0].description).toBe(
      "Use of a non-native cryptography library."
    );
  });

  it("should not flag native or unrelated libraries", () => {
    sourceFile.addImportDeclaration({
      moduleSpecifier: "fs",
    });

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });

  it("should detect multiple non-native cryptography libraries", () => {
    sourceFile.addImportDeclaration({
      moduleSpecifier: "crypto-js",
    });
    sourceFile.addImportDeclaration({
      moduleSpecifier: "elliptic",
    });

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
    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });

  it("should not flag comments or strings containing library names", () => {
    sourceFile.addStatements([
      `// This is a comment mentioning crypto-js`,
      `const lib = "crypto-js";`,
    ]);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });
});
