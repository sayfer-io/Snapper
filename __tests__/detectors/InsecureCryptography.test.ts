import { Project, SourceFile } from "ts-morph";

import { Finding } from "../../types";
import { InsecureCryptographyDetector } from "../../detectors/InsecureCryptography";

describe("InsecureCryptographyDetector", () => {
  let project: Project;
  let sourceFile: SourceFile;
  let detector: InsecureCryptographyDetector;

  beforeEach(() => {
    project = new Project();
    detector = new InsecureCryptographyDetector();
  });

  const createSourceFileWithCode = (code: string) => {
    return project.createSourceFile("testFile.ts", code);
  };

  test("should detect PBKDF2 call with low iterations", () => {
    const code = `
      const crypto = require('crypto');
      const key = crypto.pbkdf2Sync('password', 'salt', 5000, 64, 'sha512');
    `;
    sourceFile = createSourceFileWithCode(code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1); // One insecure PBKDF2 call
    expect(findings[0].description).toBe(
      `Usage of PBKDF2 with low iteration count: 5000`
    );
  });

  test("should not detect PBKDF2 call with sufficient iterations", () => {
    const code = `
      const crypto = require('crypto');
      const key = crypto.pbkdf2Sync('password', 'salt', 20000, 64, 'sha512');
    `;
    sourceFile = createSourceFileWithCode(code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0); // No insecure PBKDF2 calls should be found
  });

  test("should detect multiple PBKDF2 calls with low iterations", () => {
    const code = `
      const crypto = require('crypto');
      const key1 = crypto.pbkdf2Sync('password', 'salt', 5000, 64, 'sha512');
      const key2 = crypto.pbkdf2Sync('password', 'salt', 8000, 64, 'sha512');
    `;
    sourceFile = createSourceFileWithCode(code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(2); // Two insecure PBKDF2 calls
    expect(findings[0].description).toBe(
      `Usage of PBKDF2 with low iteration count: 5000`
    );
    expect(findings[1].description).toBe(
      `Usage of PBKDF2 with low iteration count: 8000`
    );
  });
});
