/**
 * Enum representing the risk rating of a finding.
 */
export enum RiskRating {
    Information = 'Information',
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
    Critical = 'Critical'
}

/**
 * Enum representing impact of a finding.
 */
export enum Impact {
    Informational = 'Informational',
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
    Critical = 'Critical'
}

/**
 * Enum representing the confidence level of a finding.
 */
export enum Confidence {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
}

/**
 * Enum representing the ease of exploitation of a finding.
 */
export enum EaseOfExploitation {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard'
}