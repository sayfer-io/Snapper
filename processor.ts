import path from "path";
import { Project, SourceFile } from "ts-morph";

import logger from "./utils/logger";
import { Finding } from "./types";
import { findTsConfig } from "./utils/fileUtils";
import * as Detectors from "./detectors";

// List of detector instances
const detectors = [
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
  // new Detectors.DependencyVersioningDetector(),
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
 * Processes files in a TypeScript project to find issues based on specified detectors.
 *
 * @param {string} projectPath - The path to the TypeScript project.
 * @param {string[]} [detectorNames] - The list of detectors to run. If not provided, all detectors will be applied.
 * @returns {Promise<Finding[]>} - A promise that resolves to an array of findings.
 */
export async function processFiles(
  projectPath: string,
  detectorNames?: string[]
): Promise<Finding[]> {
  const tsConfigPaths = await findTsConfig(projectPath);
  if (!tsConfigPaths.length) {
    logger.error(`No tsconfig.json files found in: ${projectPath}`);
    return [];
  }

  const detectorsToRun = getDetectorsToRun(detectorNames);
  if (!detectorsToRun.length) return [];

  logger.debug(
    `Running detectors: ${detectorsToRun.map((d) => d.getName()).join(", ")}`
  );

  const allFindings: Finding[] = [];

  for (const tsConfigPath of tsConfigPaths) {
    const folderPath = path.dirname(tsConfigPath);
    const project = new Project({ tsConfigFilePath: tsConfigPath });

    logger.debug(`Processing project: ${tsConfigPath}`);

    const files = project.addSourceFilesAtPaths([
      `${folderPath}/**/*.ts`,
      `${folderPath}/**/package.json`,
      `${folderPath}/**/tsconfig.json`,
      `${folderPath}/**/snap.manifest.json`,
    ]);

    const sortedFiles = files
      .filter((file) => !file.getFilePath().includes("/node_modules/"))
      .sort((a, b) => a.getFilePath().localeCompare(b.getFilePath()));

    logger.info(`Processing ${sortedFiles.length} files in ${folderPath}`);

    for (const file of sortedFiles) {
      await runDetectorsOnFile(file, detectorsToRun, allFindings);
    }
  }

  logger.info(`Total issues found: ${allFindings.length}`);
  return allFindings;
}

/**
 * Filters and retrieves detectors to run based on detector names.
 *
 * @param {string[]} [detectorNames] - The list of detector names to filter.
 * @returns {Detector[]} - The filtered list of detectors to run.
 */
function getDetectorsToRun(detectorNames?: string[]): Detectors.DetectorBase[] {
  if (!detectorNames?.length) return detectors;

  const detectorsToRun = detectors.filter((detector) =>
    detectorNames.some(
      (name) => detector.getName().toLowerCase() === name.toLowerCase()
    )
  );

  if (!detectorsToRun.length) {
    logger.error(`No detectors found with names: ${detectorNames.join(", ")}`);
    return [];
  }

  const notFoundNames = detectorNames.filter(
    (name) =>
      !detectors.some(
        (detector) => detector.getName().toLowerCase() === name.toLowerCase()
      )
  );

  if (notFoundNames.length) {
    logger.warn(
      `Skipping detector which were not found: ${notFoundNames.join(", ")}`
    );
  }

  return detectorsToRun;
}

/**
 * Runs detectors on a single file and collects findings.
 *
 * @param {SourceFile} file - The TypeScript file to run detectors on.
 * @param {Detector[]} detectorsToRun - The list of detectors to run.
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
