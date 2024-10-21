import path from "path";
import fsExtra from "fs-extra";
import { SourceFile } from "ts-morph";
import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";
import {
  createTempDir,
  detectPackageManager,
  deleteLockFiles,
} from "../utils/fileUtils";
import {
  installDependencies,
  buildSnap,
  startAndConnectToSnap,
} from "../utils/dynamicSnapHelpers";

const DOMAIN = "https://theansweris42.com";
const METHOD = "hello";
const ERROR_MESSAGE = "method"; // covers 95% of the cases

/**
 * Detector for validating the origin of requests.
 */
class OriginValidationDetector extends DetectorBase {
  public allowedFileRegexes: RegExp[] = [/package\.json$/];

  constructor() {
    super("originValidation", RiskRating.High);
  }

  /**
   * Checks if the domain allow list is properly configured.
   * @param request - The Snap request function from `startAndConnectToSnap`.
   * @param port - The port number to use in the request.
   * @returns {Promise<boolean>} - True if the domain is blocked, false otherwise.
   */
  private async isDomainBlocked(
    request: (params: any) => Promise<any>,
    port: number
  ): Promise<boolean> {
    try {
      const { response } = await request({
        origin: `${DOMAIN}:${port}`,
        method: METHOD,
        params: [],
      });

      return (
        response?.error &&
        !response.error.message.toLowerCase().includes(ERROR_MESSAGE)
      );
    } catch (error) {
      this.handleError("Error during domain allow list check", error);
      return false;
    }
  }

  /**
   * Runs the origin validation detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Promise<Finding[]>} - Array of findings with details about the detected issues.
   */
  public async run(sourceFile: SourceFile): Promise<Finding[]> {
    const filePath = sourceFile.getFilePath();
    const tempDir = createTempDir();
    fsExtra.copySync(path.dirname(filePath), tempDir);

    try {
      this.logDebug("Detecting package manager...");
      const packageManager = detectPackageManager(tempDir);
      this.logDebug(`Detected package manager: ${packageManager}`);

      this.logDebug("Cleaning up existing lockfile...");
      deleteLockFiles(tempDir);

      this.logDebug("Installing dependencies...");
      installDependencies(tempDir, packageManager);

      this.logDebug("Building Snap...");
      const snapDirectory = `${tempDir}/packages/snap`;
      await buildSnap(snapDirectory);

      this.logDebug("Starting Snap...");
      const { request, port } = await startAndConnectToSnap(snapDirectory);

      const isBlocked = await this.isDomainBlocked(request, port);
      if (!isBlocked) {
        this.addFinding("Insufficient origin validation", filePath, 1);
      }
    } catch (error) {
      this.handleError("Error during the origin validation run", error);
    }

    return this.getFindings();
  }

  /**
   * Handles errors by logging them to the console.
   * @param message - The error message to log.
   * @param error - The error object.
   */
  private handleError(message: string, error: any): void {
    console.error(message, error);
  }
}

export { OriginValidationDetector };
