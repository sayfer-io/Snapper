import path from "path";
import mockFs from "mock-fs";
import { Project, SourceFile } from "ts-morph";

import { PotentialOutdatedEngineDetector } from "../../detectors/PotentialOutdatedEngine";

describe("PotentialOutdatedEngineDetector", () => {
  let project: Project;
  let sourceFile: SourceFile;
  let detector: PotentialOutdatedEngineDetector;

  beforeEach(() => {
    project = new Project();
    detector = new PotentialOutdatedEngineDetector();
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("should not report any findings for a valid package.json", () => {
    mockFs({
      "testcases/validPackage/": {
        "package.json": JSON.stringify({
          name: "valid-package",
          version: "1.0.0",
          engines: {
            node: ">=14.0.0",
          },
        }),
      },
    });

    project = new Project();
    sourceFile = project.addSourceFileAtPath(
      "testcases/validPackage/package.json"
    );

    const findings = detector.run(sourceFile);
    expect(findings).toEqual([]);
  });

  it("should report a finding for a package.json without engines field", () => {
    mockFs({
      "testcases/invalidPackage/": {
        "package.json": JSON.stringify({
          name: "invalid-package",
          version: "1.0.0",
        }),
      },
    });

    const invalidSourceFile = new Project().addSourceFileAtPath(
      "testcases/invalidPackage/package.json"
    );
    const findings = detector.run(invalidSourceFile);

    expect(findings).toEqual([
      {
        description:
          "Missing or outdated Node.js engine specification in package.json.",
        position: {
          filePath: path.resolve("testcases/invalidPackage/package.json"),
          lineNum: 1,
        },
        riskRating: 1,
        type: "PotentialOutdatedEngine",
      },
    ]);
  });

  it("should report a finding for a package.json with an empty engines field", () => {
    mockFs({
      "testcases/noEnginesPackage/": {
        "package.json": JSON.stringify({
          name: "no-engines-package",
          version: "1.0.0",
          engines: {},
        }),
      },
    });

    const noEnginesSourceFile = new Project().addSourceFileAtPath(
      "testcases/noEnginesPackage/package.json"
    );
    const findings = detector.run(noEnginesSourceFile);

    expect(findings).toEqual([
      {
        description:
          "Missing or outdated Node.js engine specification in package.json.",
        position: {
          filePath: path.resolve("testcases/noEnginesPackage/package.json"),
          lineNum: 1,
        },
        riskRating: 1,
        type: "PotentialOutdatedEngine",
      },
    ]);
  });
});
