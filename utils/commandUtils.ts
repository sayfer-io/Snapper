import { execSync, spawn, ChildProcess } from "child_process";

let childProcesses: ChildProcess[] = [];

/**
 * Runs a command in the specified directory.
 * @param {string} command - The command to run.
 * @param {string} workingDir - The path to the temporary directory.
 * @returns {string} - The command's output.
 */
export function runCommand(command: string, workingDir: string): string {
  let output = "";
  const originalCwd = process.cwd();
  try {
    if (workingDir) {
      process.chdir(workingDir);
    }
    output = execSync(command, { encoding: "utf-8" });
  } catch (err: any) {
    if (err.stdout) {
      output = err.stdout.toString();
    }
  } finally {
    if (workingDir) {
      process.chdir(originalCwd);
    }
  }
  return output;
}

/**
 * Runs a command in a detached process.
 * @param {string} command - The command to run.
 * @param {string[]} args - The arguments for the command.
 * @param {string} cwd - The current working directory for the command.
 * @param {(output: string) => void} onOutput - Callback function to handle the command output.
 */
export function runCommandDetached(
  command: string,
  args: string[],
  cwd: string,
  onOutput: (output: string) => void
): void {
  const child = spawn(command, args, {
    cwd,
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
  });

  childProcesses.push(child);

  child.stdout.on("data", (data) => {
    onOutput(data.toString());
  });

  child.stderr.on("data", (data) => {
    onOutput(data.toString());
  });

  child.on("close", (code) => {
    console.log(`Child process exited with code ${code}`);
    // Remove the child process from the list
    childProcesses = childProcesses.filter((cp) => cp.pid !== child.pid);
  });

  child.unref();
}

/**
 * Kills all running child processes.
 */
export function killAllChildProcesses(): void {
  console.log("Terminating all child processes...");
  childProcesses.forEach((child) => {
    if (child.pid) {
      try {
        // Kill the entire process group of each child
        process.kill(-child.pid, "SIGKILL");
        console.log(`Child process ${child.pid} terminated.`);
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            `Failed to kill process ${child.pid}: ${error.message}`
          );
        } else {
          console.error(`Failed to kill process ${child.pid}: Unknown error`);
        }
      }
    } else {
      console.warn("Attempted to kill a child process without a valid PID.");
    }
  });
  childProcesses = [];
}

// Handle Ctrl+C signal, kill all child processes, and exit
process.on("SIGINT", () => {
  killAllChildProcesses();
  console.log("Exiting main process.");
  process.exit(); // Explicitly exit the main process
});
