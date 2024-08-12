import re

from datetime import datetime

from parsers.base_parser import BaseParser


class SayferParser(BaseParser):

    def __init__(self, url: str):
        if url.endswith(".pdf"):
            super().__init__(url, body_type="pdf")
        else:
            super().__init__(url, body_type="html")

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
        if self.url.endswith(".pdf"):
            return self.get_vulnerabilities_pdf()
        else:
            return self.get_vulnerabilities_html()

    def get_vulnerabilities_pdf(self) -> list:
        raise NotImplementedError

    def get_vulnerabilities_html(self) -> list:
        vulnerabilities = []
        findings_table = self._get_findings_table()
        # TODO: need to capture more than just title
        for vulnerability in findings_table.find_all("h3"):
            vulnerabilities.append(self._remove_risk_letter(vulnerability.text))
        return vulnerabilities

    def get_date(self) -> datetime:
        if self.url.endswith(".pdf"):
            return self.get_date_pdf()
        else:
            return self.get_date_html()

    def get_date_pdf(self) -> datetime:
        raise NotImplementedError

    def get_date_html(self) -> datetime:
        modified_date = self.soup.find("meta", property="article:modified_time")
        if not modified_date:
            raise Exception("No report date found")
        return datetime.fromisoformat(modified_date["content"])

    def _remove_risk_letter(self, title: str) -> str:
        return re.sub(r"^\[.*?\]\s*", "", title)
