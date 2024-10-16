/**
 * Exports the detection functions for various code vulnerabilities.
 */

/** Detects usage of console.log statements. */
export { ConsoleLogDetector } from "./ConsoleLog";

/** Detects usage of potentially dangerous functions. */
export { DangerousFunctionsDetector } from "./DangerousFunctions";

/** Detects usage of deprecated functions. */
export { DeprecatedFunctionsDetector } from "./DeprecatedFunctions";

/** Detects hardcoded secrets in the code. */
export { HardcodedSecretsDetector } from "./HardcodedSecrets";

/** Detects large sections of commented-out code or leftover TODOs. */
export { ExcessiveCommentsDetector } from "./ExcessiveComments";

/** Detects usage of insecure randomness. */
export { InsecureRandomnessDetector } from "./InsecureRandomness";

/** Detects unused functions in the code. */
export { UnusedFunctionsDetector } from "./UnusedFunctions";

/** Detects unused imports in the code. */
export { UnusedImportsDetector } from "./UnusedImports";

/** Detects unused variables in the code. */
export { UnusedVariablesDetector } from "./UnusedVariables";

/** Detects leftover TODOs in the code. */
export { LeftoverTODOsDetector } from "./LeftoverTODOs";

/** Detects usage of insecure cryptography libraries. */
export { InsecureCryptoLibrariesDetector } from "./InsecureCryptoLibraries";

/** Detects insecure cryptography usage, such as low iteration PBKDF2. */
export { InsecureCryptographyDetector } from "./InsecureCryptography";

/** Detects functions that are used before they are defined. */
export { UsedBeforeDefinedFunctionsDetector } from "./UsedBeforeDefinedFunctions";

/** Detects arrow functions that are used before they are defined. */
export { UsedBeforeDefinedArrowFunctionsDetector } from "./UsedBeforeDefinedArrowFunctions";

/** Detects interfaces that are used before they are defined. */
export { UsedBeforeDefinedInterfacesDetector } from "./UsedBeforeDefinedInterfaces";

/** Detects unused permissions in the snap.manifest.json file. */
export { UnusedPermissionsDetector } from "./UnusedPermissions";

/** Detects deprecated permissions in the snap.manifest.json file. */
export { DeprecatedPermissionsDetector } from "./DeprecatedPermissions";

/** Detects outdated dependencies in the package.json file. */
export { DependencyOutdatedDetector } from "./DependencyOutdated";

/** Detects non-exact dependency versions in the package.json file. */
export { DependencyVersioningDetector } from "./DependencyVersioning";

/** Validates the origin of requests to ensure proper domain allow list configuration. */
export { OriginValidation } from "./OriginValidation";

/** Detects lack of exception handling in important functions. */
export { LackOfExceptionHandlingDetector } from "./LackOfExceptionHandling";

/** Detects common issues like the use of any types, unused variables, unused expressions, and unused labels. */
export { ESLintingDetector } from "./ESLinting";

/** Detects missing or outdated Node.js engine specification in package.json. */
export { PotentialOutdatedEngineDetector } from "./PotentialOutdatedEngine";

/** Detects if strict null checks are not enabled in tsconfig.json. */
export { StrictNullChecksDetector } from "./StrictNullChecks";

/** Detects missing explicit strict type-checking options in tsconfig.json. */
export { MissingExplicitStrictTypeCheckingDetector } from "./MissingExplicitStrictTypeChecking";

/** Detects broad permissions in the snap.manifest.json file. */
export { BroadPermissionsDetector } from "./BroadPermissions";

/** Detects potential floating-point precision issues in JavaScript/TypeScript files. */
export { FloatingPointPrecisionDetector } from "./FloatingPointPrecision";

/** Detects unhandled promise rejections in the code. */
export { UnhandledPromiseRejectionDetector } from "./UnhandledPromiseRejection";

/** Detects improper type usage in the code. */
export { ImproperTypeUsageDetector } from "./ImproperTypeUsage";
