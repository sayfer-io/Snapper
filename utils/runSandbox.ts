import { join } from "path";
import { installSnap } from "@metamask/snaps-jest";
import { runCommandDetached, runCommand } from "./commandUtils";
import { existsSync, mkdtempSync, cpSync } from "fs";
import { tmpdir } from "os";

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
  const tempDir = mkdtempSync(join(tmpdir(), "snap-"));
  cpSync(directory, tempDir, { recursive: true });
  return tempDir;
};

/**
 * Installs dependencies in the temporary directory.
 * @param {string} directory - The directory where dependencies should be installed.
 */
const installDependencies = (directory: string): void => {
  console.log("Installing dependencies...");
  runCommand(`npm install`, directory);
};

/**
 * Starts the Snap server in the background.
 * @param {string} directory - The directory where the Snap server should be started.
 * @param {number} port - The port number to use for the Snap server.
 */
const startSnapServer = (directory: string, port: number): void => {
  console.log("Starting the Snap server...");

  const configFile = join(directory, "snap.config.js");

  // Run the Snap server using the temporary configuration file
  runCommandDetached(
    `npx mm-snap serve --port ${port} --config ${configFile}`,
    directory
  );
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
      const snapInstance = await installSnap(snapId);
      // Add any additional logic for connecting to the Snap server here
      return snapInstance;
    } catch (error) {
      retries++;
      if (retries >= maxRetries) {
        throw new Error(
          "Failed to connect to the Snap server after multiple attempts."
        );
      }
      console.log("Error connecting to the Snap server:", error);
      console.log(
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
  const port = 3333; // Define the port number as a local variable
  const maxRetries = 5; // Maximum number of retries
  const retryDelay = 2000; // Delay between retries in milliseconds

  try {
    const snapFolderPath = join(__dirname, directory);

    // Verify if the directory exists
    verifyDirectoryExists(snapFolderPath);

    // Step 1: Copy the Snap directory to a temporary directory
    const tempDir = copySnapToTempDirectory(snapFolderPath);
    console.log(`Copied Snap directory to temporary directory: ${tempDir}`);

    // Step 2: Install dependencies in the temporary directory
    installDependencies(tempDir);

    // Step 3: Build the Snap in the temporary directory
    console.log("Building the Snap...");
    try {
      runCommand(`npx mm-snap build`, tempDir);
    } catch (buildError) {
      console.error("Error building the Snap:", buildError);
      return;
    }

    // Verify if the output file exists
    const outputFilePath = join(tempDir, "dist", "index.js");
    if (!existsSync(outputFilePath)) {
      console.error(`Error: Output file ${outputFilePath} does not exist.`);
      return;
    }

    // Step 4: Start the Snap server in the background
    startSnapServer(tempDir, port);

    // Wait a bit before connecting to the Snap server
    console.log("Waiting for the Snap server to start...");
    await sleep(5000); // Sleep for 5 seconds

    // Step 5: Concurrently connect to the Snap server with retries
    console.log("Connecting to the Snap server...");
    const snapInstance = await connectToSnapServer(
      port,
      maxRetries,
      retryDelay
    );

    // Step 6: Run the test function with the Snap instance
    await runTestFunction(snapInstance);

    // Simulate some work being done with the Snap
    console.log("Simulating work with the Snap...");
    await sleep(5000); // Sleep for 5 seconds
    console.log("Finished simulating work with the Snap.");

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
  console.log(response);
  const ui = await onHomePage();
  let interface_ = ui.getInterface();
  console.log(interface_);
};

// Example usage
runSnapServerAndConnect(
  "../testcases/Weak Cryptography/bob-snap/packages/snap"
);
