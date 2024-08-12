import re
from datetime import datetime
from parsers.base_parser import BaseParser


class ConsensysParser(BaseParser):

    def __init__(self, url: str):
        super().__init__(url)

    def get_vulnerabilities(self) -> list:
        vulnerabilities = []
        for finding in self.soup.find_all("div", class_="issue"):
            title = self._extract_title(finding)
            vulnerabilities.append(title)
        return vulnerabilities

    def _extract_title(self, finding) -> str:
        h3_tag = finding.find("h3")
        classes_to_exclude = ["severity", "state"]
        for span in h3_tag.find_all("span"):
            if any(cls in span.get("class", []) for cls in classes_to_exclude):
                span.extract()
        return self._remove_section_numbers(h3_tag.get_text().rstrip())

    def _remove_section_numbers(self, title: str) -> str:
        return re.sub(r"^\d+\.\d+\s+", "", title)

    def get_date(self) -> datetime:
        publish_date = self.soup.find("meta", itemprop="datePublished")
        if not publish_date:
            raise Exception("No report date found")
        return datetime.fromisoformat(publish_date["content"])
