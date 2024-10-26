import mockFs from "mock-fs";
import { Project } from "ts-morph";

import { ImproperTypeUsageDetector } from "../../detectors/ImproperTypeUsage";

describe("ImproperTypeUsageDetector", () => {
  let detector: ImproperTypeUsageDetector;
  let project: Project;

  beforeEach(() => {
    detector = new ImproperTypeUsageDetector();
    project = new Project();
  });

  afterEach(() => {
    mockFs.restore();
  });

  const createMockFile = (filePath: string, fileContent: string) => {
    mockFs({
      [filePath]: fileContent,
    });

    return project.addSourceFileAtPath(filePath);
  };

  it("should detect 'any' type in variable declarations", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const someVar: any = "test";
      console.log(someVar);
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toContain(
      "Variable 'someVar' uses 'any' type, which reduces type safety."
    );
  });

  it("should detect 'any' type in function parameters", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      function someFunction(param: any) {
        console.log(param);
        return param;
      }
      someFunction("test");
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toContain(
      "Parameter 'param' in function 'someFunction' uses 'any' type, which reduces type safety."
    );
  });

  it("should detect 'any' type in arrow function parameters", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const someArrowFunction = (param: any) => {
        console.log(param);
        return param;
      };
      someArrowFunction("test");
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toContain(
      "Parameter 'param' in arrow function uses 'any' type, which reduces type safety."
    );
  });

  it("should detect 'any' type in renderActiveShape function", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const renderActiveShape = (props: any) => {
        console.log("Rendering shape with props:", props);
        // function body
      };
      renderActiveShape({ shape: "circle" });
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toContain(
      "Parameter 'props' in arrow function uses 'any' type, which reduces type safety."
    );
  });

  it("should detect 'any' type in BalancePie function", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const BalancePie = ({ data }: any) => {
        console.log("Rendering BalancePie with data:", data);
        // function body
      };
      BalancePie({ balance: 100 });
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toContain(
      "Parameter 'data' in arrow function uses 'any' type, which reduces type safety."
    );
  });

  it("should detect 'any' type in onPieEnter function", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const onPieEnter = (_: any, index: any) => {
        console.log("Pie entered at index:", index);
        // function body
      };
      onPieEnter({}, 1);
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(2);
    expect(findings[0].description).toContain(
      "Parameter '_' in arrow function uses 'any' type, which reduces type safety."
    );
    expect(findings[1].description).toContain(
      "Parameter 'index' in arrow function uses 'any' type, which reduces type safety."
    );
  });

  it("should not detect 'any' type in properly typed function", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const properlyTypedFunction = (param: string) => {
        console.log(param);
        return param;
      };
      properlyTypedFunction("test");
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });
});
