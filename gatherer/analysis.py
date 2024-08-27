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
    # category: str
    # subcategory: str


data = []

for snap_name in findings_automated:
    for finding in findings_automated[snap_name]:
        finding_instance = Finding(
            title=finding["vulnerability"],
            date=finding.get("date", "TODO"),
            snap=snap_name,
            report_url=finding.get("report", "TODO"),
            code_url=finding.get("code_url", "TODO"),
            auditor=finding.get("provider", "TODO"),
            # category=category,
            # subcategory=subcategory,
        )
        data.append(finding_instance)
