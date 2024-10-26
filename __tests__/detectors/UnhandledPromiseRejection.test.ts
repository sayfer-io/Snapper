import mockFs from "mock-fs";
import { Project } from "ts-morph";

import { UnhandledPromiseRejectionDetector } from "../../detectors/UnhandledPromiseRejection";

describe("UnhandledPromiseRejectionDetector", () => {
  let detector: UnhandledPromiseRejectionDetector;
  let project: Project;

  beforeEach(() => {
    detector = new UnhandledPromiseRejectionDetector();
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

  it("should detect empty catch block", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const getZetaBal = async () => {
        try {
          // ... code ...
        } catch (error) {
          // empty catch block
        }
      };
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toContain(
      "Empty or ineffective catch block detected"
    );
  });

  it("should detect ineffective catch block with console.log", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const getZetaBal = async () => {
        try {
          // ... code ...
        } catch (error) {
          console.log('Error fetching Zeta balance:', error);
        }
      };
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toContain(
      "Empty or ineffective catch block detected"
    );
  });

  it("should detect ineffective catch block with null statement", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const getZetaBal = async () => {
        try {
          // ... code ...
        } catch (error) {
          null;
        }
      };
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toContain(
      "Empty or ineffective catch block detected"
    );
  });

  it("should detect ineffective catch block with pass statement", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const getZetaBal = async () => {
        try {
          // ... code ...
        } catch (error) {
          pass;
        }
      };
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toContain(
      "Empty or ineffective catch block detected"
    );
  });

  it("should detect ineffective catch block with placeholder statement", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const getZetaBal = async () => {
        try {
          // ... code ...
        } catch (error) {
          placeholder;
        }
      };
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toContain(
      "Empty or ineffective catch block detected"
    );
  });

  it("should detect ineffective catch block with empty block", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const getZetaBal = async () => {
        try {
          // ... code ...
        } catch (error) {
          {}
        }
      };
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toContain(
      "Empty or ineffective catch block detected"
    );
  });

  it("should detect ineffective catch block with return undefined", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const getZetaBal = async () => {
        try {
          // ... code ...
        } catch (error) {
          return undefined;
        }
      };
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toContain(
      "Empty or ineffective catch block detected"
    );
  });

  it("should detect ineffective catch block with throw Error()", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const getZetaBal = async () => {
        try {
          // ... code ...
        } catch (error) {
          throw Error();
        }
      };
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toContain(
      "Empty or ineffective catch block detected"
    );
  });

  it("should detect ineffective catch block with comment", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const getZetaBal = async () => {
        try {
          // ... code ...
        } catch (error) {
          // TODO: fix this
        }
      };
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toContain(
      "Empty or ineffective catch block detected"
    );
  });

  it("should not detect meaningful catch block", () => {
    const mockFilePath = "testFile.ts";
    const mockFileContent = `
      const getZetaBal = async () => {
        try {
          // ... code ...
        } catch (error) {
          console.error('Error fetching Zeta balance:', error);
          // Optionally, update state to show error to user
        }
      };
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });
});
