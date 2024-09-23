import { spawn } from "child_process";
import { join } from "path";
import { installSnap } from "@metamask/snaps-simulation";

/**
 * Runs the Snap server and connects to it.
 * @param {string} directory - The directory where the Snap server should be started.
 */
const runSnapServerAndConnect = async (directory: string) => {
  try {
    const snapFolderPath = join(__dirname, directory);

    // Step 1: Start the Snap server in the background
    console.log("Starting the Snap server...");
    const serverProcess = spawn("npx", ["mm-snap", "serve", "--port", "3333"], {
      cwd: snapFolderPath,
      detached: true,
      stdio: "ignore",
    });
    serverProcess.unref();

    // Step 2: Concurrently connect to the Snap server
    console.log("Connecting to the Snap server...");
    const connectToSnap = async () => {
      const snapId: any = "local:http://localhost:3333";
      const snap = await installSnap(snapId);
      console.log(snap);
      console.log("Success: Connected to the Snap server.");
    };

    await connectToSnap();

    // TODO: Add more functionality here...

    // Step 3: Kill the Snap server process if pid is defined
    if (serverProcess.pid) {
      console.log("Killing the Snap server process...");
      process.kill(-serverProcess.pid);
      console.log("Snap server process killed.");
    } else {
      console.error("Error: Snap server process PID is undefined.");
    }
  } catch (error) {
    console.error("Error running Snap server and connecting:", error);
  }
};

export { runSnapServerAndConnect };
