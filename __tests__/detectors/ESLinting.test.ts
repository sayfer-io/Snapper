import mockFs from "mock-fs";
import { Project } from "ts-morph";

import { ESLintingDetector } from "../../detectors/ESLinting";

describe("ESLintingDetector", () => {
  let project: Project;
  let detector: ESLintingDetector;

  beforeAll(() => {
    project = new Project();
    detector = new ESLintingDetector();
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("should detect ESLint issues in the TypeScript file", async () => {
    mockFs({
      "/mock/project": {
        "test.ts": `
          const a: any = 5; // Rule: "@typescript-eslint/no-explicit-any"
          console.log(a);
      `,
      },
    });

    const sourceFile = project.addSourceFileAtPath("/mock/project/test.ts");

    const findings = await detector.run(sourceFile);

    expect(findings).toHaveLength(1);
  });
});
