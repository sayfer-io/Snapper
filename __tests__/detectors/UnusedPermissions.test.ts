import { SourceFile } from "ts-morph";
import { UnusedPermissionsDetector } from "../../detectors/UnusedPermissions";

describe("UnusedPermissionsDetector", () => {
  let detector: UnusedPermissionsDetector;
  let mockSourceFile: jest.Mocked<SourceFile>;

  const MOCK_FILE_PATH = "snap.manifest.json" as any;
  const MOCK_OTHER_FILE_PATH = "otherfile.json" as any;
  const MOCK_UNUSED_PERMISSION = "endowment:ethereum-provider";
  const MOCK_USED_PERMISSION = "endowment:used-permission";
  const MOCK_UNUSED_API = "window.ethereum";
  const MOCK_USED_API = "window.usedApi";

  beforeEach(() => {
    detector = new UnusedPermissionsDetector();
    mockSourceFile = createMockSourceFile();
  });

  it("should detect unused permissions and not report used permissions", () => {
    const mockManifestContent = JSON.stringify({
      initialPermissions: {
        [MOCK_UNUSED_PERMISSION]: {},
        [MOCK_USED_PERMISSION]: {},
      },
    });

    mockSourceFile.getFilePath.mockReturnValue(MOCK_FILE_PATH);
    mockSourceFile.getFullText.mockReturnValue(mockManifestContent);

    jest
      .spyOn(detector as any, "isApiUsed")
      .mockImplementation((api) => api === MOCK_USED_API);

    const findings = detector.run(mockSourceFile);

    expect(findings).toHaveLength(1);
    expect(findings[0].description).toBe(
      `Permission '${MOCK_UNUSED_PERMISSION}' is declared but its corresponding API '${MOCK_UNUSED_API}' is not used.`
    );
    expect(findings[0].position.filePath).toBe(MOCK_FILE_PATH);

    const usedPermissionFinding = findings.find((finding) =>
      finding.description.includes(MOCK_USED_PERMISSION)
    );
    expect(usedPermissionFinding).toBeUndefined();
  });

  it("should not report used permissions", () => {
    const mockManifestContent = JSON.stringify({
      initialPermissions: {
        [MOCK_USED_PERMISSION]: {},
      },
    });

    mockSourceFile.getFilePath.mockReturnValue(MOCK_FILE_PATH);
    mockSourceFile.getFullText.mockReturnValue(mockManifestContent);

    jest.spyOn(detector as any, "isApiUsed").mockReturnValue(true);

    const findings = detector.run(mockSourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should not run on non-manifest files", () => {
    mockSourceFile.getFilePath.mockReturnValue(MOCK_OTHER_FILE_PATH);

    const findings = detector.run(mockSourceFile);

    expect(findings).toHaveLength(0);
  });

  it("should handle empty permissions", () => {
    const mockManifestContent = JSON.stringify({
      initialPermissions: {},
    });

    mockSourceFile.getFilePath.mockReturnValue(MOCK_FILE_PATH);
    mockSourceFile.getFullText.mockReturnValue(mockManifestContent);

    const findings = detector.run(mockSourceFile);

    expect(findings).toHaveLength(0);
  });

  function createMockSourceFile(): jest.Mocked<SourceFile> {
    return {
      getFilePath: jest.fn(),
      getFullText: jest.fn(),
      getDescendantsOfKind: jest.fn(),
    } as unknown as jest.Mocked<SourceFile>;
  }
});
