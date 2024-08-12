import re

from datetime import datetime

from parsers.base_parser import BaseParser


class VeridiseParser(BaseParser):

    def __init__(self, url: str):
        super().__init__(url, body_type="pdf")

    def get_vulnerabilities(self) -> list:
        vulnerabilities = []
        found_vulnerabilities_section = False
        for entry in self.body.get_toc():
            level, title, page = entry

            if title == "Detailed Description of Issues":
                found_vulnerabilities_section = True
            elif found_vulnerabilities_section:
                if re.match(r"V-\w+-VUL-\d+: ", title):
                    vulnerabilities.append(self._remove_section_numbers(title))

        return vulnerabilities

    def _remove_section_numbers(self, title: str) -> str:
        return re.sub(r"V-\w+-VUL-\d+: ", "", title)

    def get_date(self) -> datetime:
        return datetime.now()
