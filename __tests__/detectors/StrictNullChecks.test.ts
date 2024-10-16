import path from "path";
import mockFs from "mock-fs";
import { Project, SourceFile } from "ts-morph";

import { StrictNullChecksDetector } from "../../detectors/StrictNullChecks";

describe("StrictNullChecksDetector", () => {
  let detector: StrictNullChecksDetector;
  let sourceFile: SourceFile;

  beforeEach(() => {
    detector = new StrictNullChecksDetector();

    mockFs({
      "testcases/validTsconfig/": {
        "tsconfig.json": JSON.stringify({
          compilerOptions: {
            strict: true,
          },
        }),
      },
      "testcases/invalidTsconfig/": {
        "tsconfig.json": JSON.stringify({
          compilerOptions: {
            strict: false,
          },
        }),
      },
      "testcases/noCompilerOptionsTsconfig/": {
        "tsconfig.json": JSON.stringify({}),
      },
      "testcases/someOtherFile/": {
        "someOtherFile.json": JSON.stringify({}),
      },
    });

    const project = new Project();
    sourceFile = project.addSourceFileAtPath(
      "testcases/validTsconfig/tsconfig.json"
    );
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("should not report any findings for a valid tsconfig.json", () => {
    const findings = detector.run(sourceFile);
    expect(findings).toEqual([]);
  });

  it("should report a finding for a tsconfig.json with strict set to false", () => {
    const invalidSourceFile = new Project().addSourceFileAtPath(
      "testcases/invalidTsconfig/tsconfig.json"
    );
    const findings = detector.run(invalidSourceFile);

    expect(findings).toEqual([
      {
        description: "Strict null checks are not enabled in tsconfig.json.",
        position: {
          filePath: path.resolve("testcases/invalidTsconfig/tsconfig.json"),
          lineNum: 1,
        },
        riskRating: 1,
        type: "StrictNullChecks",
      },
    ]);
  });

  it("should report a finding for a tsconfig.json without compilerOptions", () => {
    const noCompilerOptionsSourceFile = new Project().addSourceFileAtPath(
      "testcases/noCompilerOptionsTsconfig/tsconfig.json"
    );
    const findings = detector.run(noCompilerOptionsSourceFile);

    expect(findings).toEqual([
      {
        description: "Strict null checks are not enabled in tsconfig.json.",
        position: {
          filePath: path.resolve(
            "testcases/noCompilerOptionsTsconfig/tsconfig.json"
          ),
          lineNum: 1,
        },
        riskRating: 1,
        type: "StrictNullChecks",
      },
    ]);
  });

  it("should not detect any findings when the file is not tsconfig.json", () => {
    const someOtherFileSourceFile = new Project().addSourceFileAtPath(
      "testcases/someOtherFile/someOtherFile.json"
    );
    const findings = detector.run(someOtherFileSourceFile);
    expect(findings).toEqual([]);
  });
});
