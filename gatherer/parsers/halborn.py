import re

from datetime import datetime

from parsers.base_parser import BaseParser


class HalbornParser(BaseParser):

    def __init__(self, url: str):
        super().__init__(url, body_type="pdf")

    def get_vulnerabilities(self) -> list:
        vulnerabilities = []

        # Extract text from all pages
        text = ""
        for page_num in range(len(self.body)):
            page = self.body.load_page(page_num)
            text += page.get_text()

        # Find all sections starting with "(HAL-\d\d) "
        # 3.1 (HAL-01) POTENTIAL SAVE OF ARBITRARY CREDENTIALS - MEDIUM
        issue_pattern = re.compile(r"\d+\.\d+\s\(HAL-\d+\)\s.*\s-\s[A-Z]+")
        matches = issue_pattern.findall(text)

        for match in matches:
            vulnerabilities.append(self._remove_section_numbers(match))
        return vulnerabilities

    def _remove_section_numbers(self, title: str) -> str:
        # Remove section numbers and indicators
        title = re.sub(r"^\d+\.\d+\s\(HAL-\d+\)\s", "", title)
        # Remove severity
        title = re.sub(r"\s-\s[A-Z]+$", "", title)
        # Replace newlines with spaces
        title = title.replace("\n", " ")
        # Convert to camel case
        return " ".join(word.capitalize() for word in title.split())

    def get_date(self) -> datetime:
        return datetime.now()
