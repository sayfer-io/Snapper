import { join } from "path";
import { existsSync, cpSync } from "fs";
import { installSnap } from "@metamask/snaps-jest";

import logger from "./logger";
import { createTempDir, detectPackageManager } from "./fileUtils";
import { runCommandDetached, runCommand } from "./commandUtils";

/**
 * Sleeps for the specified number of milliseconds.
 * @param {number} ms - The number of milliseconds to sleep.
 * @returns {Promise<void>}
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Verifies if the specified directory exists.
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
      command = `yarn install --silent`;
      break;
    case "npm":
      command = `npm install --silent --package-lock-only --legacy-peer-deps --prefix "${tempDir}"`;
      break;
    default:
      throw new Error(`Unsupported package manager: ${packageManager}`);
  }

  // Run the command to install dependencies
  const output1 = runCommand(command, tempDir);
  logger.debug(`Dependencies installed: ${output1}`);
}

/**
 * Prepares the Snap by setting up dependencies and building it.
 * @param {string} directory - The directory of the Snap.
 */
export async function prepareSnap(directory: string): Promise<void> {
  const snapFolderPath = join(__dirname, directory);

  // Verify if the directory exists
  verifyDirectoryExists(snapFolderPath);

  // Step 1: Copy the Snap directory to a temporary directory
  const tempDir = copySnapToTempDirectory(snapFolderPath);
  logger.debug(`Copied Snap directory to temporary directory: ${tempDir}`);

  // Step 2: Detect package manager
  const packageManager = detectPackageManager(tempDir);
  logger.debug(`Detected package manager: ${packageManager}`);

  // Step 3: Install dependencies in the temporary directory
  installDependencies(tempDir, packageManager);
  logger.debug("Dependencies installed.");

  // Step 4: Build the Snap in the temporary directory
  logger.debug("Building the Snap...");

  // Step 5: Identify the Snap directory
  // TODO: This is not always the case. Sometimes the snap folder is different.
  const snapDirectory = join(tempDir, "packages/snap");
  logger.debug(`Snap directory: ${snapDirectory}`);

  // Step 6: Build the Snap
  const output = runCommand(`npx mm-snap build`, snapDirectory);
  logger.debug(`Snap built: ${output}`);
}

/**
 * Starts the Snap server and connects to it.
 * @param {string} directory - The directory where the Snap server should be started.
 * @returns {Promise<any>} The Snap instance if connected successfully.
 */
export async function startAndConnectToSnap(directory: string): Promise<any> {
  // Generate a random high port number between 1024 and 65535
  const port = Math.floor(Math.random() * (65535 - 1024 + 1)) + 1024;

  // Step 1: Start the Snap server in the background
  startSnapServer(directory, port);

  // Wait a bit before connecting to the Snap server
  logger.debug("Waiting for the Snap server to start...");
  await sleep(5000); // Sleep for 5 seconds

  // Step 2: Connect to the Snap server
  logger.debug("Connecting to the Snap server...");

  const snapId: any = `local:http://localhost:${port}`;
  const { request, onHomePage, onTransaction } = await installSnap(snapId);
  logger.debug("Connected to the Snap server.");
  return { request, onHomePage, onTransaction, port };
}
