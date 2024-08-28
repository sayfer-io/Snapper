import json

from dataclasses import dataclass


with open("findings_automated.json", "r") as f:
    findings_automated = json.load(f)

with open("findings_manual.json", "r") as f:
    findings_manual = json.load(f)


@dataclass
class Finding:
    title: str
    date: str
    snap: str
    report_url: str
    code_url: str
    auditor: str
    severity: str
    # category: str
    # subcategory: str


data = []

for snap_name in findings_automated:
    for finding in findings_automated[snap_name]:
        finding_instance = Finding(
            title=(
                finding["vulnerability"]
                if isinstance(finding["vulnerability"], str)
                else finding["vulnerability"]["title"]
            ),
            severity=(
                finding["vulnerability"]["severity"]
                if isinstance(finding["vulnerability"], dict)
                else "TODO"
            ),
            date=finding.get("date", "TODO"),
            snap=snap_name,
            report_url=finding.get("report", "TODO"),
            code_url=finding.get("code_url", "TODO"),
            auditor=finding.get("provider", "TODO"),
            # category=category,
            # subcategory=subcategory,
        )
        data.append(finding_instance)

for report_url in findings_manual:
    report_details = findings_manual[report_url]
    for vulnerability in report_details.get("vulnerabilities", []):
        finding_instance = Finding(
            title=vulnerability,
            severity="TODO",
            date=report_details.get("date", "TODO"),
            snap=report_details.get("snap", "TODO"),
            report_url=report_url,
            code_url=report_details.get("code_url", "TODO"),
            auditor=report_details.get("provider", "TODO"),
            # category=category,
            # subcategory=subcategory,
        )
        data.append(finding_instance)

with open("findings_combined.json", "w") as f:
    json.dump(data, f, default=lambda x: x.__dict__, indent=2)
