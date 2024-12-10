import path from "path";
import mockFs from "mock-fs";
import { Project, SourceFile } from "ts-morph";

import { MissingExplicitStrictTypeCheckingDetector } from "../../src/detectors/MissingExplicitStrictTypeChecking";

describe("MissingExplicitStrictTypeCheckingDetector", () => {
  let project: Project;
  let sourceFile: SourceFile;
  let detector: MissingExplicitStrictTypeCheckingDetector;

  beforeEach(() => {
    project = new Project();
    detector = new MissingExplicitStrictTypeCheckingDetector();
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("should not report any findings for a valid tsconfig.json", () => {
    mockFs({
      "testcases/validTsconfig/": {
        "tsconfig.json": JSON.stringify({
          compilerOptions: {
            strict: true,
            noImplicitAny: true,
            strictBindCallApply: true,
            alwaysStrict: true,
          },
        }),
      },
    });

    sourceFile = project.addSourceFileAtPath(
      "testcases/validTsconfig/tsconfig.json"
    );

    const findings = detector.run(sourceFile);
    expect(findings).toEqual([]);
  });

  it("should report a finding for a tsconfig.json with missing explicit strict type-checking options", () => {
    mockFs({
      "testcases/missingOptionsTsconfig/": {
        "tsconfig.json": JSON.stringify({
          compilerOptions: {
            strict: true,
            noImplicitAny: false,
            strictBindCallApply: false,
            alwaysStrict: false,
          },
        }),
      },
    });

    const missingOptionsSourceFile = project.addSourceFileAtPath(
      "testcases/missingOptionsTsconfig/tsconfig.json"
    );
    const findings = detector.run(missingOptionsSourceFile);

    expect(findings).toEqual([
      {
        description:
          "Missing explicit strict type-checking options: noImplicitAny, strictBindCallApply, alwaysStrict.",
        position: {
          filePath: path.resolve(
            "testcases/missingOptionsTsconfig/tsconfig.json"
          ),
          lineNum: 1,
        },
        riskRating: 2,
        type: "MissingExplicitStrictTypeChecking",
      },
    ]);
  });

  it("should report a finding for a tsconfig.json without compilerOptions", () => {
    mockFs({
      "testcases/noCompilerOptions/": {
        "tsconfig.json": JSON.stringify({}),
      },
    });

    const noCompilerOptionsSourceFile = project.addSourceFileAtPath(
      "testcases/noCompilerOptions/tsconfig.json"
    );
    const findings = detector.run(noCompilerOptionsSourceFile);

    expect(findings).toEqual([
      {
        description:
          "Missing explicit strict type-checking options: strict, noImplicitAny, strictBindCallApply, alwaysStrict.",
        position: {
          filePath: path.resolve("testcases/noCompilerOptions/tsconfig.json"),
          lineNum: 1,
        },
        riskRating: 2,
        type: "MissingExplicitStrictTypeChecking",
      },
    ]);
  });

  it("should not detect any findings when the file is not tsconfig.json", () => {
    mockFs({
      "testcases/someOtherFile/": {
        "someOtherFile.json": JSON.stringify({}),
      },
    });

    const someOtherFileSourceFile = project.addSourceFileAtPath(
      "testcases/someOtherFile/someOtherFile.json"
    );
    const findings = detector.run(someOtherFileSourceFile);
    expect(findings).toEqual([]);
  });
});
