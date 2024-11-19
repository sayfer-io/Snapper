import mockFs from "mock-fs";
import { Project, SourceFile } from "ts-morph";

import { Finding } from "../../types";
import { DangerousFunctionsDetector } from "../../detectors/DangerousFunctions";

describe("DangerousFunctionsDetector", () => {
  let project: Project;
  let sourceFile: SourceFile;
  let detector: DangerousFunctionsDetector;

  beforeEach(() => {
    project = new Project();
    detector = new DangerousFunctionsDetector();
  });

  afterEach(() => {
    mockFs.restore();
  });

  test("should detect dangerouslySetInnerHTML, eval, and signData function calls", () => {
    mockFs({
      "testFile.ts": `
        function test() {
          dangerouslySetInnerHTML();
          eval("console.log('test')");
          signData();
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("testFile.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(3);

    expect(findings[0].description).toBe(
      "Usage of dangerous function: dangerouslySetInnerHTML"
    );
    expect(findings[1].description).toBe("Usage of dangerous function: eval");
    expect(findings[2].description).toBe(
      "Usage of dangerous function: signData"
    );
  });

  test("should detect dangerous functions within objects", () => {
    mockFs({
      "testFile.ts": `
        const obj = {
          method: function() {
            eval("console.log('test')");
          }
        };
      `,
    });

    sourceFile = project.addSourceFileAtPath("testFile.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1);

    expect(findings[0].description).toBe("Usage of dangerous function: eval");
  });

  test("should detect dangerous functions within nested functions", () => {
    mockFs({
      "testFile.ts": `
        function outer() {
          function inner() {
            signData();
          }
          inner();
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("testFile.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1); // One dangerous function call
    expect(findings[0].description).toBe(
      "Usage of dangerous function: signData"
    );
  });

  test("should not detect any dangerous function calls when none are present", () => {
    mockFs({
      "testFile.ts": `
        function test() {
          console.log("This is safe.");
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("testFile.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });
});
