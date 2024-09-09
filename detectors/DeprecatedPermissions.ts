import * as path from "path";
import { SourceFile, Project } from "ts-morph";
import { Finding } from "../types";
import { RiskRating } from "../structures";

interface Manifest {
  initialPermissions: {
    [key: string]: any;
  };
}

/**
 * List of deprecated permissions.
 */
const deprecatedPermissions: string[] = [
  "endowment:long-running",
  // Add more deprecated permissions here
];

/**
 * Reads the snap.manifest.json file and returns the parsed content.
 * @param {SourceFile} file - The source file representing snap.manifest.json.
 * @returns {Manifest} - The parsed manifest content.
 */
function readManifest(file: SourceFile): Manifest {
  const manifestContent = file.getFullText();
  return JSON.parse(manifestContent);
}

/**
 * Detects deprecated permissions in the snap.manifest.json file.
 * @param {SourceFile} file - The source file representing snap.manifest.json.
 * @returns {Finding[]} - Array of findings with details about the detected issues.
 */
export function detectDeprecatedPermissions(file: SourceFile): Finding[] {
  const findings: Finding[] = [];
  const filePath = file.getFilePath();

  if (path.basename(filePath) !== "snap.manifest.json") {
    return findings;
  }

  const manifest = readManifest(file);
  const permissions = manifest.initialPermissions;

  for (const permission of deprecatedPermissions) {
    if (permissions[permission]) {
      findings.push({
        type: "DeprecatedPermission",
        description: `Permission '${permission}' is deprecated.`,
        position: {
          filePath,
          lineNum: 1, // Not important for this detector
        },
        riskRating: RiskRating.High,
      });
    }
  }

  return findings;
}
