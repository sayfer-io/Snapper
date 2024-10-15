import path from "path";
import mockFs from "mock-fs";
import { Project, SourceFile } from "ts-morph";

import { LeftoverTODOsDetector } from "../../detectors/LeftoverTODOs";

describe("LeftoverTODOsDetector", () => {
  let detector: LeftoverTODOsDetector;
  let sourceFile: SourceFile;

  beforeEach(() => {
    detector = new LeftoverTODOsDetector();

    mockFs({
      "wallet-guard-snap/": {
        "example.ts": `
          // TODO: This is a file-level TODO

          function exampleFunction() {
              // TODO: This is an inline TODO
              console.log("Example function");
          }

          /*
           * TODO: This is a multiline TODO
           * that spans multiple lines.
           */

          class ExampleClass {
              constructor() {
                  // TODO: Constructor TODO
              }

              method() {
                  console.log("Method in ExampleClass"); // TODO: Inline TODO at end of line
              }
          }

          // TODO: Another file-level TODO

          // Some buffer code
          const buffer = Buffer.alloc(10);

          // TODO: Buffer allocation TODO
        `,
        "anotherExample.ts": `
          // TODO: File-level TODO in another file

          const anotherFunction = () => {
              // TODO: Inline TODO in arrow function
              console.log("Another function");
          };

          /*
           * TODO: Multiline TODO in another file
           * that spans multiple lines.
           */

          class AnotherClass {
              constructor() {
                  // TODO: Constructor TODO in another file
              }

              anotherMethod() {
                  console.log("Method in AnotherClass"); // TODO: Inline TODO at end of line in another file
              }
          }
        `,
      },
    });

    const project = new Project();
    sourceFile = project.addSourceFileAtPath("wallet-guard-snap/example.ts");
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("should retrieve all TODO comments from the source file", () => {
    const todos = detector.run(sourceFile);

    expect(todos).toEqual([
      {
        description: "Leftover TODO comment detected.",
        position: {
          filePath: path.resolve("wallet-guard-snap/example.ts"),
          lineNum: 2,
        },
        riskRating: 2,
        type: "LeftoverTODOs",
      },
      {
        description: "Leftover TODO comment detected.",
        position: {
          filePath: path.resolve("wallet-guard-snap/example.ts"),
          lineNum: 5,
        },
        riskRating: 2,
        type: "LeftoverTODOs",
      },
      {
        description: "Leftover TODO comment detected.",
        position: {
          filePath: path.resolve("wallet-guard-snap/example.ts"),
          lineNum: 9,
        },
        riskRating: 2,
        type: "LeftoverTODOs",
      },
      {
        description: "Leftover TODO comment detected.",
        position: {
          filePath: path.resolve("wallet-guard-snap/example.ts"),
          lineNum: 20,
        },
        riskRating: 2,
        type: "LeftoverTODOs",
      },
      {
        description: "Leftover TODO comment detected.",
        position: {
          filePath: path.resolve("wallet-guard-snap/example.ts"),
          lineNum: 24,
        },
        riskRating: 2,
        type: "LeftoverTODOs",
      },
      {
        description: "Leftover TODO comment detected.",
        position: {
          filePath: path.resolve("wallet-guard-snap/example.ts"),
          lineNum: 29,
        },
        riskRating: 2,
        type: "LeftoverTODOs",
      },
    ]);
  });

  it("should retrieve all TODO comments from another source file", () => {
    const anotherSourceFile = new Project().addSourceFileAtPath(
      "wallet-guard-snap/anotherExample.ts"
    );
    const todos = detector.run(anotherSourceFile);

    expect(todos).toEqual([
      {
        description: "Leftover TODO comment detected.",
        position: {
          filePath: path.resolve("wallet-guard-snap/anotherExample.ts"),
          lineNum: 2,
        },
        riskRating: 2,
        type: "LeftoverTODOs",
      },
      {
        description: "Leftover TODO comment detected.",
        position: {
          filePath: path.resolve("wallet-guard-snap/anotherExample.ts"),
          lineNum: 5,
        },
        riskRating: 2,
        type: "LeftoverTODOs",
      },
      {
        description: "Leftover TODO comment detected.",
        position: {
          filePath: path.resolve("wallet-guard-snap/anotherExample.ts"),
          lineNum: 9,
        },
        riskRating: 2,
        type: "LeftoverTODOs",
      },
      {
        description: "Leftover TODO comment detected.",
        position: {
          filePath: path.resolve("wallet-guard-snap/anotherExample.ts"),
          lineNum: 20,
        },
        riskRating: 2,
        type: "LeftoverTODOs",
      },
    ]);
  });

  it("should handle files with no TODO comments", () => {
    mockFs({
      "wallet-guard-snap/": {
        "noTodos.ts": `
          function noTodosFunction() {
              console.log("This function has no TODOs");
          }

          class NoTodosClass {
              method() {
                  console.log("Method in NoTodosClass");
              }
          }
        `,
      },
    });

    const noTodosSourceFile = new Project().addSourceFileAtPath(
      "wallet-guard-snap/noTodos.ts"
    );
    const todos = detector.run(noTodosSourceFile);

    expect(todos).toEqual([]);
  });

  it("should handle files with TODOs mentioned later in the text", () => {
    mockFs({
      "wallet-guard-snap/nonTodoComments.ts": `
        // This is a regular comment
        /* Block comment without TODO */
        function someFunction() {
            console.log("No TODOs here.");
        }
      `,
    });
    const nonTodoFile = new Project().addSourceFileAtPath(
      "wallet-guard-snap/nonTodoComments.ts"
    );
    const todos = detector.run(nonTodoFile);
    expect(todos.length).toBe(1);
  });

  // TODO: this test doesn't appear to work becase of mock-fs. Find a workaround.
  // it("should detect TODOs in special scenarios (e.g., nested structures)", () => {
  //   mockFs({
  //     "wallet-guard-snap/specialTodos.ts": `
  //       const obj = {
  //         nested: {
  //           // TODO: Nested TODO comment
  //         },
  //       };

  //       function specialFunction() {
  //         // TODO: Another nested TODO in function
  //       }
  //     `,
  //   });
  //   const specialTodosFile = new Project().addSourceFileAtPath(
  //     "wallet-guard-snap/specialTodos.ts"
  //   );
  //   const todos = detector.run(specialTodosFile);
  //   expect(todos.length).toBe(2);
  // });
});
