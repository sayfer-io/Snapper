const { execSync } = require("child_process");

/**
 * Checks if a package manager is installed and installs it if not.
 * @param {string} packageManager - The name of the package manager.
 * @param {string} installCommand - The command to install the package manager.
 */
function checkAndInstall(packageManager, installCommand) {
  try {
    // Check if the package manager is installed
    execSync(`${packageManager} --version`, { stdio: "ignore" });
    console.log(`${packageManager} is already installed.`);
  } catch (error) {
    console.log(
      `${packageManager} is not installed. Installing ${packageManager}...`
    );
    // Install the package manager globally
    execSync(installCommand, { stdio: "inherit" });
  }
}

/**
 * Main function to check and install necessary package managers.
 */
function main() {
  const packageManagers = [
    { name: "npm", installCommand: "npm install -g npm" },
    { name: "yarn", installCommand: "npm install -g yarn" },
    { name: "pnpm", installCommand: "npm install -g pnpm" },
    { name: "mm-snap", installCommand: "npm install -g snaps-cli" },
    { name: "audit-ci", installCommand: "npm install -g audit-ci" },
  ];

  packageManagers.forEach((pm) => checkAndInstall(pm.name, pm.installCommand));
}

// Run the main function
main();
