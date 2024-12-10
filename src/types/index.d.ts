import { RiskRating } from "../structures";

/**
 * Represents a finding in the source code.
 *
 * This interface defines the structure of a finding, which is a detected issue or
 * problem within the source code. It includes the following properties:
 *
 * - `type`: The type or category of the finding (e.g., "security vulnerability", "code smell").
 * - `description`: A textual description of the finding, providing more details about the issue.
 * - `position`: An object that contains information about the location of the finding in the source code:
 *   - `filePath`: The full path to the file where the finding is located.
 *   - `lineNum`: The line number within the file where the finding is located.
 * - `riskRating`: The risk rating associated with the finding, which is an enum of type `RiskRating`.
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
