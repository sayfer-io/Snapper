import { DependencyVersioningDetector } from "../../detectors/DependencyVersioning";
import mock from "mock-fs";
import { Project } from "ts-morph";
import { Finding } from "../../types";
import * as path from "path";

describe("DependencyVersioningDetector", () => {
  let detector: DependencyVersioningDetector;

  beforeEach(() => {
    detector = new DependencyVersioningDetector();
  });

  afterEach(() => {
    mock.restore();
  });

  it("should detect dependencies with non-exact versions", () => {
    mock({
      "test/package.json": `
      {
        "dependencies": {
          "package1": "^1.0.0",
          "package2": "~2.0.0"
        }
      }
    `,
    });

    const project = new Project();
    const sourceFile = project.addSourceFileAtPath("test/package.json");

    const findings: Finding[] = detector.run(sourceFile);

    // Normalize the file path to ensure cross-platform compatibility
    const expectedFilePath = path.normalize("test/package.json");
    const actualFilePath = path.relative(
      process.cwd(),
      findings[0].position.filePath
    );

    // Log the absolute path being processed
    console.log(findings[0].position.filePath);

    expect(findings.length).toBe(2);

    // Compare descriptions
    expect(findings[0].description).toBe(
      `Dependency "package1" has a non-exact version "^1.0.0".`
    );
    expect(findings[1].description).toBe(
      `Dependency "package2" has a non-exact version "~2.0.0".`
    );

    // Compare file paths by converting the actual path to relative
    expect(actualFilePath).toBe(expectedFilePath);
    expect(path.relative(process.cwd(), findings[1].position.filePath)).toBe(
      expectedFilePath
    );
  });

  it("should not flag dependencies with exact versions", () => {
    mock({
      "test/package.json": `
      {
        "dependencies": {
          "package1": "1.0.0",
          "package2": "2.0.0"
        }
      }
    `,
    });

    const project = new Project();
    const sourceFile = project.addSourceFileAtPath("test/package.json");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });

  it("should handle non-package.json files gracefully", () => {
    mock({
      "test/test.ts": "",
    });

    const project = new Project();
    const sourceFile = project.addSourceFileAtPath("test/test.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });

  it("should handle empty package.json files gracefully", () => {
    mock({
      "test/package.json": "{}",
    });

    const project = new Project();
    const sourceFile = project.addSourceFileAtPath("test/package.json");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });

  it("should detect dependencies with non-exact versions in devDependencies", () => {
    mock({
      "test/package.json": `
      {
        "devDependencies": {
          "package1": "^1.0.0",
          "package2": "~2.0.0"
        }
      }
    `,
    });

    const project = new Project();
    const sourceFile = project.addSourceFileAtPath("test/package.json");

    const findings: Finding[] = detector.run(sourceFile);

    // Normalize the file path to ensure cross-platform compatibility
    const expectedFilePath = path.normalize("test/package.json");
    const actualFilePath = path.relative(
      process.cwd(),
      findings[0].position.filePath
    );

    expect(findings.length).toBe(2);

    // Compare descriptions
    expect(findings[0].description).toBe(
      `Dependency "package1" has a non-exact version "^1.0.0".`
    );
    expect(findings[1].description).toBe(
      `Dependency "package2" has a non-exact version "~2.0.0".`
    );

    // Compare file paths by converting the actual path to relative
    expect(actualFilePath).toBe(expectedFilePath);
    expect(path.relative(process.cwd(), findings[1].position.filePath)).toBe(
      expectedFilePath
    );
  });
});
