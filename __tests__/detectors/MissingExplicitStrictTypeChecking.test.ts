import path from "path";
import mockFs from "mock-fs";
import { Project, SourceFile } from "ts-morph";

import { MissingExplicitStrictTypeCheckingDetector } from "../../detectors/MissingExplicitStrictTypeChecking";

describe("MissingExplicitStrictTypeCheckingDetector", () => {
  let detector: MissingExplicitStrictTypeCheckingDetector;
  let sourceFile: SourceFile;

  beforeEach(() => {
    detector = new MissingExplicitStrictTypeCheckingDetector();

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
      "testcases/noStrictTsconfig/": {
        "tsconfig.json": JSON.stringify({
          compilerOptions: {
            noImplicitAny: true,
            strictBindCallApply: true,
            alwaysStrict: true,
          },
        }),
      },
      "testcases/noCompilerOptions/": {
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

  it("should report a finding for a tsconfig.json with missing explicit strict type-checking options", () => {
    const missingOptionsSourceFile = new Project().addSourceFileAtPath(
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
    const noCompilerOptionsSourceFile = new Project().addSourceFileAtPath(
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
    const someOtherFileSourceFile = new Project().addSourceFileAtPath(
      "testcases/someOtherFile/someOtherFile.json"
    );
    const findings = detector.run(someOtherFileSourceFile);
    expect(findings).toEqual([]);
  });
});
