import { Project, SourceFile } from "ts-morph";

import { Finding } from "../../types";
import { HardcodedSecretsDetector } from "../../detectors/HardcodedSecrets";

describe("HardcodedSecretsDetector", () => {
  let project: Project;
  let sourceFile: SourceFile;
  let detector: HardcodedSecretsDetector;

  beforeEach(() => {
    project = new Project();
    detector = new HardcodedSecretsDetector();
  });

  const createSourceFileWithCode = (code: string) => {
    return project.createSourceFile("testFile.ts", code);
  };

  const toBase64 = (str: string) => Buffer.from(str).toString("base64");

  test("should detect base64 strings longer than 12 characters", () => {
    const secretString = "testlongstring";
    const base64Secret = toBase64(secretString);
    const code = `
      const secret = "${base64Secret}"; // base64 for "${secretString}"
    `;
    sourceFile = createSourceFileWithCode(code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1);
    expect(findings[0].description).toContain(
      "Potential hardcoded secret detected"
    );
  });

  test("should detect private key", () => {
    const code = `
      const privateKey = "-----BEGIN RSA PRIVATE KEY-----";
    `;
    sourceFile = createSourceFileWithCode(code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1);
    expect(findings[0].description).toContain(
      "Potential hardcoded secret detected"
    );
  });

  test("should detect certificate", () => {
    const code = `
      const certificate = "-----BEGIN CERTIFICATE-----";
    `;
    sourceFile = createSourceFileWithCode(code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1);
    expect(findings[0].description).toContain(
      "Potential hardcoded secret detected"
    );
  });

  test("should detect URL with credentials", () => {
    const code = `
      const url = "http://username:password@hostname";
    `;
    sourceFile = createSourceFileWithCode(code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1);
    expect(findings[0].description).toContain(
      "Potential hardcoded secret detected"
    );
  });

  test("should detect JWT token", () => {
    const code = `
      const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    `;
    sourceFile = createSourceFileWithCode(code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(1);
    expect(findings[0].description).toContain(
      "Potential hardcoded secret detected"
    );
  });

  test("should not detect non-secret strings", () => {
    const code = `
      const nonSecret = "This is just a regular string.";
    `;
    sourceFile = createSourceFileWithCode(code);

    const findings: Finding[] = detector.run(sourceFile);

    expect(findings.length).toBe(0);
  });
});
