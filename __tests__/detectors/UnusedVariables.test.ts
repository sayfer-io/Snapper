import { SourceFile, Node, SyntaxKind, VariableDeclaration } from "ts-morph";

import { UnusedVariablesDetector } from "../../detectors/UnusedVariables";

describe("UnusedVariablesDetector", () => {
  let detector: UnusedVariablesDetector;
  let mockSourceFile: jest.Mocked<SourceFile>;

  beforeEach(() => {
    detector = new UnusedVariablesDetector();
    mockSourceFile = createMockSourceFile();
  });

  it("should detect variables that are declared but never used", () => {
    const mockVariableDeclarationNode = createMockVariableDeclarationNode(
      "unusedVariable",
      10
    );
    const mockIdentifierNode = createMockIdentifierNode("usedVariable", 5);

    jest
      .spyOn(detector as any, "getAllIdentifiers")
      .mockReturnValue([mockIdentifierNode]);

    mockSourceFile.getVariableDeclarations.mockReturnValue([
      mockVariableDeclarationNode,
    ]);

    mockSourceFile.forEachDescendant.mockImplementation(
      (callback, traversal) => {
        const traversalControl = {
          stop: jest.fn(),
          skip: jest.fn(),
          up: jest.fn(),
        };
        [mockVariableDeclarationNode, mockIdentifierNode].forEach((node) =>
          callback(node, traversalControl)
        );
      }
    );

    const findings = detector.run(mockSourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      "Variable 'unusedVariable' is declared but never used."
    );
    expect(findings[0].position.filePath).toBe(mockSourceFile.getFilePath());
    expect(findings[0].position.lineNum).toBe(10);
  });

  it("should not report variables that are used", () => {
    const mockVariableDeclarationNode = createMockVariableDeclarationNode(
      "usedVariable",
      5
    );
    const mockIdentifierNode = createMockIdentifierNode("usedVariable", 10);

    jest
      .spyOn(detector as any, "getAllIdentifiers")
      .mockReturnValue([mockIdentifierNode]);

    mockSourceFile.getVariableDeclarations.mockReturnValue([
      mockVariableDeclarationNode,
    ]);

    mockSourceFile.forEachDescendant.mockImplementation(
      (callback, traversal) => {
        const traversalControl = {
          stop: jest.fn(),
          skip: jest.fn(),
          up: jest.fn(),
        };
        [mockVariableDeclarationNode, mockIdentifierNode].forEach((node) =>
          callback(node, traversalControl)
        );
      }
    );

    const findings = detector.run(mockSourceFile);

    expect(findings).toHaveLength(0);
  });

  function createMockSourceFile(): jest.Mocked<SourceFile> {
    return {
      forEachDescendant: jest.fn(),
      getFilePath: jest.fn().mockReturnValue("mockFilePath.ts"),
      getVariableDeclarations: jest.fn(),
    } as unknown as jest.Mocked<SourceFile>;
  }

  function createMockNode(): jest.Mocked<Node> {
    return {
      getParent: jest.fn(),
      getText: jest.fn(),
      getStartLineNumber: jest.fn(),
      getKind: jest.fn(),
    } as unknown as jest.Mocked<Node>;
  }

  function createMockVariableDeclarationNode(
    name: string,
    line: number
  ): jest.Mocked<VariableDeclaration> {
    return {
      ...createMockNode(),
      getName: jest.fn().mockReturnValue(name),
      getStartLineNumber: jest.fn().mockReturnValue(line),
      getKind: jest.fn().mockReturnValue(SyntaxKind.VariableDeclaration),
      getSourceFile: jest.fn().mockReturnValue(mockSourceFile),
      isExported: jest.fn().mockReturnValue(false),
    } as unknown as jest.Mocked<VariableDeclaration>;
  }

  function createMockIdentifierNode(
    name: string,
    line: number
  ): jest.Mocked<Node> {
    return {
      ...createMockNode(),
      getText: jest.fn().mockReturnValue(name),
      getStartLineNumber: jest.fn().mockReturnValue(line),
      getKind: jest.fn().mockReturnValue(SyntaxKind.Identifier),
      getParent: jest.fn().mockReturnValue({
        ...createMockNode(),
        getKind: jest.fn().mockReturnValue(SyntaxKind.VariableDeclaration),
      } as unknown as Node),
    } as unknown as jest.Mocked<Node>;
  }
});
