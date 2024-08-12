import argparse
import requests
import importlib
import tldextract

from datetime import datetime, timedelta

URL = "https://raw.githubusercontent.com/MetaMask/snaps-registry/main/src/registry.json"


parsers = {
    "sayfer": "parsers.sayfer.SayferParser",
    "consensys": "parsers.consensys.ConsensysParser",
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
    for name, details in verified_snaps.items():
        audits = details["metadata"].get("audits", [])
        for audit in audits:
            provider = tldextract.extract(audit["report"]).domain
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

                vulnerabilities = parser_instance.get_vulnerabilities()
                print(f"[*] {name} - {provider} - {report_date}")
                print(vulnerabilities)
            else:
                print(f"No parser found for {provider} - {audit['report']}")
                continue


if __name__ == "__main__":
    main()

    # from parsers.consensys import ConsensysParser

    # s = ConsensysParser(
    #     "https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/"
    # )
    # print(s.get_date())
    # print(s.get_vulnerabilities())
