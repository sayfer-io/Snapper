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
const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Verifies if the specified directory exists.
 * @param {string} directory - The directory to check.
 * @throws {Error} If the directory does not exist.
 */
const verifyDirectoryExists = (directory: string): void => {
  if (!existsSync(directory)) {
    throw new Error(`Directory does not exist: ${directory}`);
  }
};

/**
 * Copies the Snap directory to a temporary directory.
 * @param {string} directory - The Snap directory to copy.
 * @returns {string} The path to the temporary directory.
 */
const copySnapToTempDirectory = (directory: string): string => {
  const tempDir = createTempDir();
  cpSync(directory, tempDir, { recursive: true });
  return tempDir;
};

/**
 * Starts the Snap server in the background.
 * @param {string} directory - The directory where the Snap server should be started.
 * @param {number} port - The port number to use for the Snap server.
 */
const startSnapServer = (snapDirectory: string, port: number): void => {
  logger.debug("Starting the Snap server...");

  // Run the Snap server using the temporary configuration file
  runCommandDetached(
    `npx`,
    [`mm-snap`, `serve`, `--port`, `${port}`, `--verboseErrors`],
    snapDirectory,
    (output) => {
      logger.debug("Command Output:", output);
    }
  );
};

/**
 * Installs dependencies in the temporary directory.
 * @param {string} tempDir - The path to the temporary directory.
 * @param {string} packageManager - The package manager to use.
 */
const installDependencies = (tempDir: string, packageManager: string): void => {
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

  const output1 = runCommand(command, tempDir);
  logger.debug(`Dependencies installed: ${output1}`);
  const output2 = runCommand(command, tempDir);
  logger.debug(`Dependencies installed: ${output2}`);
};

/**
 * Connects to the Snap server with retries.
 * @param {number} port - The port number to use for connecting to the Snap server.
 * @param {number} maxRetries - The maximum number of retries.
 * @param {number} retryDelay - The delay between retries in milliseconds.
 * @returns {Promise<any>} The Snap instance if connected successfully.
 * @throws {Error} If unable to connect to the Snap server after the maximum number of retries.
 */
const connectToSnapServer = async (
  port: number,
  maxRetries: number,
  retryDelay: number
): Promise<any> => {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const snapId: any = `local:http://localhost:${port}`;
      const { request, onHomePage, onTransaction } = await installSnap(snapId);
      logger.debug("Connected to the Snap server.");
      return { request, onHomePage, onTransaction };
    } catch (error) {
      retries++;
      if (retries >= maxRetries) {
        throw new Error(
          `Failed to connect to the Snap server after ${maxRetries} attempts.`
        );
      }

      logger.debug(
        "Error connecting to the Snap server:",
        error instanceof Error ? error.message : error
      );
      logger.debug(
        `Retrying to connect to the Snap server... (${retries}/${maxRetries})`
      );
      await sleep(retryDelay);
    }
  }
};

/**
 * Runs the Snap server and connects to it.
 * @param {string} directory - The directory where the Snap server should be started.
 */
const runSnapServerAndConnect = async (directory: string) => {
  // Generate a random high port number between 1024 and 65535
  const port = Math.floor(Math.random() * (65535 - 1024 + 1)) + 1024;
  const maxRetries = 5; // Maximum number of retries
  const retryDelay = 2000; // Delay between retries in milliseconds

  try {
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

    // Step 4: Build the Snap in the temporary directory
    logger.debug("Building the Snap...");
    const snapDirectory = join(tempDir, "packages/snap");
    logger.debug(`Snap directory: ${snapDirectory}`);
    try {
      const output = runCommand(`npx mm-snap build`, snapDirectory);
      logger.debug(`Snap built: ${output}`);
    } catch (buildError) {
      console.error("Error building the Snap:", buildError);
      return;
    }

    // Step 5: Start the Snap server in the background
    startSnapServer(snapDirectory, port);

    // Wait a bit before connecting to the Snap server
    logger.debug("Waiting for the Snap server to start...");
    await sleep(5000); // Sleep for 5 seconds

    // // Step 6: Concurrently connect to the Snap server with retries
    logger.debug("Connecting to the Snap server...");
    const snapInstance = await connectToSnapServer(
      port,
      maxRetries,
      retryDelay
    );

    // // Step 7: Run the test function with the Snap instance
    // await runTestFunction(snapInstance);

    // // Simulate some work being done with the Snap
    // logger.debug("Simulating work with the Snap...");
    // await sleep(5000); // Sleep for 5 seconds
    // logger.debug("Finished simulating work with the Snap.");

    // Note: Killing the Snap server process is not handled here since it's detached
  } catch (error) {
    console.error("Error running Snap server and connecting:", error);
  }
};

/**
 * Runs the test function with the Snap instance.
 * @param {any} snapInstance - The Snap instance to use for the test function.
 */
const runTestFunction = async (snapInstance: any) => {
  const { request, onHomePage, onTransaction } = snapInstance;
  const response = await request({
    origin: "http://localhost:8080",
    method: "hello",
    params: [],
  });
  logger.debug(response);
  const ui = await onHomePage();
  let interface_ = ui.getInterface();
  logger.debug(interface_);
};

// Example usage
runSnapServerAndConnect("../testcases/Uncategorized/wallet-guard-snap/");
