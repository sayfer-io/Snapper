/**
 * This file defines a detector that identifies broad permissions in the snap.manifest.json file.
 * It flags permissions that pose security risks by providing overly extensive access to sensitive
 * information or functions in MetaMask Snaps.
 */

import { readFileSync } from "fs";
import { SourceFile } from "ts-morph";
import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

// Define broad permissions and their associated messages
/**
 * @constant {Object} BROAD_PERMISSIONS - An object mapping permission names to warning messages
 * explaining the associated risk.
 */
const BROAD_PERMISSIONS: { [key: string]: { message: string } } = {
  snap_manageAccounts: {
    message:
      "Allows full account management, which can expose sensitive account actions.",
  },
  "endowment:network-access": {
    message: "Allows network access, which can be used to exfiltrate data.",
  },
  "endowment:transaction-insight": {
    message:
      "Allows insight into transactions, including their origin, which can lead to frontrunning attacks.",
  },
  snap_getBip32Entropy: {
    message:
      "Allows access to BIP32 entropy for generating cryptographic keys, which involves handling sensitive cryptographic keys.",
  },
  "endowment:rpc": {
    message:
      "Allows interaction with dapps via RPC, which can lead to interactions with potentially malicious dapps or unauthorized actions.",
  },
};

/**
 * Class to detect broad permissions in snap.manifest.json with specific guidance.
 * Extends the DetectorBase class to implement permission detection.
 */
class BroadPermissionsDetector extends DetectorBase {
  /**
   * The constructor initializes the detector with a name and risk rating.
   * @constructor
   */
  constructor() {
    super("BroadPermissions", RiskRating.High);
  }

  /**
   * Runs the detector on the given source file. It parses the snap.manifest.json file,
   * checks for any permissions listed in BROAD_PERMISSIONS, and adds findings for those
   * detected permissions.
   *
   * @param {SourceFile} file - The source file to analyze.
   * @returns {Finding[]} - A list of findings that flag any detected broad permissions.
   */
  public run(file: SourceFile): Finding[] {
    // Check if the file is named snap.manifest.json
    if (file.getBaseName() !== "snap.manifest.json") {
      return this.getFindings();
    }

    // Find the initialPermissions property node
    const jsonData = JSON.parse(readFileSync(file.getFilePath(), "utf-8"));
    const initialPermissions = jsonData.initialPermissions;

    // If initialPermissions exist, check for broad permissions
    if (initialPermissions) {
      for (const [permissionName, permissionValue] of Object.entries(
        initialPermissions
      )) {
        const permissionInfo = BROAD_PERMISSIONS[permissionName];
        if (permissionInfo) {
          // Add a finding for the broad permission detected
          this.addFinding(
            `Broad permission detected: ${permissionName}. ${permissionInfo.message}`,
            file.getFilePath(),
            1 // Line number is not available for snap.manifest.json files
          );
        }
      }
    }

    // Return the list of findings
    return this.getFindings();
  }
}

export { BroadPermissionsDetector };
