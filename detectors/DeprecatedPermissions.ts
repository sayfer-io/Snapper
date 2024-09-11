import * as path from "path";
import { SourceFile } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

interface Manifest {
  initialPermissions: {
    [key: string]: any;
  };
}

/**
 * Class to detect deprecated permissions in the snap.manifest.json file.
 */
class DeprecatedPermissionsDetector extends DetectorBase {
  // List of deprecated permissions.
  private static DEPRECATED_PERMISSIONS: string[] = [
    "endowment:long-running",
    // Add more deprecated permissions here
  ];

  constructor() {
    super("DeprecatedPermissions", RiskRating.High);
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

    for (const permission of DeprecatedPermissionsDetector.DEPRECATED_PERMISSIONS) {
      if (permissions[permission]) {
        this.addFinding(`Permission '${permission}' is deprecated.`, filePath);
      }
    }

    return this.getFindings();
  }
}

export { DeprecatedPermissionsDetector };
