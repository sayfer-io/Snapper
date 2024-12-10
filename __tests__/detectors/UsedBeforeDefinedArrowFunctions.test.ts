import mockFs from "mock-fs";
import { Project } from "ts-morph";

import { UsedBeforeDefinedArrowFunctionsDetector } from "../../src/detectors/UsedBeforeDefinedArrowFunctions";

describe("UsedBeforeDefinedArrowFunctionsDetector", () => {
  let project: Project;
  let detector: UsedBeforeDefinedArrowFunctionsDetector;

  beforeEach(() => {
    project = new Project();
    detector = new UsedBeforeDefinedArrowFunctionsDetector();
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("should detect arrow functions used before they are defined", () => {
    mockFs({
      "mockFilePath1.ts": `
        myArrowFunction();
        const myArrowFunction = () => {};
      `,
    });

    const sourceFile = project.addSourceFileAtPath("mockFilePath1.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      "Arrow function 'myArrowFunction' is used before it is defined."
    );
    expect(findings[0].position.filePath).toBe(sourceFile.getFilePath());
  });

  it("should not report arrow functions used after they are defined", () => {
    mockFs({
      "mockFilePath2.ts": `
        const myArrowFunction = () => {};
        myArrowFunction();
      `,
    });

    const sourceFile = project.addSourceFileAtPath("mockFilePath2.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should detect multiple arrow functions used before they are defined", () => {
    mockFs({
      "mockFilePath3.ts": `
        myArrowFunction1();
        myArrowFunction2();
        const myArrowFunction1 = () => {};
        const myArrowFunction2 = () => {};
      `,
    });

    const sourceFile = project.addSourceFileAtPath("mockFilePath3.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(2);
    expect(findings[0].description).toBe(
      "Arrow function 'myArrowFunction1' is used before it is defined."
    );
    expect(findings[1].description).toBe(
      "Arrow function 'myArrowFunction2' is used before it is defined."
    );
  });

  it("should not report multiple arrow functions used after they are defined", () => {
    mockFs({
      "mockFilePath4.ts": `
        const myArrowFunction1 = () => {};
        const myArrowFunction2 = () => {};
        myArrowFunction1();
        myArrowFunction2();
      `,
    });

    const sourceFile = project.addSourceFileAtPath("mockFilePath4.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should detect mixed cases of arrow functions used before and after they are defined", () => {
    mockFs({
      "mockFilePath5.ts": `
        myArrowFunction1();
        const myArrowFunction1 = () => {};
        const myArrowFunction2 = () => {};
        myArrowFunction2();
      `,
    });

    const sourceFile = project.addSourceFileAtPath("mockFilePath5.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      "Arrow function 'myArrowFunction1' is used before it is defined."
    );
  });
});
