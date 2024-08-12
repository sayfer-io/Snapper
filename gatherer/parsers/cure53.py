import re

from datetime import datetime

from parsers.base_parser import BaseParser


class Cure53Parser(BaseParser):

    def __init__(self, url: str):
        super().__init__(url, body_type="pdf")

    def get_vulnerabilities(self) -> list:
        vulnerabilities = []
        found_vulnerabilities_section = False
        for entry in self.body.get_toc():
            level, title, page = entry

            if title == "Identified Vulnerabilities":
                found_vulnerabilities_section = True
            elif found_vulnerabilities_section:
                if level == 3:
                    vulnerabilities.append(self._remove_section_numbers(title))
                else:
                    break

        return vulnerabilities

    def _remove_section_numbers(self, title: str) -> str:
        # Remove "SPF-X-X WP2:" part where "SPF" and "WP2" can be any alphanumeric identifiers
        title = re.sub(r"^\w+-\d+-\d+ \w+:\s*", "", title)
        # Remove severity level in parentheses
        title = re.sub(r"\s*\(.*?\)", "", title)
        return title

    def get_date(self) -> datetime:
        # Load the first page
        first_page = self.body.load_page(0)
        text = first_page.get_text("text")

        # Regular expressions to find the date in the formats "MM/DD/YY" and "Month DD, YY"
        match1 = re.search(r"\b\d{2}/\d{2}/\d{2}\b", text)
        match2 = re.search(r"\b\w{3,9} \d{1,2}, \d{2}\b", text)

        if match1:
            date_str = match1.group(0)
            return datetime.strptime(date_str, "%m/%d/%y")
        elif match2:
            date_str = match2.group(0)
            return datetime.strptime(date_str, "%b %d, %y")
        else:
            raise ValueError("Date not found in the footer of the first page")
