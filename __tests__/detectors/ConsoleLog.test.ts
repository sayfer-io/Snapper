import mockFs from "mock-fs";
import { Project, SourceFile } from "ts-morph";

import { Finding } from "../../types";
import { ConsoleLogDetector } from "../../detectors/ConsoleLog";

describe("ConsoleLogDetector", () => {
  let project: Project;
  let sourceFile: SourceFile;
  let detector: ConsoleLogDetector;

  beforeEach(() => {
    project = new Project();
    detector = new ConsoleLogDetector();
  });

  afterEach(() => {
    mockFs.restore();
  });

  test("should detect console.log and console.error statements", () => {
    mockFs({
      "testFile.ts": `
        function test() {
          console.log("This is a test log.");
          console.error("This is an error log."); // This should also be detected
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("testFile.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(2);
    expect(findings[0].description).toBe(
      "Presence of console log function detected."
    );
    expect(findings[1].description).toBe(
      "Presence of console log function detected."
    );
  });

  test("should detect console.warn and console.info statements", () => {
    mockFs({
      "testFile.ts": `
        function test() {
          console.warn("This is a warning log.");
          console.info("This is an info log."); // This should also be detected
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("testFile.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(2);
    expect(findings[0].description).toBe(
      "Presence of console log function detected."
    );
    expect(findings[1].description).toBe(
      "Presence of console log function detected."
    );
  });

  test("should not detect console log statements when none are present", () => {
    mockFs({
      "testFile.ts": `
        function test() {
          const message = "No console log here.";
          alert(message);
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("testFile.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });

  test("should detect console statements in nested functions", () => {
    mockFs({
      "testFile.ts": `
        function outer() {
          function inner() {
            console.log("Nested log.");
          }
          inner();
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("testFile.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1);
    expect(findings[0].description).toBe(
      "Presence of console log function detected."
    );
  });

  test("should detect multiple console statements in different contexts", () => {
    mockFs({
      "testFile.ts": `
        function test() {
          console.log("Log 1");
          if (true) {
            console.error("Error log");
          }
          for (let i = 0; i < 1; i++) {
            console.warn("Warning log");
          }
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("testFile.ts");

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(3);
    expect(findings[0].description).toBe(
      "Presence of console log function detected."
    );
    expect(findings[1].description).toBe(
      "Presence of console log function detected."
    );
    expect(findings[2].description).toBe(
      "Presence of console log function detected."
    );
  });
});
