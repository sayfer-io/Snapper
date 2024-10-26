import mockFs from "mock-fs";
import { Project, SourceFile } from "ts-morph";

import { ESLintingDetector } from "../../detectors/ESLinting";

describe("ESLintingDetector", () => {
  let detector: ESLintingDetector;
  let sourceFile: SourceFile;

  beforeAll(() => {
    detector = new ESLintingDetector();

    mockFs({
      "/mock/project": {
        "test.ts": `
          const a: any = 5;
          console.log(a);
          function unusedFunction() {}
        `,
      },
    });

    const project = new Project();
    sourceFile = project.addSourceFileAtPath("/mock/project/test.ts");
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("should detect ESLint issues in the TypeScript file", async () => {
    const findings = await detector.run(sourceFile);

    expect(findings).toHaveLength(2);
    expect(findings[0].description).toContain("no-unused-vars");
    expect(findings[1].description).toContain(
      "@typescript-eslint/no-explicit-any"
    );
  });
});
