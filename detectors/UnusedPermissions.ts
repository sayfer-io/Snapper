import * as path from "path";
import { SourceFile, SyntaxKind } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

interface Manifest {
  initialPermissions: {
    [key: string]: any;
  };
}

/**
 * Class to detect unused permissions in the snap.manifest.json file.
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
   * @param {SourceFile} file - The source file representing snap.manifest.json.
   * @returns {Manifest} - The parsed manifest content.
   */
  private readManifest(file: SourceFile): Manifest {
    const manifestContent = file.getFullText();
    return JSON.parse(manifestContent);
  }

  /**
   * Runs the detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Finding[]} - Array of findings with details about the detected issues.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const findings: Finding[] = [];
    const filePath = sourceFile.getFilePath();

    if (path.basename(filePath) !== "snap.manifest.json") {
      return findings;
    }

    const manifest = this.readManifest(sourceFile);
    const permissions = manifest.initialPermissions;

    for (const [permission, api] of Object.entries(
      UnusedPermissionsDetector.PERMISSION_API_MAP
    )) {
      if (permissions[permission] && !this.isApiUsed(sourceFile, api)) {
        this.addFinding(
          `Permission '${permission}' is declared but its corresponding API '${api}' is not used.`,
          filePath
        );
      }
    }

    return this.getFindings();
  }

  /**
   * Checks if the specified API is used in the source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @param {string} api - The API to check for usage.
   * @returns {boolean} - True if the API is used, false otherwise.
   */
  private isApiUsed(sourceFile: SourceFile, api: string): boolean {
    const identifiers = sourceFile.getDescendantsOfKind(SyntaxKind.Identifier);
    return identifiers.some((identifier) => identifier.getText() === api);
  }
}

export { UnusedPermissionsDetector };
