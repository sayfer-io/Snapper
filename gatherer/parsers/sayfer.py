from datetime import datetime

from parsers.base_parser import BaseParser


class SayferParser(BaseParser):

    def __init__(self, url: str):
        super().__init__(url)

    def _get_findings_table(self):
        report_sections = self.soup.find_all(
            name="div",
            class_=" ".join(
                [
                    "wcl-content-section",
                    "wcl-audit-section",
                    "wcl-audit-toc-section",
                    "wcl-section",
                ]
            ),
        )
        if not report_sections:
            raise Exception("No report structure table found")
        for section in report_sections:
            if section.find("h2").text == "Security Assessment Findings":
                return section
        raise Exception("No findings table found")

    def get_vulnerabilities(self) -> list:
        vulnerabilities = []
        findings_table = self._get_findings_table()
        # TODO: need to capture more than just title
        for vulnerability in findings_table.find_all("h3"):
            vulnerabilities.append(vulnerability.text)
        return vulnerabilities

    def get_date(self) -> datetime:
        modified_date = self.soup.find("meta", property="article:modified_time")
        if not modified_date:
            raise Exception("No report date found")
        return datetime.fromisoformat(modified_date["content"])
