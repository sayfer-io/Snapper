/**
 * Enum representing the risk rating of a finding.
 */
export enum RiskRating {
  Informational = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  Critical = 4,
}

/**
 * Enum representing impact of a finding.
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
 */
export enum Confidence {
  Low = 0,
  Medium = 1,
  High = 2,
}

/**
 * Enum representing the ease of exploitation of a finding.
 */
export enum EaseOfExploitation {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}
