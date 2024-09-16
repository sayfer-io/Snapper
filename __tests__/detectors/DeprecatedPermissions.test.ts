import { Project, SourceFile } from "ts-morph";

import { Finding } from "../../types";
import { DeprecatedPermissionsDetector } from "../../detectors/DeprecatedPermissions";

describe("DeprecatedPermissionsDetector", () => {
  let project: Project;
  let sourceFile: SourceFile;
  let detector: DeprecatedPermissionsDetector;

  beforeEach(() => {
    project = new Project();
    detector = new DeprecatedPermissionsDetector();
  });

  test("should detect deprecated permissions in snap.manifest.json", () => {
    const code = `
      {
        "initialPermissions": {
          "endowment:long-running": {}
        }
      }
    `;
    sourceFile = project.createSourceFile("snap.manifest.json", code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1); // One deprecated permission
    expect(findings[0].description).toBe(
      "Permission 'endowment:long-running' is deprecated."
    );
  });

  test("should not detect any deprecated permissions when none are present", () => {
    const code = `
      {
        "initialPermissions": {
          "endowment:other-permission": {}
        }
      }
    `;
    sourceFile = project.createSourceFile("snap.manifest.json", code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0); // No deprecated permissions should be found
  });

  test("should detect multiple deprecated permissions", () => {
    const code = `
      {
        "initialPermissions": {
          "endowment:long-running": {},
          "endowment:another-deprecated": {}
        }
      }
    `;
    sourceFile = project.createSourceFile("snap.manifest.json", code);

    // Add "endowment:another-deprecated" to the deprecated permissions list for this test
    (DeprecatedPermissionsDetector as any).DEPRECATED_PERMISSIONS.push(
      "endowment:another-deprecated"
    );

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(2); // Two deprecated permissions
    expect(findings[0].description).toBe(
      "Permission 'endowment:long-running' is deprecated."
    );
    expect(findings[1].description).toBe(
      "Permission 'endowment:another-deprecated' is deprecated."
    );

    // Clean up the added deprecated permission
    (DeprecatedPermissionsDetector as any).DEPRECATED_PERMISSIONS.pop();
  });
});
