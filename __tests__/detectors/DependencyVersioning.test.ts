import { DependencyVersioningDetector } from "../../detectors/DependencyVersioning";
import { SourceFile, Project } from "ts-morph";
import { Finding } from "../../types";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";

describe("DependencyVersioningDetector", () => {
  let detector: DependencyVersioningDetector;
  let sourceFile: SourceFile;
  let project: Project;
  let tempDir: string;

  beforeEach(() => {
    detector = new DependencyVersioningDetector();
    project = new Project();
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "test-"));
    sourceFile = project.createSourceFile(
      path.join(tempDir, "package.json"),
      "",
      { overwrite: true }
    );
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  // TODO: Implement tests for DependencyVersioningDetector
  // it("should detect dependencies with non-exact versions", () => {
  //   sourceFile.addStatements([
  //     `{`,
  //     `  "dependencies": {`,
  //     `    "package1": "^1.0.0",`,
  //     `    "package2": "~2.0.0"`,
  //     `  }`,
  //     `}`,
  //   ]);
  //   sourceFile.saveSync();

  //   const findings: Finding[] = detector.run(sourceFile);

  //   expect(findings.length).toBe(2);
  //   expect(findings[0]).toMatchObject({
  //     description: `Dependency "package1" has a non-exact version "^1.0.0".`,
  //     filePath: sourceFile.getFilePath(),
  //   });
  //   expect(findings[1]).toMatchObject({
  //     description: `Dependency "package2" has a non-exact version "~2.0.0".`,
  //     filePath: sourceFile.getFilePath(),
  //   });
  // });

  it("should not flag dependencies with exact versions", () => {
    sourceFile.addStatements([
      `{`,
      `  "dependencies": {`,
      `    "package1": "1.0.0",`,
      `    "package2": "2.0.0"`,
      `  }`,
      `}`,
    ]);
    sourceFile.saveSync();

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });

  it("should handle non-package.json files gracefully", () => {
    sourceFile = project.createSourceFile(path.join(tempDir, "test.ts"), "", {
      overwrite: true,
    });
    sourceFile.saveSync();

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });

  it("should handle empty package.json files gracefully", () => {
    sourceFile.addStatements([`{}`]);
    sourceFile.saveSync();

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });

  // TODO: Implement tests for DependencyVersioningDetector
  // it("should detect dependencies with non-exact versions in devDependencies", () => {
  //   sourceFile.addStatements([
  //     `{`,
  //     `  "devDependencies": {`,
  //     `    "package1": "^1.0.0",`,
  //     `    "package2": "~2.0.0"`,
  //     `  }`,
  //     `}`,
  //   ]);
  //   sourceFile.saveSync();

  //   const findings: Finding[] = detector.run(sourceFile);

  //   expect(findings.length).toBe(2);
  //   expect(findings[0]).toMatchObject({
  //     description: `Dependency "package1" has a non-exact version "^1.0.0".`,
  //     filePath: sourceFile.getFilePath(),
  //   });
  //   expect(findings[1]).toMatchObject({
  //     description: `Dependency "package2" has a non-exact version "~2.0.0".`,
  //     filePath: sourceFile.getFilePath(),
  //   });
  // });
});
