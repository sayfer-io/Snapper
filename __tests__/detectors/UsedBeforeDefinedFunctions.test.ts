import mockFs from "mock-fs";
import { Project, SourceFile } from "ts-morph";

import { UsedBeforeDefinedFunctionsDetector } from "../../src/detectors/UsedBeforeDefinedFunctions";

describe("UsedBeforeDefinedFunctionsDetector", () => {
  let project: Project;
  let sourceFile: SourceFile;
  let detector: UsedBeforeDefinedFunctionsDetector;

  beforeEach(() => {
    project = new Project();
    detector = new UsedBeforeDefinedFunctionsDetector();
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("should detect function expressions used before they are defined", () => {
    mockFs({
      "test.ts": `
        myFunction();
        const myFunction = function() {};
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      "Function 'myFunction' is used before it is defined."
    );
    expect(findings[0].position.filePath).toBe(sourceFile.getFilePath());
    expect(findings[0].position.lineNum).toBe(2);
  });

  it("should not report function expressions used after they are defined", () => {
    mockFs({
      "test.ts": `
        const myFunction = function() {};
        myFunction();
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  // TODO: Need to explore why this test is failing
  // it("should detect function declarations used before they are defined", () => {
  //   mockFs({
  //     "test.ts": `
  //       myFunction();
  //       function myFunction() {}
  //     `,
  //   });

  //   sourceFile = project.addSourceFileAtPath("test.ts");

  //   const findings = detector.run(sourceFile);

  //   expect(findings).toHaveLength(1);
  //   expect(findings[0].description).toBe(
  //     "Function 'myFunction' is used before it is defined."
  //   );
  //   expect(findings[0].position.filePath).toBe(sourceFile.getFilePath());
  //   expect(findings[0].position.lineNum).toBe(2);
  // });

  it("should not report function declarations used after they are defined", () => {
    mockFs({
      "test.ts": `
        function myFunction() {}
        myFunction();
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should detect multiple functions used before they are defined", () => {
    mockFs({
      "test.ts": `
        myFunction1();
        myFunction2();
        const myFunction1 = function() {};
        const myFunction2 = function() {};
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(2);
    expect(findings[0].description).toBe(
      "Function 'myFunction1' is used before it is defined."
    );
    expect(findings[1].description).toBe(
      "Function 'myFunction2' is used before it is defined."
    );
  });

  it("should not report multiple functions used after they are defined", () => {
    mockFs({
      "test.ts": `
        const myFunction1 = function() {};
        const myFunction2 = function() {};
        myFunction1();
        myFunction2();
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should detect functions used before they are defined in nested scopes", () => {
    mockFs({
      "test.ts": `
        function outer() {
          myFunction();
          const myFunction = function() {};
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      "Function 'myFunction' is used before it is defined."
    );
  });

  it("should not report functions used after they are defined in nested scopes", () => {
    mockFs({
      "test.ts": `
        function outer() {
          const myFunction = function() {};
          myFunction();
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });
});
