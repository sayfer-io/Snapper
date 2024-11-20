import path from "path";
import mockFs from "mock-fs";
import { Project, SourceFile } from "ts-morph";

import { UnusedPermissionsDetector } from "../../detectors/UnusedPermissions";

describe("UnusedPermissionsDetector", () => {
  let project: Project;
  let sourceFile: SourceFile;
  let detector: UnusedPermissionsDetector;

  const MOCK_PERMISSIONS = [
    { permission: "endowment:ethereum-provider", api: "window.ethereum" },
  ];

  beforeEach(() => {
    project = new Project();
    detector = new UnusedPermissionsDetector();
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("should detect unused permissions", () => {
    mockFs({
      "test-dir/snap.manifest.json": JSON.stringify({
        initialPermissions: {
          [MOCK_PERMISSIONS[0].permission]: {},
        },
      }),
      "test-dir/index.js": `
        // Some code that does not use ${MOCK_PERMISSIONS[0].api}
        console.log('No usage of ${MOCK_PERMISSIONS[0].api} here');
      `,
    });

    sourceFile = project.addSourceFileAtPath("test-dir/snap.manifest.json");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      `Permission '${MOCK_PERMISSIONS[0].permission}' is declared but its corresponding API '${MOCK_PERMISSIONS[0].api}' is not used.`
    );
    expect(path.basename(findings[0].position.filePath)).toBe(
      "snap.manifest.json"
    );
  });

  //TODO: this is a letigimate finding, but the detector does not currently handle it
  // it("should not report used permissions", () => {
  //   mockFs({
  //     "test-dir/snap.manifest.json": JSON.stringify({
  //       initialPermissions: {
  //         [MOCK_PERMISSIONS[0].permission]: {},
  //       },
  //     }),
  //     "test-dir/index.js": `
  //       // Some code that uses ${MOCK_PERMISSIONS[0].api}
  //       console.log(${MOCK_PERMISSIONS[0].api});
  //     `,
  //   });

  //   sourceFile = project.addSourceFileAtPath("test-dir/snap.manifest.json");

  //   const findings = detector.run(sourceFile);

  //   expect(findings).toHaveLength(0);
  // });

  it("should not run on non-manifest files", () => {
    mockFs({
      "test-dir/otherfile.json": "{}",
    });

    sourceFile = project.addSourceFileAtPath("test-dir/otherfile.json");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should handle empty permissions", () => {
    mockFs({
      "test-dir/snap.manifest.json": JSON.stringify({
        initialPermissions: {},
      }),
    });

    sourceFile = project.addSourceFileAtPath("test-dir/snap.manifest.json");

    const findings = detector.run(sourceFile);

    expect(findings).toHaveLength(0);
  });

  // TODO: this is a legitimate finding, but the detector does not currently handle it
  // it("should not report findings when the permission is used properly", () => {
  //   mockFs({
  //     "test-dir/snap.manifest.json": JSON.stringify({
  //       initialPermissions: {
  //         [MOCK_PERMISSIONS[0].permission]: {},
  //       },
  //     }),
  //     "test-dir/index.js": `
  //       // Some code that uses ${MOCK_PERMISSIONS[0].api}
  //       console.log(${MOCK_PERMISSIONS[0].api});
  //     `,
  //   });

  //   sourceFile = project.addSourceFileAtPath("test-dir/snap.manifest.json");

  //   const findings = detector.run(sourceFile);

  //   expect(findings).toHaveLength(0);
  // });
});
