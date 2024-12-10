import { SourceFile } from "ts-morph";
import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

interface Manifest {
  initialPermissions: {
    [key: string]: any; // Using 'any' for flexibility in permission values.
  };
}

/**
 * Class to detect unused permissions in the snap.manifest.json file.
 * This detector identifies permissions declared in the manifest that are not utilized
 * in the associated code, helping to streamline permissions and enhance security.
 */
class UnusedPermissionsDetector extends DetectorBase {
  public allowedFileRegexes: RegExp[] = [/snap\.manifest\.json$/];

  // Map of permissions and their corresponding APIs.
  private static readonly PERMISSION_API_MAP: { [key: string]: string } = {
    "endowment:ethereum-provider": "window.ethereum",
  };

  constructor() {
    super("UnusedPermissions", RiskRating.Medium);
  }

  /**
   * Reads and parses the manifest file.
   * @param {SourceFile} file - The source file to read.
   * @returns {Manifest} - The parsed manifest object.
   */
  private readManifest(file: SourceFile): Manifest | null {
    const manifestContent = file.getFullText();
    try {
      return JSON.parse(manifestContent); // Parse the JSON content to an object.
    } catch (error) {
      return null; // Return null if the content is not valid JSON.
    }
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} file - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(file: SourceFile): Finding[] {
    const filePath = file.getFilePath();

    // Ensure the file is a manifest file
    if (!this.allowedFileRegexes.some((regex) => regex.test(filePath))) {
      return [];
    }

    const manifest = this.readManifest(file);
    if (!manifest) {
      return [];
    }

    const permissions = manifest.initialPermissions;

    // Return early if no permissions are defined or the object is empty
    if (!permissions || Object.keys(permissions).length === 0) {
      return [];
    }

    for (const [permission, api] of Object.entries(
      UnusedPermissionsDetector.PERMISSION_API_MAP
    )) {
      if (permissions[permission] && !this.isApiUsed(file, api)) {
        this.addFinding(
          `Permission '${permission}' is declared but its corresponding API '${api}' is not used.`,
          filePath,
          1 // Line number is not available for manifest files
        );
      }
    }

    return this.getFindings();
  }

  /**
   * Checks if the specified API is used in the source file.
   *
   * This method inspects the identifiers in the source file to determine
   * if the specified API is used.
   *
   * @param {SourceFile} sourceFile - The source file to inspect.
   * @param {string} api - The API to check for usage.
   * @returns {boolean} - True if the API is used, false otherwise.
   */
  private isApiUsed(sourceFile: SourceFile, api: string): boolean {
    return sourceFile.getFullText().includes(api);
  }
}

export { UnusedPermissionsDetector };
