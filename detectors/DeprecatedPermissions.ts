import { SourceFile } from "ts-morph";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

interface Manifest {
  initialPermissions: {
    [key: string]: any; // Represents the permissions in the manifest, can be any type.
  };
}

/**
 * Class to detect deprecated permissions in the snap.manifest.json file.
 * This detector checks for deprecated permissions that should not be used in the current implementation
 * of the Snap. It raises warnings when deprecated permissions are found.
 */
class DeprecatedPermissionsDetector extends DetectorBase {
  // List of deprecated permissions to check against.
  private static DEPRECATED_PERMISSIONS: string[] = [
    "endowment:long-running", // Example of a deprecated permission.
    // Add more deprecated permissions here as needed.
  ];

  /**
   * Constructor for the DeprecatedPermissionsDetector.
   * Initializes the detector with a name and assigns it a high-risk rating, as using deprecated permissions
   * can lead to security vulnerabilities or unstable behavior in the Snap.
   */
  constructor() {
    super("DeprecatedPermissions", RiskRating.High);
  }

  public allowedFileRegexes = [/snap\.manifest\.json$/];

  /**
   * Reads the snap.manifest.json file and returns the parsed content as a Manifest object.
   * It retrieves the full text of the file and parses it as JSON.
   *
   * @param {SourceFile} file - The source file representing snap.manifest.json to read.
   * @returns {Manifest} - The parsed manifest content.
   */
  private readManifest(file: SourceFile): Manifest {
    const manifestContent = file.getFullText(); // Get the entire content of the file.
    return JSON.parse(manifestContent); // Parse the content as JSON and return it.
  }

  /**
   * Runs the detector on the given source file to identify any deprecated permissions.
   * It checks if the permissions in the manifest match any deprecated ones and records findings accordingly.
   *
   * @param {SourceFile} sourceFile - The source file to analyze for deprecated permissions.
   * @returns {Finding[]} - Array of findings with details about the detected deprecated permissions.
   */
  public run(sourceFile: SourceFile): Finding[] {
    const filePath = sourceFile.getFilePath(); // Get the file path of the source file.

    const manifest = this.readManifest(sourceFile); // Read and parse the manifest.
    const permissions = manifest.initialPermissions; // Get the permissions from the manifest.

    // Loop through each deprecated permission and check if it exists in the manifest.
    for (const permission of DeprecatedPermissionsDetector.DEPRECATED_PERMISSIONS) {
      if (permissions[permission]) {
        this.addFinding(`Permission '${permission}' is deprecated.`, filePath); // Record a finding for deprecated permission.
      }
    }

    return this.getFindings(); // Return the array of findings.
  }
}

export { DeprecatedPermissionsDetector };
