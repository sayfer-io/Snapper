import re

from datetime import datetime

from parsers.base_parser import BaseParser


class LeastAuthorityParser(BaseParser):

    def __init__(self, url: str):
        super().__init__(url, body_type="pdf")

    def get_vulnerabilities(self) -> list:
        vulnerabilities = []

        # Extract text from all pages
        text = ""
        for page_num in range(len(self.body)):
            page = self.body.load_page(page_num)
            text += page.get_text()

        # Find all sections starting with "Issue "
        issue_pattern = re.compile(r"Issue \w+: .*")
        matches = issue_pattern.findall(text)

        for match in matches:
            vulnerabilities.append(self._remove_section_numbers(match))

        return vulnerabilities

    def _remove_section_numbers(self, title: str) -> str:
        return re.sub(r"Issue \w+: ", "", title)

    def get_date(self) -> datetime:
        # Extract text from the first page
        first_page = self.body.load_page(0)
        first_page_text = first_page.get_text()

        # Find the date in the format "13 February 2024"
        date_pattern = re.compile(r"\d{1,2} \w+ \d{4}")
        date_match = date_pattern.search(first_page_text)

        if date_match:
            date_str = date_match.group(0)
            return datetime.strptime(date_str, "%d %B %Y")
        else:
            return datetime.now()  # Fallback if date not found
