import { SourceFile } from "ts-morph";

import logger from "../utils/logger";
import { Finding } from "../types";
import { RiskRating } from "../structures";

/**
 * Abstract base class for all detectors.
 * This class provides a common structure and utility methods for specific detectors
 * that will implement the run method to analyze source files for issues.
 */
export abstract class DetectorBase {
  // Common properties that all detectors need
  protected name: string;
  protected riskRating: RiskRating;
  protected findings: Finding[] = []; // Array to hold findings detected by the detector.

  // List of file extensions that the detector can analyze.
  public allowedFileRegexes: RegExp[] = [/\.ts$/, /\.tsx$/, /\.js$/, /\.jsx$/];

  /**
   * Constructor to initialize the detector with a name and risk rating.
   * @param name - The name of the detector.
   * @param riskRating - The risk rating associated with the findings from this detector.
   */
  constructor(name: string, riskRating: RiskRating) {
    this.name = name;
    this.riskRating = riskRating;
  }

  // Abstract method that each detector must implement to perform the analysis
  abstract run(file: SourceFile): Finding[] | Promise<Finding[]>;

  /**
   * Adds a finding to the findings array.
   * This method creates a Finding object and logs a debug message before adding it to the findings list.
   * @param description - Description of the finding.
   * @param filePath - Path of the file where the finding was detected.
   * @param lineNum - Line number where the finding was detected (default is 1).
   */
  addFinding(description: string, filePath: string, lineNum: number = 1): void {
    const finding: Finding = {
      type: this.name,
      description: description,
      position: {
        filePath: filePath,
        lineNum: lineNum,
      },
      riskRating: this.riskRating,
    };
    this.logDebug(`Adding finding - ${description}`);
    this.findings.push(finding); // Store the finding in the findings array.
  }

  /**
   * Clears all findings from the detector.
   * This method resets the findings array to an empty state.
   */
  clearFindings(): void {
    this.findings = [];
  }

  /**
   * Gets the name of the detector.
   * @returns {string} - The name of the detector.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Retrieves all findings collected by the detector.
   * @returns {Finding[]} - Array of findings.
   */
  getFindings(): Finding[] {
    return this.findings;
  }

  /**
   * Logs an informational message.
   * This method formats the message with the detector's name and logs it at the info level.
   * @param message - The message to log.
   */
  logInfo(message: string): void {
    logger.info(`[${this.name}] ${message}`);
  }

  /**
   * Logs a debug message.
   * This method formats the message with the detector's name and logs it at the debug level.
   * @param message - The message to log.
   */
  logDebug(message: string): void {
    logger.debug(`[${this.name}] ${message}`);
  }

  /**
   * Logs an error message.
   * This method formats the message with the detector's name and logs it at the error level.
   * @param message - The message to log.
   * @param error - Optional error object to log alongside the message.
   */
  logError(message: string, error?: Error): void {
    logger.error(`[${this.name}] ${message}`, error);
  }

  /**
   * Logs a warning message.
   * This method formats the message with the detector's name and logs it at the warning level.
   * @param message - The message to log.
   * @param error - Optional error object to log alongside the message.
   */
  logWarning(message: string, error?: Error): void {
    logger.warn(`[${this.name}] ${message}`, error);
  }
}
