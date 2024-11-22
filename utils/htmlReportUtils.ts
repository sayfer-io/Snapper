import { Finding } from "../types";
import { RiskRating } from "../structures";

/**
 * Converts a risk rating number to its corresponding string representation.
 *
 * @param {number} riskRating - The risk rating number.
 * @returns {string} - The string representation of the risk rating.
 */
const riskRatingToString = (riskRating: number): string => {
  return RiskRating[riskRating] || "Unknown";
};

/**
 * Simplifies the table data by merging entries with the same type, description, risk rating, and file path.
 *
 * @param {Finding[]} data - The array of findings.
 * @returns {Finding[]} - The simplified array of findings.
 */
function simplifyTableDataNoFilePathMerge(data: Finding[]): Finding[] {
  const simplifiedData: any[] = [];
  let lastEntry: any = null;

  data.forEach((entry) => {
    const riskRatingStr = riskRatingToString(entry.riskRating);
    if (
      lastEntry &&
      lastEntry.type === entry.type &&
      lastEntry.description === entry.description &&
      lastEntry.riskRating === riskRatingStr &&
      lastEntry.filePath === entry.position.filePath
    ) {
      lastEntry.lineNums += `, ${entry.position.lineNum}`;
    } else {
      lastEntry = {
        type: entry.type,
        description: entry.description,
        filePath: entry.position.filePath,
        lineNums: `${entry.position.lineNum}`,
        riskRating: riskRatingStr,
      };
      simplifiedData.push(lastEntry);
    }
  });

  return simplifiedData;
}

/**
 * Generates HTML table rows from the given findings.
 *
 * @param {any[]} findings - The array of findings.
 * @returns {string} - The generated HTML table rows as a string.
 */
const generateTableRows = (findings: any[]): string =>
  findings
    .map(
      (finding) => `
      <tr>
        <td>${finding.type}</td>
        <td>${finding.description}</td>
        <td>${finding.filePath}</td>
        <td>${finding.lineNums}</td>
        <td>${finding.riskRating}</td>
      </tr>
    `
    )
    .join("");

/**
 * Generates an HTML report from the given findings.
 *
 * @param {Finding[]} sortedFindings - An array of findings.
 * @returns {string} - The generated HTML report as a string.
 */
export function generateHtmlReport(sortedFindings: Finding[]): string {
  const simplifiedData = simplifyTableDataNoFilePathMerge(sortedFindings);

  // Sort the simplified data by risk rating in descending order
  simplifiedData.sort((a, b) => {
    const riskRatingA = Object.keys(RiskRating).find(
      (key) => (RiskRating as any)[key] === a.riskRating
    );
    const riskRatingB = Object.keys(RiskRating).find(
      (key) => (RiskRating as any)[key] === b.riskRating
    );
    return (
      (riskRatingB ? parseInt(riskRatingB) : 0) -
      (riskRatingA ? parseInt(riskRatingA) : 0)
    );
  });

  const tableRows = generateTableRows(simplifiedData);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Findings Report</title>
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
        }
      </style>
    </head>
    <body>
      <h1>Findings Report</h1>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Description</th>
            <th>File Path</th>
            <th>Line Numbers</th>
            <th>Risk Rating</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </body>
    </html>
  `;
}
