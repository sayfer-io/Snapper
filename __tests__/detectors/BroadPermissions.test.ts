import mockFs from "mock-fs";
import { SourceFile, Project } from "ts-morph";

import { BroadPermissionsDetector } from "../../detectors/BroadPermissions";

describe("BroadPermissionsDetector", () => {
  let detector: BroadPermissionsDetector;
  let project: Project;

  beforeEach(() => {
    detector = new BroadPermissionsDetector();
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

    // Add the source file to the project
    return project.addSourceFileAtPath(filePath);
  };

  it("should detect broad permissions in snap.manifest.json", () => {
    const mockFilePath = "snap.manifest.json";
    const mockFileContent = `
      {
        "initialPermissions": {
          "snap_manageAccounts": {},
          "endowment:network-access": {}
        }
      }
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toContain(
      "Broad permissions detected: snap_manageAccounts, endowment:network-access"
    );
  });

  it("should not report when there are no broad permissions in snap.manifest.json", () => {
    const mockFilePath = "snap.manifest.json";
    const mockFileContent = `
      {
        "initialPermissions": {
          "some_other_permission": {}
        }
      }
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should not detect permissions outside initialPermissions in snap.manifest.json", () => {
    const mockFilePath = "snap.manifest.json";
    const mockFileContent = `
      {
        "permissions": {
          "snap_manageAccounts": {},
          "some_other_permission": {}
        }
      }
    `;

    const sourceFile = createMockFile(mockFilePath, mockFileContent);
    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });
});
