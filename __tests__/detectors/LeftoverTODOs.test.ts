import {
  SourceFile,
  CommentRange,
  Node,
  SyntaxKind,
  ForEachDescendantTraversalControl,
} from "ts-morph";
import { LeftoverTODOsDetector } from "../../detectors/LeftoverTODOs";

describe("LeftoverTODOsDetector", () => {
  let detector: LeftoverTODOsDetector;
  let mockSourceFile: jest.Mocked<SourceFile>;
  let mockNode: jest.Mocked<Node>;

  beforeEach(() => {
    detector = new LeftoverTODOsDetector();
    mockSourceFile = createMockSourceFile();
    mockNode = createMockNode();
  });

  it("should retrieve all comment ranges from the source file", () => {
    const leadingComment = createMockCommentRange(
      0,
      10,
      "// TODO: leading comment"
    );
    const trailingComment = createMockCommentRange(
      20,
      30,
      "// TODO: trailing comment"
    );

    mockNode.getLeadingCommentRanges.mockReturnValue([leadingComment]);
    mockNode.getTrailingCommentRanges.mockReturnValue([trailingComment]);

    mockSourceFile.forEachDescendant.mockImplementation(
      (
        callback: (
          node: Node,
          traversal: ForEachDescendantTraversalControl
        ) => void
      ) => {
        const traversalControl = createMockTraversalControl();
        callback(mockNode, traversalControl);
      }
    );

    // Access the private method getCommentRanges using a type assertion
    const commentRanges = (detector as any).getCommentRanges(mockSourceFile);

    expect(commentRanges).toEqual([leadingComment, trailingComment]);
    expect(mockSourceFile.forEachDescendant).toHaveBeenCalled();
    expect(mockNode.getLeadingCommentRanges).toHaveBeenCalled();
    expect(mockNode.getTrailingCommentRanges).toHaveBeenCalled();
  });

  function createMockSourceFile(): jest.Mocked<SourceFile> {
    return {
      forEachDescendant: jest.fn(),
    } as unknown as jest.Mocked<SourceFile>;
  }

  function createMockNode(): jest.Mocked<Node> {
    return {
      getLeadingCommentRanges: jest.fn(),
      getTrailingCommentRanges: jest.fn(),
    } as unknown as jest.Mocked<Node>;
  }

  function createMockCommentRange(
    pos: number,
    end: number,
    text: string
  ): CommentRange {
    return {
      getKind: () => SyntaxKind.SingleLineCommentTrivia,
      getPos: () => pos,
      getEnd: () => end,
      getText: () => text,
      getSourceFile: () => mockSourceFile,
    } as unknown as CommentRange;
  }

  function createMockTraversalControl(): ForEachDescendantTraversalControl {
    return {
      stop: jest.fn(),
      skip: jest.fn(),
      up: jest.fn(),
    };
  }
});
