import logger from "../utils/logger";

import { execSync, spawn, ChildProcess } from "child_process";

let childProcesses: ChildProcess[] = [];

/**
 * Runs a command in the specified directory.
 * @param {string} command - The command to run.
 * @param {string} [workingDir] - The path to the working directory. If not provided, the current directory is used.
 * @returns {string} - The command's output.
 */
export function runCommand(command: string, workingDir?: string): string {
  let output = "";
  const originalCwd = process.cwd();
  try {
    if (workingDir) {
      process.chdir(workingDir);
    }
    logger.debug(
      `Running command: '${command}' in ${workingDir || originalCwd}`
    );
    output = execSync(command, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    });
  } catch (err: any) {
    if (err.stdout) {
      output = err.stdout.toString();
    }
    if (err.stderr) {
      output = err.stderr.toString();
    }
  } finally {
    if (workingDir) {
      process.chdir(originalCwd);
    }
  }
  logger.debug(`Command output: ${output}`);
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
    logger.debug(`Child process exited with code ${code}`);
    // Remove the child process from the list
    childProcesses = childProcesses.filter((cp) => cp.pid !== child.pid);
  });

  child.unref();
}

/**
 * Kills all running child processes.
 */
export function killAllChildProcesses(): void {
  logger.debug("Terminating all child processes...");
  childProcesses.forEach((child) => {
    if (child.pid) {
      try {
        // Kill the entire process group of each child
        process.kill(-child.pid, "SIGKILL");
        logger.debug(`Child process ${child.pid} terminated.`);
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
  logger.debug("Exiting main process.");
  process.exit(); // Explicitly exit the main process
});
