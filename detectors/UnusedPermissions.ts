import * as path from "path";
import { SourceFile, SyntaxKind } from "ts-morph";

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
  // Map of permissions and their corresponding APIs.
  private static readonly PERMISSION_API_MAP: { [key: string]: string } = {
    "endowment:ethereum-provider": "window.ethereum",
  };

  constructor() {
    super("UnusedPermissions", RiskRating.Medium);
  }

  /**
   * Reads the snap.manifest.json file and returns the parsed content.
   *
   * This method retrieves the full text of the source file and parses it
   * as a JSON object to access the manifest details.
   *
   * @param {SourceFile} file - The source file representing snap.manifest.json.
   * @returns {Manifest} - The parsed manifest content, including permissions.
   */
  private readManifest(file: SourceFile): Manifest {
    const manifestContent = file.getFullText();
    return JSON.parse(manifestContent); // Parse the JSON content to an object.
  }

  /**
   * Runs the detector on the given source file to identify unused permissions.
   *
   * This method checks if the current source file is the manifest file and,
   * if so, verifies which permissions are declared but not utilized in the code.
   *
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - An array of findings detailing unused permissions.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const findings: Finding[] = [];
    const filePath = sourceFile.getFilePath();

    // Ensure the file is snap.manifest.json before proceeding.
    if (path.basename(filePath) !== "snap.manifest.json") {
      return findings;
    }

    const manifest = this.readManifest(sourceFile);
    const permissions = manifest.initialPermissions;

    // Check each permission against the defined API map.
    for (const [permission, api] of Object.entries(
      UnusedPermissionsDetector.PERMISSION_API_MAP
    )) {
      // If the permission is declared but the API is not used, report it.
      if (permissions[permission] && !this.isApiUsed(sourceFile, api)) {
        this.addFinding(
          `Permission '${permission}' is declared but its corresponding API '${api}' is not used.`,
          filePath
        );
      }
    }

    // Return all findings collected during the analysis.
    return this.getFindings();
  }

  /**
   * Checks if the specified API is used in the source file.
   *
   * This method inspects the identifiers in the source file to determine
   * if the specified API is referenced anywhere in the code.
   *
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @param {string} api - The API to check for usage.
   * @returns {boolean} - True if the API is used; false otherwise.
   */
  private isApiUsed(sourceFile: SourceFile, api: string): boolean {
    const identifiers = sourceFile.getDescendantsOfKind(SyntaxKind.Identifier);
    // Check if any identifier matches the API name.
    return identifiers.some((identifier) => identifier.getText() === api);
  }
}

export { UnusedPermissionsDetector };
