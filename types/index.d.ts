import { RiskRating } from "../structuress";

/**
 * Represents a finding in the source code.
 */
export type Finding = {
  /**
   * The type of the finding.
   */
  type: string;

  /**
   * A description of the finding.
   */
  description: string;

  /**
   * The position of the finding in the source code.
   */
  position: {
    /**
     * The file path where the finding is located.
     */
    filePath: string;

    /**
     * The line number where the finding is located.
     */
    lineNum: number;
  };

  /**
   * The risk rating associated with the finding.
   */
  riskRating: RiskRating;
};
