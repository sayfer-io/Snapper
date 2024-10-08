import { SourceFile } from "ts-morph";

import logger from "../utils/logger";
import { Finding } from "../types";
import { RiskRating } from "../structures";

export abstract class DetectorBase {
  // Common properties that all detectors need
  protected name: string;
  protected riskRating: RiskRating;
  protected findings: Finding[] = [];

  constructor(name: string, riskRating: RiskRating) {
    this.name = name;
    this.riskRating = riskRating;
  }

  // Abstract method that each detector must implement
  abstract run(file: SourceFile): Finding[];

  /**
   * Adds a finding to the findings array.
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
    this.findings.push(finding);
  }

  /**
   * Clears the findings.
   */
  clearFindings(): void {
    this.findings = [];
  }

  getName(): string {
    return this.name;
  }

  getFindings(): Finding[] {
    return this.findings;
  }

  /**
   * Logs an informational message.
   * @param message - The message to log.
   */
  logInfo(message: string): void {
    logger.info(`[${this.name}] ${message}`);
  }

  /**
   * Logs a debug message.
   * @param message - The message to log.
   */
  logDebug(message: string): void {
    logger.debug(`[${this.name}] ${message}`);
  }

  /**
   * Logs an error message.
   * @param message - The message to log.
   * @param error - Optional error object to log.
   */
  logError(message: string, error?: Error): void {
    logger.error(`[${this.name}] ${message}`, error);
  }
}
