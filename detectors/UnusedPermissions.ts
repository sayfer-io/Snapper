import * as path from "path";
import { SourceFile, SyntaxKind, Project } from "ts-morph";
import { Finding } from "../types";
import { RiskRating } from "../structures";

interface Manifest {
  initialPermissions: {
    [key: string]: any;
  };
}

/**
 * Maps permissions to their corresponding APIs.
 */
const permissionApiMap: { [key: string]: string } = {
  "endowment:ethereum-provider": "window.ethereum",
  // Add more permissions and their corresponding APIs here
};

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
 * Checks if the specified API is used in the project files, excluding comments.
 * @param {SourceFile[]} sourceFiles - The source files to analyze.
 * @param {string} api - The API to check for usage.
 * @returns {boolean} - True if the API is used, false otherwise.
 */
function isApiUsed(sourceFiles: SourceFile[], api: string): boolean {
  for (const file of sourceFiles) {
    const nodes = file.getDescendantsOfKind(SyntaxKind.Identifier);
    for (const node of nodes) {
      if (node.getText() === api) {
        return true;
      }
    }
  }
  return false;
}
/**
 * Creates a project using the base directory of the manifest file.
 * @param {string} manifestPath - The path to the manifest file.
 * @returns {Project} - The created project.
 */
function createProjectFromManifest(manifestPath: string): Project {
  const baseDir = path.dirname(manifestPath);
  return new Project({
    tsConfigFilePath: path.join(baseDir, "tsconfig.json"),
  });
}

/**
 * Detects unused permissions in the snap.manifest.json file.
 * @param {SourceFile} file - The source file representing snap.manifest.json.
 * @returns {Finding[]} - Array of findings with details about the detected issues.
 */
export function detectUnusedPermissions(file: SourceFile): Finding[] {
  const findings: Finding[] = [];
  const filePath = file.getFilePath();

  if (path.basename(filePath) !== "snap.manifest.json") {
    return findings;
  }

  const manifest = readManifest(file);
  const permissions = manifest.initialPermissions;

  const project = createProjectFromManifest(filePath);
  const sourceFiles = project.getSourceFiles();

  for (const [permission, api] of Object.entries(permissionApiMap)) {
    if (permissions[permission] && !isApiUsed(sourceFiles, api)) {
      findings.push({
        type: "UnusedPermission",
        description: `Permission '${permission}' is requested but the corresponding API '${api}' is not used.`,
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
