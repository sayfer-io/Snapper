import { Finding } from "../types";
import { RiskRating } from "../structures";

type SimplifiedFinding = {
  type: string;
  description: string;
  filePath: string;
  lineNums: string;
  riskRating: string;
};

/**
 * Converts a risk rating number to its corresponding string representation.
 *
 * @param {number} riskRating - The risk rating number.
 * @returns {string} - The string representation of the risk rating.
 */
const riskRatingToString = (riskRating: number): string =>
  RiskRating[riskRating] || "Unknown";

/**
 * Merges findings with identical type, description, risk rating, and file path.
 *
 * @param {Finding[]} findings - The array of findings.
 * @returns {SimplifiedFinding[]} - The merged array of findings.
 */
function mergeFindings(findings: Finding[]): SimplifiedFinding[] {
  const mergedFindings: SimplifiedFinding[] = [];
  let currentEntry: SimplifiedFinding | null = null;

  findings.forEach((entry) => {
    const riskRatingStr = riskRatingToString(entry.riskRating);

    if (
      currentEntry &&
      currentEntry.type === entry.type &&
      currentEntry.description === entry.description &&
      currentEntry.riskRating === riskRatingStr &&
      currentEntry.filePath === entry.position.filePath
    ) {
      currentEntry.lineNums += `, ${entry.position.lineNum}`;
    } else {
      currentEntry = {
        type: entry.type,
        description: entry.description,
        filePath: entry.position.filePath,
        lineNums: `${entry.position.lineNum}`,
        riskRating: riskRatingStr,
      };
      mergedFindings.push(currentEntry);
    }
  });

  return mergedFindings;
}

/**
 * Sorts findings by risk rating in descending order.
 *
 * @param {SimplifiedFinding[]} findings - The array of findings.
 * @returns {SimplifiedFinding[]} - The sorted array of findings.
 */
function sortFindingsByRisk(
  findings: SimplifiedFinding[]
): SimplifiedFinding[] {
  const riskOrder = ["Critical", "High", "Medium", "Low", "Informational"];

  return findings.sort(
    (a, b) => riskOrder.indexOf(a.riskRating) - riskOrder.indexOf(b.riskRating)
  );
}

/**
 * Generates HTML table rows from the given findings.
 *
 * @param {SimplifiedFinding[]} findings - The array of findings.
 * @returns {string} - The generated HTML table rows as a string.
 */
function generateTableRows(findings: SimplifiedFinding[]): string {
  return findings
    .map(
      (finding, index) => `
        <tr class="${index % 2 === 0 ? "even-row" : "odd-row"}">
          <td>${finding.type}</td>
          <td>${finding.description}</td>
          <td>${finding.filePath}</td>
          <td>${finding.lineNums}</td>
          <td>${finding.riskRating}</td>
        </tr>
      `
    )
    .join("");
}

/**
 * Generates the CSS styles for the HTML report.
 *
 * @returns {string} - The CSS styles as a string.
 */
function generateStyles(): string {
  return `
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 20px;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }
    th {
      background-color: #f4f4f4;
      font-weight: bold;
      color: #333;
    }
    .even-row {
      background-color: #f9f9f9;
    }
    .odd-row {
      background-color: #fff;
    }
    tr:hover {
      background-color: #f1f1f1;
    }
  `;
}

/**
 * Generates the HTML structure for the findings table.
 *
 * @param {string} tableRows - The HTML string for table rows.
 * @returns {string} - The HTML structure as a string.
 */
function generateStructure(tableRows: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Findings Report</title>
      <style>${generateStyles()}</style>
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

/**
 * Generates an HTML report from the given findings.
 *
 * @param {Finding[]} findings - The array of findings.
 * @returns {string} - The generated HTML report as a string.
 */
export function generateHtmlReport(findings: Finding[]): string {
  const mergedFindings = mergeFindings(findings);
  const sortedFindings = sortFindingsByRisk(mergedFindings);
  const tableRows = generateTableRows(sortedFindings);

  return generateStructure(tableRows);
}
