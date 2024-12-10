import * as path from "path";
import { existsSync, cpSync } from "fs";
import { installSnap } from "@metamask/snaps-simulation";

import logger from "./logger";
import { createTempDir } from "./fileUtils";
import { runCommandDetached, runCommand } from "./commandUtils";

/**
 * Sleeps for the specified number of milliseconds.
 *
 * This function provides a simple way to pause the execution of the code for a
 * given duration. It returns a Promise that resolves after the specified
 * number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to sleep.
 * @returns {Promise<void>}
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Verifies if the specified directory exists.
 *
 * This function checks if the given directory exists. If the directory does not
 * exist, it throws an Error with a message indicating the missing directory.
 *
 * @param {string} directory - The directory to check.
 * @throws {Error} If the directory does not exist.
 */
export function verifyDirectoryExists(directory: string): void {
  if (!existsSync(directory)) {
    throw new Error(`Directory does not exist: ${directory}`);
  }
}

/**
 * Copies the Snap directory to a temporary directory.
 *
 * This function creates a new temporary directory using the `createTempDir`
 * function, and then recursively copies the contents of the given Snap
 * directory to the temporary directory.
 *
 * @param {string} directory - The Snap directory to copy.
 * @returns {string} The path to the temporary directory.
 */
export function copySnapToTempDirectory(directory: string): string {
  const tempDir = createTempDir();
  cpSync(directory, tempDir, { recursive: true });
  return tempDir;
}

/**
 * Starts the Snap server in the background.
 *
 * This function uses the `runCommandDetached` utility to start the Snap server
 * in the background. The Snap server is started using the `npx mm-snap serve`
 * command, with the specified port number and `--verboseErrors` flag.
 *
 * @param {string} snapDirectory - The directory where the Snap server should be started.
 * @param {number} port - The port number to use for the Snap server.
 */
export function startSnapServer(snapDirectory: string, port: number): void {
  logger.debug("Starting the Snap server...");

  // Run the Snap server using the specified port
  runCommandDetached(
    `npx`,
    [`mm-snap`, `serve`, `--port`, `${port}`, `--verboseErrors`],
    snapDirectory,
    (output) => {
      logger.debug("Command Output:", output);
    }
  );
}

/**
 * Installs dependencies in the temporary directory.
 *
 * This function installs the project dependencies in the temporary directory
 * using the specified package manager (pnpm, yarn, or npm). It uses the
 * `runCommand` utility to execute the appropriate command for each package
 * manager.
 *
 * @param {string} tempDir - The path to the temporary directory.
 * @param {string} packageManager - The package manager to use.
 */
export function installDependencies(
  tempDir: string,
  packageManager: string
): void {
  let command: string;

  switch (packageManager) {
    case "pnpm":
      command = `pnpm install --silent --lockfile-only --dir "${tempDir}"`;
      break;
    case "yarn":
      command = `yarn install --silent --cwd "${tempDir}"`;
      break;
    case "npm":
      command = `npm install --silent --package-lock-only --legacy-peer-deps --prefix "${tempDir}"`;
      break;
    default:
      throw new Error(`Unsupported package manager: ${packageManager}`);
  }

  // Run the command to install dependencies
  runCommand(command, tempDir);
}

/**
 * Prepares the Snap by setting up dependencies and building it.
 *
 * This function runs the `npx mm-snap build` command in the given project
 * folder path to build the Snap.
 *
 * @param {string} projectFolderPath - The directory of the Snap.
 */
export async function buildSnap(projectFolderPath: string): Promise<void> {
  runCommand(`npx mm-snap build`, projectFolderPath);
}

/**
 * Checks if the build directory exists within the specified project folder path.
 *
 * @param {string} projectFolderPath - The path to the project folder.
 * @returns {boolean} - Returns true if the build directory exists, otherwise false.
 */
export function snapBuildExists(projectFolderPath: string): boolean {
  const buildPath = path.join(projectFolderPath, "build");
  return existsSync(buildPath);
}

/**
 * Connects to the Snap server.
 *
 * This function connects to the Snap server running at the specified port and
 * returns the `request`, `onHomePage`, and `onTransaction` functions from the
 * `installSnap` function.
 *
 * @param {number} port - The port number of the Snap server.
 * @returns {Promise<any>} An object containing the Snap server functions.
 */
export async function connectSnapServer(port: number): Promise<any> {
  logger.debug("Connecting to the Snap server...");

  const snapId: any = `local:http://localhost:${port}`;
  const { request, onHomePage, onTransaction } = await installSnap(snapId);
  logger.debug("Connected to the Snap server.");
  return { request, onHomePage, onTransaction };
}

/**
 * Starts the Snap server and connects to it.
 *
 * This function first starts the Snap server in the background using the
 * `startSnapServer` function, then waits for a few seconds before attempting
 * to connect to the Snap server using the `connectSnapServer` function. It
 * returns an object containing the Snap server functions and the port number.
 *
 * @param {string} directory - The directory where the Snap server should be started.
 * @returns {Promise<any>} The Snap instance if connected successfully.
 */
export async function startAndConnectToSnap(directory: string): Promise<any> {
  // Generate a random high port number between 1024 and 65535
  const port = 3333;

  // Step 1: Start the Snap server in the background
  startSnapServer(directory, port);

  // Wait a bit before connecting to the Snap server
  logger.debug("Waiting for the Snap server to start...");
  await sleep(5000); // Sleep for 5 seconds

  // Step 2: Connect to the Snap server
  return { ...(await connectSnapServer(port)), port };
}
