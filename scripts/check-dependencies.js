const { execSync } = require("child_process");

/**
 * Checks if a package manager is installed and alerts the user if not.
 * @param {string} packageManager - The name of the package manager.
 * @param {string} installCommand - The command to install the package manager.
 */
function checkAndAlert(packageManager, installCommand) {
  try {
    // Check if the package manager is installed
    execSync(`${packageManager} --version`, { stdio: "ignore" });
  } catch (error) {
    console.log(
      `${packageManager} is not installed. You can install it by running the following command:`
    );
    console.log(`  ${installCommand}`);
  }
}

/**
 * Main function to check and alert necessary package managers.
 */
function main() {
  const packageManagers = [
    { name: "npm", installCommand: "npm install -g npm" },
    { name: "yarn", installCommand: "npm install -g yarn" },
    { name: "pnpm", installCommand: "npm install -g pnpm" },
    { name: "mm-snap", installCommand: "npm install -g @metamask/snaps-cli" },
    { name: "audit-ci", installCommand: "npm install -g audit-ci" },
  ];

  packageManagers.forEach((pm) => checkAndAlert(pm.name, pm.installCommand));
}

// Run the main function
main();
