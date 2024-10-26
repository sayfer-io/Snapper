import path from "path";
import mockFs from "mock-fs";
import { Project, SourceFile } from "ts-morph";

import { UnusedPermissionsDetector } from "../../detectors/UnusedPermissions";

describe("UnusedPermissionsDetector", () => {
  let detector: UnusedPermissionsDetector;
  let project: Project;
  let sourceFile: SourceFile;

  const getRandomDir = () =>
    `test-${Math.random().toString(36).substring(2, 15)}`;
  const MOCK_UNUSED_PERMISSION = "endowment:ethereum-provider";
  const MOCK_USED_PERMISSION = "endowment:used-permission";
  const MOCK_UNUSED_API = "window.ethereum";
  const MOCK_USED_API = "window.usedApi";

  beforeEach(() => {
    detector = new UnusedPermissionsDetector();
    project = new Project();
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("should detect unused permissions and not report used permissions", () => {
    const MOCK_DIR = getRandomDir();
    const MOCK_FILE_PATH = `${MOCK_DIR}/snap.manifest.json`;

    mockFs({
      [MOCK_DIR]: {
        "snap.manifest.json": JSON.stringify({
          initialPermissions: {
            [MOCK_UNUSED_PERMISSION]: {},
            [MOCK_USED_PERMISSION]: {},
          },
        }),
        "index.js": `
          // Some code that uses window.usedApi
          console.log(window.usedApi);
        `,
      },
    });

    sourceFile = project.addSourceFileAtPath(MOCK_FILE_PATH);

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      `Permission '${MOCK_UNUSED_PERMISSION}' is declared but its corresponding API '${MOCK_UNUSED_API}' is not used.`
    );
    expect(path.basename(findings[0].position.filePath)).toBe(
      path.basename(MOCK_FILE_PATH)
    );

    const usedPermissionFinding = findings.find((finding) =>
      finding.description.includes(MOCK_USED_PERMISSION)
    );
    expect(usedPermissionFinding).toBeUndefined();
  });

  it("should not report used permissions", () => {
    const MOCK_DIR = getRandomDir();
    const MOCK_FILE_PATH = `${MOCK_DIR}/snap.manifest.json`;

    mockFs({
      [MOCK_DIR]: {
        "snap.manifest.json": JSON.stringify({
          initialPermissions: {
            [MOCK_USED_PERMISSION]: {},
          },
        }),
        "index.js": `
          // Some code that uses window.usedApi
          console.log(window.usedApi);
        `,
      },
    });

    sourceFile = project.addSourceFileAtPath(MOCK_FILE_PATH);

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should not run on non-manifest files", () => {
    const MOCK_DIR = getRandomDir();
    const MOCK_OTHER_FILE_PATH = `${MOCK_DIR}/otherfile.json`;

    mockFs({
      [MOCK_DIR]: {
        "otherfile.json": "{}",
      },
    });

    sourceFile = project.addSourceFileAtPath(MOCK_OTHER_FILE_PATH);

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should handle empty permissions", () => {
    const MOCK_DIR = getRandomDir();
    const MOCK_FILE_PATH = `${MOCK_DIR}/snap.manifest.json`;

    mockFs({
      [MOCK_DIR]: {
        "snap.manifest.json": JSON.stringify({
          initialPermissions: {},
        }),
      },
    });

    sourceFile = project.addSourceFileAtPath(MOCK_FILE_PATH);

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should not report findings when the permission is used properly", () => {
    const MOCK_DIR = getRandomDir();
    const MOCK_FILE_PATH = `${MOCK_DIR}/snap.manifest.json`;

    mockFs({
      [MOCK_DIR]: {
        "snap.manifest.json": JSON.stringify({
          initialPermissions: {
            [MOCK_USED_PERMISSION]: {},
          },
        }),
        "index.js": `
          // Some code that uses window.usedApi
          console.log(window.usedApi);
        `,
      },
    });

    sourceFile = project.addSourceFileAtPath(MOCK_FILE_PATH);

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });
});
