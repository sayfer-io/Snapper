/**
 * Exports the detection functions for various code vulnerabilities.
 */

/**
 * Exports the abstract base class for all detectors.
 */
export { DetectorBase } from "./DetectorBase";

/**
 * Detects usage of console.log statements in the code.
 */
export { ConsoleLogDetector } from "./ConsoleLog";

/**
 * Detects usage of potentially dangerous functions that may introduce security risks.
 */
export { DangerousFunctionsDetector } from "./DangerousFunctions";

/**
 * Detects usage of deprecated functions that may no longer be supported.
 */
export { DeprecatedFunctionsDetector } from "./DeprecatedFunctions";

/**
 * Detects hardcoded secrets within the code to mitigate security risks.
 */
export { HardcodedSecretsDetector } from "./HardcodedSecrets";

/**
 * Detects large sections of commented-out code or leftover TODOs that may clutter the codebase.
 */
export { ExcessiveCommentsDetector } from "./ExcessiveComments";

/**
 * Detects usage of insecure randomness, which can affect cryptographic security.
 */
export { InsecureRandomnessDetector } from "./InsecureRandomness";

/**
 * Detects unused functions in the code to promote code cleanliness and efficiency.
 */
export { UnusedFunctionsDetector } from "./UnusedFunctions";

/**
 * Detects unused imports in the code, helping to reduce unnecessary dependencies.
 */
export { UnusedImportsDetector } from "./UnusedImports";

/**
 * Detects unused variables in the code to improve maintainability.
 */
export { UnusedVariablesDetector } from "./UnusedVariables";

/**
 * Detects leftover TODOs in the code that need addressing.
 */
export { LeftoverTODOsDetector } from "./LeftoverTODOs";

/**
 * Detects usage of insecure cryptography libraries that may expose vulnerabilities.
 */
export { InsecureCryptoLibrariesDetector } from "./InsecureCryptoLibraries";

/**
 * Detects insecure cryptography usage, such as weak implementations like low iteration PBKDF2.
 */
export { InsecureCryptographyDetector } from "./InsecureCryptography";

/**
 * Detects functions that are used before they are defined, which can lead to runtime errors.
 */
export { UsedBeforeDefinedFunctionsDetector } from "./UsedBeforeDefinedFunctions";

/**
 * Detects arrow functions that are invoked before their definitions to prevent errors.
 */
export { UsedBeforeDefinedArrowFunctionsDetector } from "./UsedBeforeDefinedArrowFunctions";

/**
 * Detects interfaces that are used before they are defined, which may cause issues in TypeScript.
 */
export { UsedBeforeDefinedInterfacesDetector } from "./UsedBeforeDefinedInterfaces";

/**
 * Detects unused permissions in the snap.manifest.json file to enhance security.
 */
export { UnusedPermissionsDetector } from "./UnusedPermissions";

/**
 * Detects deprecated permissions in the snap.manifest.json file that may pose security risks.
 */
export { DeprecatedPermissionsDetector } from "./DeprecatedPermissions";

/**
 * Detects outdated dependencies in the package.json file to ensure up-to-date libraries.
 */
export { DependencyOutdatedDetector } from "./DependencyOutdated";

/**
 * Detects non-exact dependency versions in the package.json file to promote consistency.
 */
export { DependencyVersioningDetector } from "./DependencyVersioning";

/**
 * Validates the origin of requests to ensure proper domain allow list configuration, enhancing security.
 */
export { OriginValidationDetector } from "./OriginValidation";

/**
 * Detects lack of exception handling in important functions to promote error management.
 */
export { LackOfExceptionHandlingDetector } from "./LackOfExceptionHandling";

/**
 * Detects common issues like the use of any types, unused variables, unused expressions, and unused labels to enhance code quality.
 */
export { ESLintingDetector } from "./ESLinting";

/**
 * Detects missing or outdated Node.js engine specification in package.json for compatibility.
 */
export { PotentialOutdatedEngineDetector } from "./PotentialOutdatedEngine";

/**
 * Detects missing explicit strict type-checking options in tsconfig.json for better type safety.
 */
export { MissingExplicitStrictTypeCheckingDetector } from "./MissingExplicitStrictTypeChecking";

/**
 * Detects broad permissions in the snap.manifest.json file that may expose security risks.
 */
export { BroadPermissionsDetector } from "./BroadPermissions";

/**
 * Detects potential floating-point precision issues in JavaScript/TypeScript files to avoid numeric inaccuracies.
 */
export { FloatingPointPrecisionDetector } from "./FloatingPointPrecision";

/**
 * Detects unhandled promise rejections in the code to improve error handling.
 */
export { UnhandledPromiseRejectionDetector } from "./UnhandledPromiseRejection";

/**
 * Detects improper type usage in the code to enhance type safety and maintainability.
 */
export { ImproperTypeUsageDetector } from "./ImproperTypeUsage";
