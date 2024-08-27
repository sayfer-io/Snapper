import json
import logging
import argparse
import requests
import importlib

from datetime import datetime
from collections import defaultdict

# Set up logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

URL = "https://raw.githubusercontent.com/MetaMask/snaps-registry/main/src/registry.json"

parsers = {
    "sayfer": "parsers.sayfer.SayferParser",
    "consensysdiligence": "parsers.consensys.ConsensysParser",
    "cure53": "parsers.cure53.Cure53Parser",
    "leastauthority": "parsers.leastauthority.LeastAuthorityParser",
    "veridise": "parsers.veridise.VeridiseParser",
    "halborn": "parsers.halborn.HalbornParser",
}


def fetch_data(url):
    """
    Fetches JSON data from the given URL.

    Args:
        url (str): The URL to fetch data from.

    Returns:
        dict: The JSON data fetched from the URL, or None if an error occurred.
    """
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        logger.error(f"Error fetching data: {e}")
        return None


def dynamic_import(class_path):
    """
    Dynamically imports a class from a given module path.

    Args:
        class_path (str): The full path of the class to import.

    Returns:
        type: The imported class.
    """
    module_path, class_name = class_path.rsplit(".", 1)
    module = importlib.import_module(module_path)
    return getattr(module, class_name)


def get_parser_instance(provider, report_url):
    """
    Gets the parser instance for the given provider.

    Args:
        provider (str): The provider name.
        report_url (str): The URL of the audit report.

    Returns:
        object: The parser instance, or None if an error occurred.
    """
    try:
        parser_class_path = parsers[provider]
        ParserClass = dynamic_import(parser_class_path)
        return ParserClass(url=report_url)
    except Exception as e:
        logger.error(f"Error creating parser instance for {provider}: {e}")
        return None


def is_within_date_range(report_date, start_date, end_date):
    """
    Checks if the report date is within the specified date range.

    Args:
        report_date (datetime): The date of the report.
        start_date (datetime): The start date for filtering.
        end_date (datetime): The end date for filtering.

    Returns:
        bool: True if the report date is within the range, False otherwise.
    """
    return (not start_date or report_date >= start_date) and (
        not end_date or report_date <= end_date
    )


def process_audit(auditor, report_url, start_date, end_date):
    """
    Process the audit report from the given auditor.

    Args:
        auditor (str): The auditor name.
        report_url (str): The URL of the audit report.
        start_date (datetime): The start date for filtering audits.
        end_date (datetime): The end date for filtering audits.

    Returns:
        list: The findings collected from the audit.
    """
    logger.info(f"Processing provider: {auditor}")
    logger.info(f"Report URL: {report_url}")

    provider = auditor.lower().replace(" ", "")

    if provider not in parsers:
        logger.error(f"No parser found for {auditor} ~ {provider} - {report_url}")
        return

    parser_instance = get_parser_instance(provider, report_url)

    if parser_instance is None:
        logger.error(f"Failed to create parser instance for {provider}")
        return

    try:
        report_date = parser_instance.get_date()
    except ValueError as e:
        logger.error(f"Error getting date for {provider}: {e}")
        return

    if not is_within_date_range(report_date, start_date, end_date):
        logger.info(f"Skipping as the report date is not within the specified range")
        return

    vulnerabilities = list(set(parser_instance.get_vulnerabilities()))
    logger.info(f"Vulnerabilities: ({len(vulnerabilities)}) {vulnerabilities}")
    findings = []
    for vulnerability in vulnerabilities:
        findings.append(
            {
                "provider": provider,
                "date": report_date,
                "report": report_url,
                "vulnerability": vulnerability,
            }
        )
    return findings


def parse_audits(verified_snaps, start_date, end_date):
    """
    Parses the audits from the verified snaps and collects findings.

    Args:
        verified_snaps (dict): The verified snaps data.
        start_date (datetime): The start date for filtering audits.
        end_date (datetime): The end date for filtering audits.

    Returns:
        dict: The findings collected from the audits.
    """
    findings = defaultdict(list)
    for name, details in verified_snaps.items():
        audits = details["metadata"].get("audits", [])
        for audit in audits:
            auditor = audit.get("auditor")
            report_url = audit.get("report")
            audit_findings = process_audit(auditor, report_url, start_date, end_date)
            if audit_findings:
                findings[name].extend(audit_findings)
    return findings


def main():
    """
    Main function to scrape, parse, and transform data.
    """
    parser = argparse.ArgumentParser(description="Scrape, Parse, and Transform")
    parser.add_argument(
        "--start_date", help="Start date in format YYYY-MM-DD", type=str, required=False
    )
    parser.add_argument(
        "--end_date", help="End date in format YYYY-MM-DD", type=str, required=False
    )
    parser.add_argument("--verbose", help="Enable verbose logging", action="store_true")
    args = parser.parse_args()

    if args.verbose:
        logger.setLevel(logging.DEBUG)

    start_date = (
        datetime.strptime(args.start_date, "%Y-%m-%d") if args.start_date else None
    )
    end_date = datetime.strptime(args.end_date, "%Y-%m-%d") if args.end_date else None

    logger.info("[*] Downloading registry data")
    snap_registry = fetch_data(URL)
    if not snap_registry:
        logger.error("Failed to fetch registry data.")
        return

    verified_snaps = snap_registry.get("verifiedSnaps", {})
    logger.info("[*] Parsing verified snaps")
    findings = parse_audits(verified_snaps, start_date, end_date)

    with open("findings.json", "w") as f:
        json.dump(findings, f, indent=4, default=str, sort_keys=True)


if __name__ == "__main__":
    main()
