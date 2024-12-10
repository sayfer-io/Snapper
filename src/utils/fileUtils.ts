import fs from "fs";
import tmp from "tmp";
import path from "path";
import { readdir } from "fs/promises";

import logger from "./logger";

/**
 * Creates a temporary directory for the package audit.
 * Automatically cleans up the directory when done.
 *
 * This function creates a temporary directory using the `tmp` library.
 * The `unsafeCleanup` option is set to `true` to ensure that the directory
 * and its contents are automatically removed when the process exits.
 *
 * @returns {string} - The path to the created temporary directory.
 */
export function createTempDir(): string {
  const tempDir = tmp.dirSync({ unsafeCleanup: true });
  logger.debug(`A temporary folder was created at ${tempDir.name}`);
  return tempDir.name;
}

/**
 * Finds all `tsconfig.json` files in the given project path.
 *
 * This function recursively searches the given project directory and its subdirectories
 * for any `tsconfig.json` files. It returns an array of the full paths to all found
 * `tsconfig.json` files.
 *
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
 *
 * This is a helper function used by `findTsConfig`. It reads the contents of the
 * given directory, checks if any of the entries are `tsconfig.json` files, and
 * if not, recursively searches the subdirectories.
 *
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
 *
 * This function generates a file name that includes a timestamp in the format
 * `HHMMDDMMYYYYresult.json`. The timestamp is generated using the current date
 * and time. The base file name and extension can be customized using the
 * optional parameters.
 *
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
 *
 * This function reads the `package.json` file in the given working directory
 * and extracts the `packageManager` field. It supports the following package
 * managers: Yarn, npm, and pnpm.
 *
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
 *
 * This function detects the package manager used in the project by checking the
 * `package.json` file and the presence of lock files (yarn.lock, pnpm-lock.yaml,
 * package-lock.json). It supports Yarn, npm, and pnpm.
 *
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
  for (const version of Object.values({
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
 *
 * This function checks for the existence of the various lock files in the given
 * directory and deletes them if found. It logs the deletion of each file using
 * the `logger` module.
 *
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
