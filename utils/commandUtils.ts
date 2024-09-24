import { execSync, spawn } from "child_process";

/**
 * Runs a command in the specified directory.
 * @param {string} command - The command to run.
 * @param {string} workingDir - The path to the temporary directory.
 * @returns {string} - The command's output.
 */
export function runCommand(command: string, workingDir: string): string {
  const originalCwd = process.cwd();
  try {
    if (workingDir) {
      process.chdir(workingDir);
    }
    return execSync(command, { encoding: "utf-8" });
  } catch (err: any) {
    if (err.stdout) {
      return err.stdout.toString();
    }
    return "";
  } finally {
    if (workingDir) {
      process.chdir(originalCwd);
    }
  }
}

/**
 * Runs a command in a detached mode.
 * @param {string} command - The command to run.
 * @param {string} workingDir - The working directory to run the command in.
 */
export function runCommandDetached(command: string, workingDir: string): void {
  const originalCwd = process.cwd();
  try {
    if (workingDir) {
      process.chdir(workingDir);
    }
    const [cmd, ...args] = command.split(" ");
    const child = spawn(cmd, args, {
      stdio: "ignore",
      detached: true,
      shell: true,
    });
    child.unref();
  } finally {
    if (workingDir) {
      process.chdir(originalCwd);
    }
  }
}
