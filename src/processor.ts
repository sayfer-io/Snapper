import path from "path";
import { Project, SourceFile } from "ts-morph";

import logger from "./utils/logger";
import { Finding } from "./types";
import { findTsConfig } from "./utils/fileUtils";
import * as Detectors from "./detectors";

// List of detector instances
const detectorInstances = [
  new Detectors.ConsoleLogDetector(),
  new Detectors.DangerousFunctionsDetector(),
  new Detectors.DeprecatedFunctionsDetector(),
  new Detectors.HardcodedSecretsDetector(),
  new Detectors.ExcessiveCommentsDetector(),
  new Detectors.InsecureRandomnessDetector(),
  new Detectors.UnusedFunctionsDetector(),
  new Detectors.UnusedImportsDetector(),
  new Detectors.UnusedVariablesDetector(),
  new Detectors.LeftoverTODOsDetector(),
  new Detectors.InsecureCryptoLibrariesDetector(),
  new Detectors.InsecureCryptographyDetector(),
  new Detectors.UsedBeforeDefinedFunctionsDetector(),
  new Detectors.UsedBeforeDefinedArrowFunctionsDetector(),
  new Detectors.UsedBeforeDefinedInterfacesDetector(),
  new Detectors.UnusedPermissionsDetector(),
  new Detectors.DeprecatedPermissionsDetector(),
  new Detectors.DependencyOutdatedDetector(),
  new Detectors.DependencyVersioningDetector(),
  new Detectors.LackOfExceptionHandlingDetector(),
  new Detectors.OriginValidationDetector(),
  new Detectors.PotentialOutdatedEngineDetector(),
  new Detectors.MissingExplicitStrictTypeCheckingDetector(),
  new Detectors.BroadPermissionsDetector(),
  new Detectors.FloatingPointPrecisionDetector(),
  new Detectors.UnhandledPromiseRejectionDetector(),
  new Detectors.ImproperTypeUsageDetector(),
  new Detectors.ESLintingDetector(),
];

/**
 * Processes the files in the given project path using the specified detectors.
 *
 * @param {string} projectPath - The path to the TypeScript project.
 * @param {string[]} [detectorsToUse] - The list of detectors to run. If not provided, all detectors will be applied.
 * @param {string[]} [detectorsToIgnore] - The list of detectors to ignore.
 * @returns {Promise<Finding[]>} - A promise that resolves to an array of findings.
 */
export async function processFiles(
  projectPath: string,
  detectorsToUse: string[] = [],
  detectorsToIgnore: string[] = []
): Promise<Finding[]> {
  const tsConfigPaths = await findTsConfig(projectPath);
  if (!tsConfigPaths.length) {
    logger.error(`No tsconfig.json files found in: ${projectPath}`);
    return [];
  }

  const detectorsToRun = getDetectorsToRun(detectorsToUse, detectorsToIgnore);
  if (!detectorsToRun.length) {
    logger.warn("No detectors to run.");
    return [];
  }

  logger.debug(
    `Running detectors: ${detectorsToRun.map((d) => d.getName()).join(", ")}`
  );

  const allFindings: Finding[] = [];
  for (const tsConfigPath of tsConfigPaths) {
    await processProject(tsConfigPath, detectorsToRun, allFindings);
  }

  logger.info(`Total issues found: ${allFindings.length}`);
  return allFindings;
}

/**
 * Filters the detectors based on specific criteria.
 *
 * @param {string[]} detectorsToUse - The list of detectors to use.
 * @param {string[]} detectorsToIgnore - The list of detectors to ignore.
 * @returns {Detectors.DetectorBase[]} - The filtered list of detectors.
 */
function getDetectorsToRun(
  detectorsToUse: string[] = [],
  detectorsToIgnore: string[] = []
): Detectors.DetectorBase[] {
  if (!detectorsToUse.length) {
    detectorsToUse = detectorInstances.map((d) => d.getName());
  }

  const filteredDetectors = detectorsToUse.filter(
    (d) => !detectorsToIgnore.includes(d)
  );

  return detectorInstances.filter((detector) =>
    filteredDetectors.some(
      (name) => detector.getName().toLowerCase() === name.toLowerCase()
    )
  );
}

/**
 * Processes a single TypeScript project.
 *
 * @param {string} tsConfigPath - The path to the tsconfig.json file.
 * @param {Detectors.DetectorBase[]} detectorsToRun - The list of detectors to run.
 * @param {Finding[]} allFindings - The array to collect all findings.
 */
async function processProject(
  tsConfigPath: string,
  detectorsToRun: Detectors.DetectorBase[],
  allFindings: Finding[]
) {
  const folderPath = path.dirname(tsConfigPath);
  const project = new Project({ tsConfigFilePath: tsConfigPath });

  logger.debug(`Processing project: ${tsConfigPath}`);

  // const files = project.addSourceFilesAtPaths([
  //   `${folderPath}/**/*.ts`,
  //   `${folderPath}/**/package.json`,
  //   `${folderPath}/**/tsconfig.json`,
  //   `${folderPath}/**/snap.manifest.json`,
  // ]);
  const files = project.addSourceFilesFromTsConfig(tsConfigPath);

  const sortedFiles = files
    .filter((file) => {
      const filePath = file.getFilePath();
      const isTestFile = filePath.includes('.test.') || 
                        filePath.includes('.spec.') || 
                        filePath.includes('/__tests__/') ||
                        filePath.includes('/__test__/') ||
                        filePath.includes('/test/') ||
                        filePath.includes('/tests/');
      
      if (isTestFile) {
        logger.debug(`Skipping test file: ${filePath}`);
      }
      
      return !filePath.includes("/node_modules/") && !isTestFile;
    })
    .sort((a, b) => a.getFilePath().localeCompare(b.getFilePath()));

  logger.info(`Processing ${sortedFiles.length} files in ${folderPath}`);

  for (const file of sortedFiles) {
    await runDetectorsOnFile(file, detectorsToRun, allFindings);
  }
}

/**
 * Runs detectors on a single file and collects findings.
 *
 * @param {SourceFile} file - The TypeScript file to run detectors on.
 * @param {Detectors.DetectorBase[]} detectorsToRun - The list of detectors to run.
 * @param {Finding[]} allFindings - The array to collect all findings.
 */
async function runDetectorsOnFile(
  file: SourceFile,
  detectorsToRun: Detectors.DetectorBase[],
  allFindings: Finding[]
) {
  const filePath = file.getFilePath();
  logger.debug(`Processing file: ${filePath}`);

  for (const detector of detectorsToRun) {
    detector.clearFindings();

    if (detector.allowedFileRegexes.some((regex) => regex.test(filePath))) {
      logger.debug(`Running detector: ${detector.getName()}`);
      await detector.run(file);
      const findings = detector.getFindings();
      logger.debug(`Found ${findings.length} issues`);
      allFindings.push(...findings);
    }
  }
}
