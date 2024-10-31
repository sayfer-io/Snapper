import {
  SourceFile,
  Node,
  SyntaxKind,
  ForEachDescendantTraversalControl,
} from "ts-morph";

import { UsedBeforeDefinedInterfacesDetector } from "../../detectors/UsedBeforeDefinedInterfaces";

describe("UsedBeforeDefinedInterfacesDetector", () => {
  let detector: UsedBeforeDefinedInterfacesDetector;
  let mockSourceFile: jest.Mocked<SourceFile>;
  let mockNode: jest.Mocked<Node>;

  beforeEach(() => {
    detector = new UsedBeforeDefinedInterfacesDetector();
    mockSourceFile = createMockSourceFile();
    mockNode = createMockNode();
  });

  it("should detect interfaces used before they are defined", () => {
    const interfaceDeclarationNode = createMockInterfaceDeclarationNode(
      "MyInterface",
      10
    );
    const interfaceUsageNode = createMockIdentifierNode("MyInterface", 5);

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
        callback(interfaceUsageNode, traversalControl);
        callback(interfaceDeclarationNode, traversalControl);
      }
    );

    const findings = detector.run(mockSourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      "Interface 'MyInterface' is used before it is defined."
    );
    expect(findings[0].position.filePath).toBe(mockSourceFile.getFilePath());
    expect(findings[0].position.lineNum).toBe(5);
  });

  it("should not report interfaces used after they are defined", () => {
    const interfaceDeclarationNode = createMockInterfaceDeclarationNode(
      "MyInterface",
      5
    );
    const interfaceUsageNode = createMockIdentifierNode("MyInterface", 10);

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
        callback(interfaceDeclarationNode, traversalControl);
        callback(interfaceUsageNode, traversalControl);
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

  function createMockInterfaceDeclarationNode(
    name: string,
    line: number
  ): jest.Mocked<Node> & { getName: () => string } {
    return {
      ...createMockNode(),
      getName: jest.fn().mockReturnValue(name),
      getStartLineNumber: jest.fn().mockReturnValue(line),
      getKind: jest.fn().mockReturnValue(SyntaxKind.InterfaceDeclaration),
    } as unknown as jest.Mocked<Node> & { getName: () => string };
  }

  function createMockIdentifierNode(
    name: string,
    line: number
  ): jest.Mocked<Node> {
    const mockIdentifierNode = createMockNode();
    mockIdentifierNode.getText.mockReturnValue(name);
    mockIdentifierNode.getStartLineNumber.mockReturnValue(line);
    mockIdentifierNode.getKind.mockReturnValue(SyntaxKind.Identifier);
    mockIdentifierNode.getParent.mockReturnValue({
      ...createMockNode(),
      getKind: jest.fn().mockReturnValue(SyntaxKind.TypeReference),
    } as unknown as Node);
    return mockIdentifierNode;
  }
});
