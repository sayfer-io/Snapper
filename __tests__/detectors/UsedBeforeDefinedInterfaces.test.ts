import mockFs from "mock-fs";
import { Project, SourceFile } from "ts-morph";

import { UsedBeforeDefinedInterfacesDetector } from "../../detectors/UsedBeforeDefinedInterfaces";

describe("UsedBeforeDefinedInterfacesDetector", () => {
  let project: Project;
  let sourceFile: SourceFile;
  let detector: UsedBeforeDefinedInterfacesDetector;

  beforeEach(() => {
    project = new Project();
    detector = new UsedBeforeDefinedInterfacesDetector();
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("should detect interfaces used before they are defined", () => {
    mockFs({
      "test.ts": `
        const myVar: MyInterface;
        interface MyInterface {}
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      "Interface 'MyInterface' is used before it is defined."
    );
    expect(findings[0].position.filePath).toBe(sourceFile.getFilePath());
    expect(findings[0].position.lineNum).toBe(2);
  });

  it("should not report interfaces used after they are defined", () => {
    mockFs({
      "test.ts": `
        interface MyInterface {}
        const myVar: MyInterface;
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should detect multiple interfaces used before they are defined", () => {
    mockFs({
      "test.ts": `
        const myVar1: MyInterface1;
        const myVar2: MyInterface2;
        interface MyInterface1 {}
        interface MyInterface2 {}
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(2);
    expect(findings[0].description).toBe(
      "Interface 'MyInterface1' is used before it is defined."
    );
    expect(findings[1].description).toBe(
      "Interface 'MyInterface2' is used before it is defined."
    );
  });

  it("should not report multiple interfaces used after they are defined", () => {
    mockFs({
      "test.ts": `
        interface MyInterface1 {}
        interface MyInterface2 {}
        const myVar1: MyInterface1;
        const myVar2: MyInterface2;
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should detect interfaces used before they are defined in nested scopes", () => {
    mockFs({
      "test.ts": `
        function outer() {
          const myVar: MyInterface;
          interface MyInterface {}
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      "Interface 'MyInterface' is used before it is defined."
    );
  });

  it("should not report interfaces used after they are defined in nested scopes", () => {
    mockFs({
      "test.ts": `
        function outer() {
          interface MyInterface {}
          const myVar: MyInterface;
        }
      `,
    });

    sourceFile = project.addSourceFileAtPath("test.ts");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });
});
