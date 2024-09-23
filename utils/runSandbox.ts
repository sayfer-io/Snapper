import { join } from "path";
import { installSnap } from "@metamask/snaps-jest";
import { runCommandDetached } from "./commandUtils";
import { existsSync, readFileSync, writeFileSync } from "fs";
import * as recast from "recast";

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
 * Reads and sanitizes the Snap configuration file.
 * @param {string} configFile - The path to the Snap configuration file.
 * @returns {string} The sanitized configuration content.
 */
const sanitizeConfigFile = (configFile: string): string => {
  const configContent = readFileSync(configFile, "utf-8");
  const ast = recast.parse(configContent);

  // Ensure the AST structure is as expected
  if (
    ast.program.body.length > 0 &&
    ast.program.body[0].type === "VariableDeclaration" &&
    ast.program.body[1].type === "ExpressionStatement" &&
    ast.program.body[1].expression.type === "AssignmentExpression" &&
    ast.program.body[1].expression.right.type === "ObjectExpression"
  ) {
    // Remove cliOptions and bundlerCustomizer properties
    ast.program.body[1].expression.right.properties =
      ast.program.body[1].expression.right.properties.filter(
        (property: any) =>
          property.key.name !== "cliOptions" &&
          property.key.name !== "bundlerCustomizer"
      );
  } else {
    throw new Error("Unexpected AST structure");
  }

  return recast.print(ast).code;
};

/**
 * Creates a temporary configuration file.
 * @param {string} directory - The directory where the temporary configuration file should be created.
 * @param {string} tempConfig - The sanitized configuration content.
 * @returns {string} The path to the temporary configuration file.
 */
const createTempConfigFile = (
  directory: string,
  tempConfig: string
): string => {
  const tempConfigFile = join(directory, "temp-snap.config.js");
  writeFileSync(tempConfigFile, tempConfig);
  return tempConfigFile;
};

/**
 * Starts the Snap server in the background using a temporary configuration file.
 * @param {string} directory - The directory where the Snap server should be started.
 * @param {number} port - The port number to use for the Snap server.
 */
const startSnapServer = (directory: string, port: number): void => {
  console.log("Starting the Snap server...");

  const configFile = join(directory, "snap.config.js");
  try {
    const tempConfig = sanitizeConfigFile(configFile);
    const tempConfigFile = createTempConfigFile(directory, tempConfig);

    // Use the temporary configuration file to run the Snap server
    runCommandDetached(
      `npx mm-snap serve --port ${port} --config ${tempConfigFile}`,
      directory
    );
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Failed to run Snap: ${err.message}`);
    } else {
      console.error(`Failed to run Snap: ${String(err)}`);
    }
  }
};

/**
 * Connects to the Snap server with retries.
 * @param {number} port - The port number to use for connecting to the Snap server.
 * @param {number} maxRetries - The maximum number of retries.
 * @param {number} retryDelay - The delay between retries in milliseconds.
 * @returns {Promise<void>}
 * @throws {Error} If unable to connect to the Snap server after the maximum number of retries.
 */
const connectToSnapServer = async (
  port: number,
  maxRetries: number,
  retryDelay: number
): Promise<void> => {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const snapId: any = `local:http://localhost:${port}`;
      await installSnap(snapId);
      // Add any additional logic for connecting to the Snap server here
      return;
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

    // Step 1: Start the Snap server in the background
    startSnapServer(snapFolderPath, port);

    // Wait a bit before connecting to the Snap server
    console.log("Waiting for the Snap server to start...");
    await sleep(5000); // Sleep for 5 seconds

    // Step 2: Concurrently connect to the Snap server with retries
    console.log("Connecting to the Snap server...");
    await connectToSnapServer(port, maxRetries, retryDelay);

    // TODO: Simulate some work being done with the Snap
    console.log("Simulating work with the Snap...");
    await sleep(5000); // Sleep for 5 seconds
    console.log("Finished simulating work with the Snap.");

    // Note: Killing the Snap server process is not handled here since it's detached
  } catch (error) {
    console.error("Error running Snap server and connecting:", error);
  }
};

export { runSnapServerAndConnect };

// Example usage
runSnapServerAndConnect(
  "../testcases/Error Handling Issues/web3-security-snap/snap"
);
