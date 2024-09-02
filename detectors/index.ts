/**
 * Exports the detection functions for various code issues.
 * 
 * - `detectConsoleLog`: Detects usage of console.log statements.
 * - `detectDangerousFunctions`: Detects usage of potentially dangerous functions.
 * - `detectNonExactDependencies`: Detects non-exact dependency versions in package.json.
 */

export { detectConsoleLog } from './ConsoleLog';
export { detectDangerousFunctions } from './DangerousFunctions';
export { detectNonExactDependencies } from './DependencyVersioning';
export { detectVulnerableDependencies } from './DependencyOutdated';
// export { detectHardcodedSecrets } from './HardcodedSecrets';
// export { detectInsecureRandomness } from './InsecureRandomness';
export { detectUnusedFunctions } from './UnusedFunctions';