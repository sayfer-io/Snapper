import { SourceFile } from "ts-morph";
import { installSnap } from "@metamask/snaps-simulation";

import { Finding } from "../types";
import { RiskRating } from "../structures";
import { DetectorBase } from "./DetectorBase";

/**
 * Detector for validating the origin of requests.
 */
class OriginValidation extends DetectorBase {
  private runCounter: number;

  constructor() {
    super("originValidation", RiskRating.High);
    this.runCounter = 0;
  }

  /**
   * Checks if the domain allow list is properly configured.
   * @returns {Promise<boolean>} - True if the domain is blocked, false otherwise.
   */
  private async hasDomainAllowList(): Promise<boolean> {
    const snapId: any = "local:http://localhost:3333";
    const { request } = await installSnap(snapId);
    let isBlocked = false;

    try {
      const { response }: any = await request({
        origin: "https://theansweris42.com:4242",
        method: "hello",
        params: [],
      });

      if (
        response.error &&
        !response.error.message.toLowerCase().includes("method")
      ) {
        isBlocked = true;
      }
    } catch (error) {
      console.error("Error during domain allow list check:", error);
    }

    return isBlocked;
  }

  /**
   * Runs the origin validation detector on the given source file.
   * @param {SourceFile} sourceFile - The source file to analyze.
   * @returns {Promise<Finding[]>} - Array of findings with details about the detected issues.
   */
  public async run(sourceFile: SourceFile): Promise<Finding[]> {
    if (++this.runCounter > 1) {
      return this.getFindings();
    }

    const hasAllowList = await this.hasDomainAllowList();
    if (!hasAllowList) {
      this.addFinding(
        "Insufficient origin validation",
        sourceFile.getFilePath(),
        0
      );
    }

    return this.getFindings();
  }
}

export { OriginValidation };
