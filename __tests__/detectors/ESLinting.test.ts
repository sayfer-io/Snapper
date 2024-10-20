import mockFs from "mock-fs";
import { Project, SourceFile } from "ts-morph";
import { ESLintingDetector } from "../../detectors/ESLinting";

describe("ESLintingDetector", () => {
  let detector: ESLintingDetector;
  let sourceFile: SourceFile;

  beforeAll(() => {
    detector = new ESLintingDetector();

    // Mock the file system with a sample TypeScript file
    mockFs({
      "/mock/project": {
        "test.ts": `
          const a: any = 5;
          console.log(a);
          function unusedFunction() {}
        `,
      },
    });

    // Set up ts-morph project and load the file
    const project = new Project();
    sourceFile = project.addSourceFileAtPath("/mock/project/test.ts");
  });

  afterAll(() => {
    mockFs.restore(); // Restore the actual file system after the test
  });

  it("should detect ESLint issues in the TypeScript file", async () => {
    const findings = await detector.run(sourceFile);

    expect(findings).toHaveLength(2); // Two findings expected: one for `any` type and one for unused function
    expect(findings[0].description).toContain("no-unused-vars");
    expect(findings[1].description).toContain(
      "@typescript-eslint/no-explicit-any"
    );
  });
});
