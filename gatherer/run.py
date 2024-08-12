import json
import argparse
import requests
import importlib

from datetime import datetime, timedelta

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
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching data: {e}")
        return None


def dynamic_import(class_path):
    module_path, class_name = class_path.rsplit(".", 1)
    module = importlib.import_module(module_path)
    return getattr(module, class_name)


def main():
    parser = argparse.ArgumentParser(description="Scrape, Parse, and Transform")
    parser.add_argument(
        "--start_date",
        help="Start date in format YYYY-MM-DD",
        type=str,
        required=False,
    )
    parser.add_argument(
        "--end_date",
        help="End date in format YYYY-MM-DD",
        type=str,
        required=False,
    )
    args = parser.parse_args()

    if args.start_date != None:
        args.start_date = datetime.strptime(args.start_date, "%Y-%m-%d")

    if args.end_date != None:
        args.end_date = datetime.strptime(args.end_date, "%Y-%m-%d")

    print("[*] Downloading registry data")
    snap_registry = fetch_data(URL)
    verified_snaps = snap_registry["verifiedSnaps"]

    print("[*] Parsing verified snaps")
    findings = dict()
    for name, details in verified_snaps.items():
        audits = details["metadata"].get("audits", [])
        for audit in audits:
            provider = audit["auditor"].lower().replace(" ", "")
            print(provider)
            print(audit["report"])
            try:
                if provider in parsers:
                    parser_class_path = parsers[provider]
                    ParserClass = dynamic_import(parser_class_path)
                    parser_instance = ParserClass(url=audit["report"])

                    report_date = parser_instance.get_date()

                    if args.start_date != None and report_date < args.start_date:
                        print(
                            "Skipping",
                            audit["report"],
                            "as it is older than the start date",
                        )
                        continue

                    if args.end_date != None and report_date > args.end_date:
                        print(
                            "Skipping",
                            audit["report"],
                            "as it is newer than the end date",
                        )
                        continue

                    vulnerabilities = list(set(parser_instance.get_vulnerabilities()))
                    print(f"[*]  {provider} - {audit['report']} - {report_date}")
                    print(vulnerabilities)
                    for vulnerability in vulnerabilities:
                        if vulnerability not in findings:
                            findings[vulnerability] = []
                        findings[vulnerability].append(
                            {
                                "snap": name,
                                "provider": provider,
                                "date": report_date,
                                "report": audit["report"],
                            }
                        )
                else:
                    print(
                        f"No parser found for {audit['auditor']} ~ {provider} - {audit['report']}"
                    )
                    continue
            except Exception as e:
                print(f"Error parsing {audit['report']}: {e}")
                continue

    with open("findings.json", "w") as f:
        json.dump(findings, f, indent=4, default=str, sort_keys=True)


if __name__ == "__main__":
    main()
