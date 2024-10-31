import fs from "fs";
import tmp from "tmp";
import path from "path";
import { readdir } from "fs/promises";

import logger from "./logger";

/**
 * Creates a temporary directory for the package audit.
 * Automatically cleans up the directory when done.
 * @returns {string} - The path to the created temporary directory.
 */
export function createTempDir(): string {
  const tempDir = tmp.dirSync({ unsafeCleanup: true });
  logger.debug(`A temporary folder was created at ${tempDir.name}`);
  return tempDir.name;
}

/**
 * Finds all `tsconfig.json` files in the given project path.
 * @param {string} projectPath - The path to the project directory.
 * @returns {Promise<string[]>} - A promise that resolves to an array of paths to `tsconfig.json` files.
 */
export async function findTsConfig(projectPath: string): Promise<string[]> {
  const tsConfigPaths: string[] = [];
  await findTsConfigRecursive(projectPath, tsConfigPaths);
  return tsConfigPaths;
}

/**
 * Recursively searches for `tsconfig.json` files in the given directory.
 * @param {string} currentPath - The current directory path to search in.
 * @param {string[]} tsConfigPaths - The array to store found `tsconfig.json` file paths.
 * @returns {Promise<void>} - A promise that resolves when the search is complete.
 */
async function findTsConfigRecursive(
  currentPath: string,
  tsConfigPaths: string[]
): Promise<void> {
  const entries = await readdir(currentPath, {
    withFileTypes: true,
  });

  let foundTsConfig = false;
  for (const entry of entries) {
    const fullPath = path.join(currentPath, entry.name);
    if (entry.isFile() && entry.name === "tsconfig.json") {
      tsConfigPaths.push(fullPath);
      foundTsConfig = true;
      break;
    }
  }

  if (!foundTsConfig) {
    for (const entry of entries) {
      if (entry.isDirectory()) {
        await findTsConfigRecursive(
          path.join(currentPath, entry.name),
          tsConfigPaths
        );
      }
    }
  }
}

/**
 * Generates a timestamp-based file name.
 * @param {string} [filename='result'] - The base name for the file.
 * @param {string} [extension='json'] - The file extension.
 * @returns {string} - The generated file name.
 */
export function generateTimestampFileName(
  filename: string = "result",
  extension: string = "json"
): string {
  const now = new Date();
  const pad = (num: number) => num.toString().padStart(2, "0");
  const timestamp = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(
    now.getSeconds()
  )}${pad(now.getDate())}${pad(now.getMonth() + 1)}${now.getFullYear()}`;
  return `${filename}-${timestamp}.${extension}`;
}

/**
 * Detects the package manager version specified in package.json.
 * It checks for supported package managers: Yarn, npm, and pnpm.
 * @param {string} workingDir - The directory where package.json is located.
 * @returns {string} - The package manager version string (e.g., "yarn@3.2.1" or "npm@8.0.0").
 * @throws Will throw an error if the package manager format is invalid or unsupported.
 */
export function detectPackageManagerVersion(workingDir: string): string {
  const packageJsonPath = path.join(workingDir, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  const packageManagerVersion = packageJson.packageManager || "";
  logger.debug(
    `PackageManager version in package.json: ${packageManagerVersion}`
  );

  if (/^(yarn|npm|pnpm)@\d+(\.\d+)*$/.test(packageManagerVersion)) {
    return packageManagerVersion;
  }

  return "";
}

/**
 * Detects the package manager used in the project.
 * It checks for Yarn, npm, and pnpm based on the package.json and lock files.
 * @param {string} workingDir - The directory where package.json is located.
 * @returns {string} - The detected package manager ("yarn", "npm", or "pnpm").
 * @throws Will throw an error if no package.json is found in the working directory.
 */
export function detectPackageManager(workingDir: string): string {
  const packageJsonPath = path.resolve(workingDir, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`No package.json found in ${workingDir}`);
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  if (packageJson.packageManager?.startsWith("yarn")) return "yarn";
  if (packageJson.packageManager?.startsWith("pnpm")) return "pnpm";

  // Check for "workspace:*" in dependencies
  for (const [dep, version] of Object.entries({
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies,
    ...packageJson.optionalDependencies,
  })) {
    if (version === "workspace:*" || version === "workspace:^") {
      return "yarn";
    }
  }

  if (fs.existsSync(path.resolve(workingDir, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.resolve(workingDir, "pnpm-lock.yaml"))) return "pnpm";

  return "npm";
}

/**
 * Deletes all package manager lock files (yarn.lock, pnpm-lock.yaml, package-lock.json)
 * from the given directory.
 * @param {string} mainDir - The main directory where lock files will be deleted.
 * @returns {string[]} - An array of the names of the deleted lock files.
 */
export function deleteLockFiles(mainDir: string): string[] {
  const lockFiles = ["yarn.lock", "pnpm-lock.yaml", "package-lock.json"];
  const deletedFiles: string[] = [];

  lockFiles.forEach((lockFile) => {
    const lockFilePath = path.resolve(mainDir, lockFile);

    if (fs.existsSync(lockFilePath)) {
      try {
        fs.unlinkSync(lockFilePath);
        logger.debug(`Deleted ${lockFile} from ${mainDir}`);
        deletedFiles.push(lockFile);
      } catch (error) {
        logger.error(`Failed to delete ${lockFile}:`, error);
      }
    }
  });

  return deletedFiles;
}
