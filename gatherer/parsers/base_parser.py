import requests
from bs4 import BeautifulSoup

from abc import ABC, abstractmethod
from datetime import datetime


class BaseParser(ABC):

    def __init__(self, url: str):
        self.url = url
        self.soup = self._fetch_and_parse_html(url)

    def _fetch_and_parse_html(self, url):
        try:
            # Fetch the HTML content from the URL
            response = requests.get(url)
            response.raise_for_status()  # Raise an exception for HTTP errors

            # Parse the HTML content using Beautiful Soup
            soup = BeautifulSoup(response.content, "html.parser")

            if not soup:
                raise Exception("Failed to parse HTML content")

            return soup
        except requests.RequestException as e:
            print(f"Error fetching URL: {e}")
            return None

    @abstractmethod
    def get_vulnerabilities(self) -> list:
        raise NotImplementedError

    @abstractmethod
    def get_date(self) -> datetime:
        raise NotImplementedError
