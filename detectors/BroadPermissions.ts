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
      "Allows access to BIP32 entropy for generating cryptographic keys, which involves handling cryptographic keys.",
  },
  "endowment:rpc": {
    message:
      "Allows interaction with dapps via RPC, which can lead to interactions with potentially malicious dapps or unauthorized actions.",
  },
};

const CONSIDER_AS_TOO_BROAD = 2;

/**
 * Class to detect broad permissions in snap.manifest.json with specific guidance.
 * Extends the DetectorBase class to implement permission detection.
 */
class BroadPermissionsDetector extends DetectorBase {
  public allowedFileRegexes = [/snap\.manifest\.json$/];

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
    const jsonData = JSON.parse(readFileSync(file.getFilePath(), "utf-8"));
    const initialPermissions = jsonData.initialPermissions;
    const permissionsFound: string[] = [];

    if (initialPermissions) {
      for (const permissionName of Object.keys(initialPermissions)) {
        if (BROAD_PERMISSIONS[permissionName]) {
          permissionsFound.push(permissionName);
        }
      }
    }

    if (permissionsFound.length >= CONSIDER_AS_TOO_BROAD) {
      this.addFinding(
        `Broad permissions detected: ${permissionsFound.join(", ")}`,
        file.getFilePath()
      );
    }

    return this.getFindings();
  }
}

export { BroadPermissionsDetector };
