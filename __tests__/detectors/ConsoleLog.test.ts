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

  test("should detect console.log and console.error statements", () => {
    const code = `
      function test() {
        console.log("This is a test log.");
        console.error("This is an error log."); // This should also be detected
      }
    `;
    sourceFile = project.createSourceFile("testFile.ts", code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(2); // Two findings: console.log and console.error
    expect(findings[0].description).toBe(
      "Presence of console log function detected."
    );
    expect(findings[1].description).toBe(
      "Presence of console log function detected."
    );
  });

  test("should detect console.warn and console.info statements", () => {
    const code = `
      function test() {
        console.warn("This is a warning log.");
        console.info("This is an info log."); // This should also be detected
      }
    `;
    sourceFile = project.createSourceFile("testFile.ts", code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(2); // Two findings: console.warn and console.info
    expect(findings[0].description).toBe(
      "Presence of console log function detected."
    );
    expect(findings[1].description).toBe(
      "Presence of console log function detected."
    );
  });

  test("should not detect console log statements when none are present", () => {
    const code = `
      function test() {
        const message = "No console log here.";
        alert(message);
      }
    `;
    sourceFile = project.createSourceFile("testFile.ts", code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0); // No console log statements should be found
  });

  test("should detect console statements in nested functions", () => {
    const code = `
      function outer() {
        function inner() {
          console.log("Nested log.");
        }
        inner();
      }
    `;
    sourceFile = project.createSourceFile("testFile.ts", code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1); // One finding: console.log in nested function
    expect(findings[0].description).toBe(
      "Presence of console log function detected."
    );
  });

  test("should detect multiple console statements in different contexts", () => {
    const code = `
      function test() {
        console.log("Log 1");
        if (true) {
          console.error("Error log");
        }
        for (let i = 0; i < 1; i++) {
          console.warn("Warning log");
        }
      }
    `;
    sourceFile = project.createSourceFile("testFile.ts", code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(3); // Three findings: console.log, console.error, and console.warn
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
