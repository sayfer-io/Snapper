import requests
import fitz  # PyMuPDF
import tldextract

from io import BytesIO
from bs4 import BeautifulSoup

from abc import ABC, abstractmethod
from datetime import datetime


class BaseParser(ABC):

    def __init__(self, url: str, body_type: str):
        self.url = url
        if body_type == "html":
            self.soup = self._fetch_and_parse_html(url)
            if not self.soup:
                raise Exception("Soup object is not initialized")
        elif body_type == "pdf":
            self.body = self._fetch_and_parse_pdf(url)
            if not self.body:
                raise Exception("Soup object is not initialized")
        else:
            raise Exception("Unsupported body type")

    def _fetch_and_parse_pdf(self, url):
        try:
            extracted = tldextract.extract(url)
            if extracted.domain == "google" and extracted.subdomain == "drive":
                url = self._get_drive_pdf_url(url)
                print(url)
            elif extracted.domain == "github" and "/files/" not in url:
                url = self._get_github_pdf_url(url)
                print(url)

            # Fetch the PDF content from the URL
            response = requests.get(
                url,
                headers={
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
                },
            )
            response.raise_for_status()  # Raise an exception for HTTP errors

            # Use BytesIO to handle the PDF content in memory
            pdf_content = BytesIO(response.content)

            # Open the PDF document using PyMuPDF
            pdf_document = fitz.open(stream=pdf_content, filetype="pdf")
            return pdf_document

        except requests.RequestException as e:
            raise Exception(f"Failed to fetch PDF: {e}")

    def _get_drive_pdf_url(self, drive_url):
        file_id = drive_url.split("/d/")[1].split("/")[0]
        return f"https://drive.google.com/uc?export=download&id={file_id}"

    def _get_github_pdf_url(self, github_url):
        return github_url.replace("github.com", "raw.githubusercontent.com").replace(
            "/blob/", "/"
        )

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
