import {
  SourceFile,
  Node,
  SyntaxKind,
  ForEachDescendantTraversalControl,
} from "ts-morph";

import { UsedBeforeDefinedFunctionsDetector } from "../../detectors/UsedBeforeDefinedFunctions";

describe("UsedBeforeDefinedFunctionsDetector", () => {
  let detector: UsedBeforeDefinedFunctionsDetector;
  let mockSourceFile: jest.Mocked<SourceFile>;
  let mockNode: jest.Mocked<Node>;

  beforeEach(() => {
    detector = new UsedBeforeDefinedFunctionsDetector();
    mockSourceFile = createMockSourceFile();
    mockNode = createMockNode();
  });

  it("should detect function expressions used before they are defined", () => {
    const functionDeclarationNode = createMockVariableDeclarationNode(
      "myFunction",
      10
    );
    const functionUsageNode = createMockCallExpressionNode("myFunction", 5);

    mockSourceFile.forEachDescendant.mockImplementation(
      (
        callback: (
          node: Node,
          traversal: ForEachDescendantTraversalControl
        ) => void,
        traversalOrder
      ) => {
        const traversalControl: ForEachDescendantTraversalControl = {
          stop: jest.fn(),
          skip: jest.fn(),
          up: jest.fn(),
        };
        callback(functionUsageNode, traversalControl);
        callback(functionDeclarationNode, traversalControl);
      }
    );

    const findings = detector.run(mockSourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      "Function 'myFunction' is used before it is defined."
    );
    expect(findings[0].position.filePath).toBe(mockSourceFile.getFilePath());
    expect(findings[0].position.lineNum).toBe(5);
  });

  it("should not report function expressions used after they are defined", () => {
    const functionDeclarationNode = createMockVariableDeclarationNode(
      "myFunction",
      5
    );
    const functionUsageNode = createMockCallExpressionNode("myFunction", 10);

    mockSourceFile.forEachDescendant.mockImplementation(
      (
        callback: (
          node: Node,
          traversal: ForEachDescendantTraversalControl
        ) => void,
        traversalOrder
      ) => {
        const traversalControl: ForEachDescendantTraversalControl = {
          stop: jest.fn(),
          skip: jest.fn(),
          up: jest.fn(),
        };
        callback(functionDeclarationNode, traversalControl);
        callback(functionUsageNode, traversalControl);
      }
    );

    const findings = detector.run(mockSourceFile);

    expect(findings).toHaveLength(0);
  });

  function createMockSourceFile(): jest.Mocked<SourceFile> {
    return {
      forEachDescendant: jest.fn(),
      getFilePath: jest.fn().mockReturnValue("mockFilePath.ts"),
    } as unknown as jest.Mocked<SourceFile>;
  }

  function createMockNode(): jest.Mocked<Node> {
    return {
      getParent: jest.fn(),
      getText: jest.fn(),
      getStartLineNumber: jest.fn(),
      getKind: jest.fn(), // Add getKind method
    } as unknown as jest.Mocked<Node>;
  }

  function createMockVariableDeclarationNode(
    name: string,
    line: number
  ): jest.Mocked<Node> & { getInitializer: () => Node } {
    return {
      ...createMockNode(),
      getName: jest.fn().mockReturnValue(name),
      getStartLineNumber: jest.fn().mockReturnValue(line),
      getKind: jest.fn().mockReturnValue(SyntaxKind.VariableDeclaration),
      getInitializer: jest.fn().mockReturnValue({
        ...createMockNode(),
        getKind: jest.fn().mockReturnValue(SyntaxKind.FunctionExpression),
      } as unknown as Node),
    } as unknown as jest.Mocked<Node> & { getInitializer: () => Node };
  }

  function createMockCallExpressionNode(
    name: string,
    line: number
  ): jest.Mocked<Node> & { getExpression: () => Node } {
    const mockCallExpressionNode = {
      ...createMockNode(),
      getKind: jest.fn().mockReturnValue(SyntaxKind.CallExpression),
      getExpression: jest.fn().mockReturnValue({
        ...createMockNode(),
        getKind: jest.fn().mockReturnValue(SyntaxKind.Identifier),
        getText: jest.fn().mockReturnValue(name),
      } as unknown as Node),
      getStartLineNumber: jest.fn().mockReturnValue(line),
    } as unknown as jest.Mocked<Node> & { getExpression: () => Node };
    return mockCallExpressionNode;
  }
});
