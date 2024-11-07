/**
 * Enum representing the risk rating of a finding.
 *
 * This enum defines the possible risk ratings for a finding, ranging from
 * "Informational" (lowest risk) to "Critical" (highest risk). These risk
 * ratings are often used to prioritize and address identified issues in the
 * source code.
 */
export enum RiskRating {
  Informational = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  Critical = 4,
}

/**
 * Enum representing the impact of a finding.
 *
 * This enum defines the possible impact levels for a finding, ranging from
 * "Informational" (lowest impact) to "Critical" (highest impact). The impact
 * level is a measure of how severely the finding could affect the system or
 * its users.
 */
export enum Impact {
  Informational = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  Critical = 4,
}

/**
 * Enum representing the confidence level of a finding.
 *
 * This enum defines the possible confidence levels for a finding, ranging from
 * "Low" (lowest confidence) to "High" (highest confidence). The confidence
 * level indicates the degree of certainty that the finding is accurate and
 * represents a real issue.
 */
export enum Confidence {
  Low = 0,
  Medium = 1,
  High = 2,
}

/**
 * Enum representing the ease of exploitation of a finding.
 *
 * This enum defines the possible levels of ease of exploitation for a finding,
 * ranging from "Easy" (lowest difficulty) to "Hard" (highest difficulty). The
 * ease of exploitation indicates how difficult it would be for an attacker to
 * exploit the identified vulnerability or issue.
 */
export enum EaseOfExploitation {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}