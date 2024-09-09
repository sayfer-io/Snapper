/**
 * Exports the detection functions for various code issues.
 *
 * - `detectConsoleLog`: Detects usage of console.log statements.
 * - `detectDangerousFunctions`: Detects usage of potentially dangerous functions.
 * - `detectNonExactDependencies`: Detects non-exact dependency versions in package.json.
 * - `detectVulnerableDependencies`: Detects usage of vulnerable dependencies.
 * - `detectHardcodedSecrets`: Detects hardcoded secrets in the code.
 * - `detectInsecureRandomness`: Detects usage of insecure randomness.
 * - `detectUnusedElements`: Detects unused variables, functions, and imports in the code.
 * - `detectLeftoverTODOs`: Detects large sections of commented-out code or leftover TODOs.
 * - `detectInsecureCryptography`: Detects insecure cryptography usage, such as low iteration PBKDF2 and non-native cryptography libraries.
 * - `detectUsedBeforeDefined`: Detects functions that are used before they are defined.
 */

export { detectConsoleLog } from "./ConsoleLog";
export { detectDangerousFunctions } from "./DangerousFunctions";
export { detectNonExactDependencies } from "./DependencyVersioning";
export { detectVulnerableDependencies } from "./DependencyOutdated";
export { detectHardcodedSecrets } from "./HardcodedSecrets";
export { detectInsecureRandomness } from "./InsecureRandomness";
export { detectUnusedElements } from "./UnusedElements";
export { detectLeftoverTODOs } from "./LeftoverTODOs";
export { detectInsecureCryptography } from "./InsecureCryptography";
export { detectUsedBeforeDefined } from "./UsedBeforeDefined";
