import mockFs from "mock-fs";
import { SourceFile, Project } from "ts-morph";

import { UsedBeforeDefinedArrowFunctionsDetector } from "../../detectors/UsedBeforeDefinedArrowFunctions";

describe("UsedBeforeDefinedArrowFunctionsDetector", () => {
  let detector: UsedBeforeDefinedArrowFunctionsDetector;
  let project: Project;

  beforeEach(() => {
    detector = new UsedBeforeDefinedArrowFunctionsDetector();
    project = new Project();
  });

  afterEach(() => {
    mockFs.restore();
  });

  const createMockFile = (
    filePath: string,
    fileContent: string
  ): SourceFile => {
    mockFs({
      [filePath]: fileContent,
    });

    return project.addSourceFileAtPath(filePath);
  };

  it("should detect arrow functions used before they are defined", () => {
    const mockFilePath = "mockFilePath1.ts";
    const mockFileContent = `
          myArrowFunction();
          const myArrowFunction = () => {};
        `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      "Arrow function 'myArrowFunction' is used before it is defined."
    );
    expect(findings[0].position.filePath).toBe(sourceFile.getFilePath());
  });

  it("should not report arrow functions used after they are defined", () => {
    const mockFilePath = "mockFilePath2.ts";
    const mockFileContent = `
          const myArrowFunction = () => {};
      myArrowFunction();
        `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should detect multiple arrow functions used before they are defined", () => {
    const mockFilePath = "mockFilePath3.ts";
    const mockFileContent = `
          myArrowFunction1();
          myArrowFunction2();
          const myArrowFunction1 = () => {};
          const myArrowFunction2 = () => {};
        `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);

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
    const mockFilePath = "mockFilePath4.ts";
    const mockFileContent = `
          const myArrowFunction1 = () => {};
          const myArrowFunction2 = () => {};
          myArrowFunction1();
          myArrowFunction2();
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should detect mixed cases of arrow functions used before and after they are defined", () => {
    const mockFilePath = "mockFilePath5.ts";
    const mockFileContent = `
          myArrowFunction1();
          const myArrowFunction1 = () => {};
          const myArrowFunction2 = () => {};
          myArrowFunction2();
        `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      "Arrow function 'myArrowFunction1' is used before it is defined."
    );
  });
});
