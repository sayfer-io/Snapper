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
  // new Detectors.DependencyOutdatedDetector(),
  new Detectors.DependencyVersioningDetector(),
  new Detectors.LackOfExceptionHandlingDetector(),
  // new Detectors.OriginValidation(),
  new Detectors.PotentialOutdatedEngineDetector(),
  new Detectors.StrictNullChecksDetector(),
  new Detectors.MissingExplicitStrictTypeCheckingDetector(),
  new Detectors.BroadPermissionsDetector(),
  new Detectors.FloatingPointPrecisionDetector(),
  new Detectors.UnhandledPromiseRejectionDetector(),
];

/**
 * Processes files in a TypeScript project to find issues based on specified detector.
 *
 * @param {string} projectPath - The path to the TypeScript project.
 * @param {string} [detectorName] - The specific detector to run. If not provided, all detectors will be applied.
 * @returns {Promise<Finding[]>} - A promise that resolves to an array of findings.
 */
export async function processFiles(
  projectPath: string,
  detectorName?: string
): Promise<Finding[]> {
  const tsConfigPaths = await findTsConfig(projectPath);
  if (tsConfigPaths.length === 0) {
    logger.error(`No tsconfig.json files found in: ${projectPath}`);
    return [];
  }

  const allFindings: Finding[] = [];

  for (const tsConfigPath of tsConfigPaths) {
    const folderPath = path.dirname(tsConfigPath);
    const project = new Project({ tsConfigFilePath: tsConfigPath });
    logger.debug(`Processing project with tsconfig: ${tsConfigPath}`);

    const files = project.addSourceFilesAtPaths([
      `${folderPath}/**/*.ts`,
      `${folderPath}/**/package.json`,
      `${folderPath}/**/tsconfig.json`,
      `${folderPath}/**/snap.manifest.json`,
    ]);
    logger.info(`Processing files in path: ${folderPath}`);

    let findingsCount = 0;
    for (const file of files) {
      // Skip files in node_modules, could not make it work with the glob pattern
      if (file.getFilePath().includes("/node_modules/")) {
        continue;
      }

      logger.debug(`Processing file: ${file.getFilePath()}`);

      let detectorsToRun = detectors;

      if (detectorName) {
        detectorsToRun = detectors.filter((detector) => {
          return (
            detector.getName().toLowerCase() === detectorName.toLowerCase()
          );
        });
        if (detectorsToRun.length === 0) {
          logger.warn(`No detector found with name: ${detectorName}`);
          return [];
        }
      }

      logger.debug(
        `Going to run detectors: ${detectorsToRun.map((d) => d.getName())}`
      );

      for (const detector of detectorsToRun) {
        logger.debug(`Running detector: ${detector.getName()}`);

        // Run the detector and capture its findings
        await detector.run(file as SourceFile);
        const findings = detector.getFindings();

        // Calculate new findings added by this detector
        const newFindings = findings.slice(allFindings.length);
        const newFindingsCount = newFindings.length;

        logger.debug(`Found ${newFindingsCount} new findings`);
        findingsCount += newFindingsCount;
        allFindings.push(...newFindings);
      }
    }

    logger.info(`Number of issues found for ${tsConfigPath}: ${findingsCount}`);
  }

  logger.info(`Total number of issues found: ${allFindings.length}`);
  return allFindings;
}
