# Checlist of Metamask Findings

Listed below are all the findings from previous snap audit reports grouped into several categories.

## Table of Contents

- [Injection Flaws](#injection-flaws)
- [Authentication Flaws](#authentication-flaws)
- [Sensitive Data Exposure](#sensitive-data-exposure)
- [Access Control Flaws](#access-control-flaws)
- [Use of Deprecated or Insecure Software Libraries](#use-of-deprecated-or-insecure-software-libraries)
- [Insufficient Logging and Monitoring](#insufficient-logging-and-monitoring)
- [Security Misconfiguration](#security-misconfiguration)
- [Weak Cryptography](#weak-cryptography)
- [User Interface and Usability Flaws](#user-interface-and-usability-flaws)
- [Configuration and Permission Flaws](#configuration-and-permission-flaws)
- [Insecure or Unsafe Dependency Management](#insecure-or-unsafe-dependency-management)
- [Poor Coding Practices](#poor-coding-practices)
- [Improper Input Validation](#improper-input-validation)
- [Inadequate Documentation and Comments](#inadequate-documentation-and-comments)
- [Misleading or Inconsistent Information](#misleading-or-inconsistent-information)
- [Lack of Testing and Quality Assurance](#lack-of-testing-and-quality-assurance)
- [Inadequate Security Measures](#inadequate-security-measures)
- [UI and UX Flaws](#ui-and-ux-flaws)
- [Error Handling Issues](#error-handling-issues)
- [Uncategorized](#uncategorized)

## Injection Flaws

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Rpc Starknet_sendtransaction - The User Displayed Message Generated With Getsigningtxntext() Is Prone To Markdown/control Chars Injection From Contractcalldata | 28/06/2023 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensys Diligence | TODO | - |
| Rpc Starknet_signmessage - Inconsistency When Previewing The Signed Message (markdown Injection) | 28/06/2023 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensys Diligence | TODO | - |
| Markdown Injection In Snaps Ui Components | 15/12/2023 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensys Diligence | TODO | - |
| Makeavatarsvgcustom - Potential Svg Html Injection, React Innerhtml | 13/03/2024 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensys Diligence | TODO | - |
| Ctrlchar/markdown Injection | 13/03/2024 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensys Diligence | TODO | - |
| Lax Input Validation, Control Char, Uri, And Markdown Injection | 03/07/2023 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensys Diligence | TODO | - |
| Potential Url Query Injection When Building Link For Full Audit | 27/08/2024 | npm:@quickintel/quickintel-snap | https://github.com/Quick-Intel/quickintel-snap/blob/main/VAR_quickintel_snap.pdf | TODO | Veridise | TODO | - |
| Control Character And Markdown Injection In Snap_dialog | 24/07/2023 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensys Diligence | TODO | - |
| Ctrlchar/markdown Injection In Rendersigntransaction, Rendersignalltransactions | 21/08/2023 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensys Diligence | TODO | - |
| Potential Markdown Injection In Snap_notify | 09/04/2024 | npm:@tezoroproject/snap | https://consensys.io/diligence/audits/2024/04/tezoro-snap/ | TODO | Consensys Diligence | TODO | - |
| Markdown And Control Character Injection | 14/08/2023 | npm:filsnap | https://consensys.io/diligence/audits/2023/08/metamask/partner-snaps-filsnap/ | TODO | Consensys Diligence | TODO | - |
| Potential URL query injection when building link for full audit | 10/10/2023 | npm:@quickintel/quickintel-snap | https://raw.githubusercontent.com/Quick-Intel/quickintel-snap/main/VAR_quickintel_snap.pdf | TODO | Quick intel | Low | - |

## Authentication Flaws

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Protected_handleidentitylogin - Unchecked Withidentityid | 13/03/2024 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensys Diligence | TODO | - |
| Broken Authorization Scheme | 15/12/2023 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensys Diligence | TODO | - |
| Rpc Starknet_adderc20token - Should Ask For User Confirmation | 28/06/2023 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensys Diligence | TODO | - |
| Potential Save Of Arbitrary Credentials | 27/08/2024 | npm:@rarimo/rarime | https://github.com/rarimo/rarime/blob/main/audits/halborn_2023-08-28.pdf | TODO | Halborn | Critical | - |
| Deletetoken Should Prompt User For Its Consent | 09/04/2024 | npm:@tezoroproject/snap | https://consensys.io/diligence/audits/2024/04/tezoro-snap/ | TODO | Consensys Diligence | TODO | - |
| Cronjob Checktokens Might Flood User Notifications | 09/04/2024 | npm:@tezoroproject/snap | https://consensys.io/diligence/audits/2024/04/tezoro-snap/ | TODO | Consensys Diligence | TODO | - |
| Cronjob Checktokens Return Value Is Not Necessary | 09/04/2024 | npm:@tezoroproject/snap | https://consensys.io/diligence/audits/2024/04/tezoro-snap/ | TODO | Consensys Diligence | TODO | - |
| Inaccurate Return Value In Checktokens() | 09/04/2024 | npm:@tezoroproject/snap | https://consensys.io/diligence/audits/2024/04/tezoro-snap/ | TODO | Consensys Diligence | TODO | - |
| Missing Domain Separation For Session Identifier | 13/02/2024 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Least Authority | TODO | - |
| Arbitrary Dapp Can Retrieve Access Token | 12/07/2023 | npm:walletchat-metamask-snap | https://drive.google.com/file/d/1pNhN43mMOLiA2jWUF5IbJA-5kmfAod1f/view?usp=drive_link | TODO | Cure53 | Critical | - |
| Arbitrary DApp can retrieve access token | 07/12/2023 | npm:walletchat-metamask-snap | https://drive.google.com/uc?export=download&id=1pNhN43mMOLiA2jWUF5IbJA-5kmfAod1f | TODO | Cure53 | Critical | - |
| Arbitrary DApp can retrieve access token | 12/07/2023 | npm:walletchat-metamask-snap | https://drive.google.com/uc?export=download&id=1dixJw4G4ekcO40GpbH7VmizLTINS5gUL | TODO | Cure53 | Critical | - |
| POTENTIAL SAVE OF ARBITRARY CREDENTIALS | 28/08/2023 | npm:@rarimo/rarime | https://raw.githubusercontent.com/rarimo/rarime/main/audits/halborn_2023-08-28.pdf | TODO | Halborn | Critical | - |
| tokenToString is Used Before Defined | 13/08/2023 | npm:@leapwallet/metamask-cosmos-snap | https://github.com/MetaMask/snaps-registry/files/12544468/Sayfer.-.2023-08.Penetration.Testing.Report.for.LeapWallet.Snap.-.Updated.pdf | TODO | Sayfer | Informational | - |

## Sensitive Data Exposure

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Backup Flow Exports Private Keys As Plaintext | 18/01/2024 | npm:@safeheron/mpcsnap | https://cure53.de/pentest-report_safeheron-snap.pdf | https://github.com/Safeheron/multi-mpc-snap-monorepo/commit/80c59cc48c0e7c003e80c5d30a6895aa6d5d2eba | Cure53 | Critical | - |
| Getkeysfromaddress - Possible Unchecked Null Dereference When Looking Up Private Key | 28/06/2023 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensys Diligence | Critical | - |
| Private Key Logged In The Console | 18/01/2024 | npm:@safeheron/mpcsnap | https://cure53.de/pentest-report_safeheron-snap.pdf | https://github.com/Safeheron/multi-mpc-snap-monorepo/commit/80c59cc48c0e7c003e80c5d30a6895aa6d5d2eba | Cure53 | Critical | - |
| Shapeshift Manages Metamasks Ethereum Private Keys | 24/07/2023 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensys Diligence | Critical | - |
| Seed Phrase Leakage In Mobile Application Memory | 07/09/2023 | npm:@silencelaboratories/silent-shard-snap | https://cure53.de/pentest-report_silencelabs-apps.pdf | TODO | Cure53 | TODO | - |
| Seed Phrase Leakage Via Dynamic Instrumentation | 07/09/2023 | npm:@silencelaboratories/silent-shard-snap | https://cure53.de/pentest-report_silencelabs-apps.pdf | TODO | Cure53 | TODO | - |
| Non-uniform Private Key Generation | 13/02/2024 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Least Authority | Critical | - |
| Unnecessary Distribution Of Private Key Information | 14/08/2023 | npm:filsnap | https://consensys.io/diligence/audits/2023/08/metamask/partner-snaps-filsnap/ | TODO | Consensys Diligence | Critical | - |
| Directly Exposed Private Key Export | 14/08/2023 | npm:filsnap | https://consensys.io/diligence/audits/2023/08/metamask/partner-snaps-filsnap/ | TODO | Consensys Diligence | Critical | - |

## Access Control Flaws

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Security Groups And Security Group Rules Are Both Used For Traffic Access Control | 13/02/2024 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Least Authority | TODO | - |
| Missing Check In Feldman’s Secret Sharing Allows For Threshold Escalation [known | 05/02/2024 | npm:@safeheron/mpcsnap | https://leastauthority.com/wp-content/uploads/2024/02/Safeheron_Crypto_Suites__Multiparty_ECDSA_Updated_Final_Audit_Report_Least_Authority.pdf | TODO | Least Authority | Low | - |

## Use of Deprecated or Insecure Software Libraries

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Signdata() Will Soon Be Deprecated | 02/10/2023 | npm:@kunalabs-io/sui-metamask-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-kunalabs/ | TODO | Sayfer | Low | - |
| Usage Of Vulnerable Packages | 13/09/2023 | npm:@pianity/arsnap | https://sayfer.io/audits/pianity-snap | TODO | Sayfer | Medium | - |
| Usage Of Deprecated Functions | 13/09/2023 | npm:@pianity/arsnap | https://sayfer.io/audits/pianity-snap | TODO | Sayfer | Low | - |
| Use Of Deprecated Metamask Permissions In Snaps | 18/01/2024 | npm:@safeheron/mpcsnap | https://cure53.de/pentest-report_safeheron-snap.pdf | https://github.com/Safeheron/multi-mpc-snap-monorepo/commit/80c59cc48c0e7c003e80c5d30a6895aa6d5d2eba | Cure53 | Low | - |
| Dependency With Outstanding Vulnerability | 12/12/2023 | npm:azero-wallet | https://sayfer.io/audits/metamask-snap-audit-report-for-alephzero/ | TODO | Sayfer | TODO | - |
| Floating Dependency Versions | 09/07/2024 | npm:@harbour-fi/ramp-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-harbour/ | TODO | Sayfer | TODO | - |
| Floating Dependency Versions | 15/05/2024 | npm:@nufi/cardano-metamask-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-nufi/ | TODO | Sayfer | TODO | - |
| Usage Of Unmaintained Cryptographic Library | 13/02/2024 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Least Authority | TODO | - |
| Incorrect Dependency Version | 18/04/2024 | npm:@xtreamly/xtreamly_slippage_predictor | https://sayfer.io/audits/metamask-snap-audit-report-for-xtreamly/ | TODO | Sayfer | TODO | - |

## Insufficient Logging and Monitoring

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Wallet Monitoring Improvements | 17/07/2023 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensys Diligence | TODO | - |

## Security Misconfiguration

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Enablepolkadotsnap Returns An Error When Using The Default Networkname | 17/09/2023 | npm:@chainsafe/polkadot-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-polkadot/ | TODO | Sayfer | TODO | - |
| formatAllowanceOption Function is Missing a Default Case | 13/08/2023 | npm:@leapwallet/metamask-cosmos-snap | https://github.com/MetaMask/snaps-registry/files/12544468/Sayfer.-.2023-08.Penetration.Testing.Report.for.LeapWallet.Snap.-.Updated.pdf | TODO | Sayfer | Low | - |

## Weak Cryptography

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Instance Of Outdated Cryptography | 24/02/2024 | npm:@gobob/bob-snap | https://github.com/bob-collective/bob-snap/blob/master/docs/audit.pdf | TODO | Cure53 | TODO | - |
| Length Field In Csafehash256/512::write Can Overflow | 05/02/2024 | npm:@safeheron/mpcsnap | https://leastauthority.com/wp-content/uploads/2024/02/Safeheron_Crypto_Suites__Multiparty_ECDSA_Updated_Final_Audit_Report_Least_Authority.pdf | TODO | Least Authority | Low | - |
| Instance of outdated cryptography | 24/02/2024 | npm:@gobob/bob-snap | https://raw.githubusercontent.com/bob-collective/bob-snap/master/docs/audit.pdf | TODO | Cure53 | Low | - |

## User Interface and Usability Flaws

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| No User Confirmation Dialog In Gdrive Configuration | 04/08/2023 | npm:@tuum-tech/identify | https://github.com/tuum-tech/identify/blob/main/SNAP_AUDIT_REPORT_BY_CURE53.pdf | TODO | Cure53 | TODO | - |
| Uninformative Confirmation Popup | 08/12/2023 | npm:@amax/amaxsnap | https://sayfer.io/audits/metamask-snap-audit-report-for-amax/ | TODO | Sayfer | TODO | - |
| No Warning On Signing Arbitrary Data | 15/05/2024 | npm:@nufi/cardano-metamask-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-nufi/ | TODO | Sayfer | Critical | - |
| No Warning When Signing Arbitrary Data | 26/02/2024 | npm:@polkagate/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-polkagate-snap/ | TODO | Sayfer | Critical | - |

## Configuration and Permission Flaws

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Fil_configure Allows Anyone To Change The Snap’s Configuration | 14/08/2023 | npm:filsnap | https://consensys.io/diligence/audits/2023/08/metamask/partner-snaps-filsnap/ | TODO | Consensys Diligence | Low | - |

## Insecure or Unsafe Dependency Management

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Update And Replace Vulnerable Dependencies | 13/02/2024 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Least Authority | Medium | - |
| Vulnerable And Unused Dependencies Detected In The Codebase | 12/09/2023 | npm:@web3mq/snap | https://github.com/MetaMask/snaps-registry/files/12604989/Least_Authority_Generative_Labs_MetaMask_Snap_Updated_Final_Audit.pdf | TODO | Least Authority | Medium | - |
| Potentially Vulnerable Dependencies | 18/04/2024 | npm:@xtreamly/xtreamly_slippage_predictor | https://sayfer.io/audits/metamask-snap-audit-report-for-xtreamly/ | TODO | Sayfer | Medium | - |
| Dependencies With Known Vulnerabilities | 08/12/2023 | npm:@amax/amaxsnap | https://sayfer.io/audits/metamask-snap-audit-report-for-amax/ | TODO | Sayfer | TODO | - |
| DEPENDENCIES SHOULD BE PINNED TO EXACT VERSIONS | 20/06/2023 | npm:casper-manager | https://raw.githubusercontent.com/casper-ecosystem/casper-manager/main/audits/20_06_2023_Casper_Management_Snap_App_WebApp_Pentest_Report_Halborn_Final.pdf | TODO | Halborn | Low | - |
| DEPENDENCIES SHOULD BE PINNED TO EXACT VERSIONS | 28/08/2023 | npm:@rarimo/rarime | https://raw.githubusercontent.com/rarimo/rarime/main/audits/halborn_2023-08-28.pdf | TODO | Halborn | Low | - |

## Poor Coding Practices

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Unused Imports, Inconsistent Coding Style And Unsafe Patterns | 15/12/2023 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensys Diligence | Low | - |
| Improper Paramater Sanitization In Fetchallticketcommentscount(), Updateticket(), And Parseticketcomments() | 15/12/2023 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensys Diligence | TODO | - |
| If Statement Could Be Simplified | 07/11/2023 | npm:@astar-network/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-astar/ | TODO | Sayfer | TODO | - |

## Uncategorized

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Minor Typos | 01/02/2024 | npm:@fioprotocol/fio-wallet-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-fio/ | TODO | Sayfer | Low | - |
| Dead Code Popup | 03/07/2023 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensys Diligence | TODO | - |
| Typos | 13/02/2024 | npm:bch-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-fexcash/ | TODO | Sayfer | Low | - |
| Fetchallticketcommentscount() Is Unoptimized, Overly Complex, And Lacks Untrusted Input Validation | 15/12/2023 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensys Diligence | TODO | - |
| Missing Url Validation | 05/12/2023 | npm:@galactica-net/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-galactica/ | TODO | Sayfer | TODO | - |
| Lack Of Payload Validation In Snaps | 18/01/2024 | npm:@safeheron/mpcsnap | https://cure53.de/pentest-report_safeheron-snap.pdf | https://github.com/Safeheron/multi-mpc-snap-monorepo/commit/80c59cc48c0e7c003e80c5d30a6895aa6d5d2eba | Cure53 | TODO | - |
| Lack Of Validation In Uint8arrayfromhex(string) | 12/12/2023 | npm:azero-wallet | https://sayfer.io/audits/metamask-snap-audit-report-for-alephzero/ | TODO | Sayfer | TODO | - |
| Lack Of Inline Code Documentation | 15/12/2023 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensys Diligence | Low | - |
| Incomplete Natspec And General Documentation | 17/07/2023 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensys Diligence | Low | - |
| Type Checking Is Not Uniform | 08/12/2023 | npm:@amax/amaxsnap | https://sayfer.io/audits/metamask-snap-audit-report-for-amax/ | TODO | Sayfer | TODO | - |
| Dysfunctional Image Link | 07/11/2023 | npm:@astar-network/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-astar/ | TODO | Sayfer | TODO | - |
| Usage Of “magic Numbers” | 17/09/2023 | npm:@chainsafe/aleo-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-aleo/ | TODO | Sayfer | TODO | - |
| Rpc Urls Are Defined As Wsrpcurl While Using Http | 17/09/2023 | npm:@chainsafe/polkadot-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-polkadot/ | TODO | Sayfer | TODO | - |
| Non-working Demo | 17/09/2023 | npm:@chainsafe/polkadot-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-polkadot/ | TODO | Sayfer | TODO | - |
| No Confirmation Dialogue When Sending | 17/09/2023 | npm:@chainsafe/polkadot-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-polkadot/ | TODO | Sayfer | TODO | - |
| Conformations For Key Features Are Not Handled When Rejected | 17/09/2023 | npm:@chainsafe/polkadot-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-polkadot/ | TODO | Sayfer | TODO | - |
| Ui/hooks - Detectethereumprovider() Should Require Mustbemetamask | 28/06/2023 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensys Diligence | TODO | - |
| Ui/alertview - Unnecessary Use Of Dangerouslysetinnerhtml | 28/06/2023 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensys Diligence | TODO | - |
| Package.json - Invalid License | 28/06/2023 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensys Diligence | TODO | - |
| Rpc Starknet_addnetwork - Not Implemented, No User Confirmation | 28/06/2023 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensys Diligence | TODO | - |
| Rpc Starknet_extractprivatekey - Should Be Renamed To Starknet_displayprivatekey | 28/06/2023 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensys Diligence | TODO | - |
| Package.json - Dependecy Mixup | 28/06/2023 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensys Diligence | TODO | - |
| Disable Debug Log For Production Build | 28/06/2023 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensys Diligence | TODO | - |
| Rpc Starknet_signmessage - Fails To Display The User Account That Is Used For Signing The Message | 28/06/2023 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensys Diligence | TODO | - |
| Any Website Connected To The Snap Can Access The Address And Api Key And Impersonate The User | 15/12/2023 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensys Diligence | High | - |
| Missing Notifications In Case Multiple Tickets Are Updated | 15/12/2023 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensys Diligence | TODO | - |
| General Design And Performance Considerations: Data Fetching/caching And State Update | 15/12/2023 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensys Diligence | TODO | - |
| An Attacker Can Flood The Support By Creating Many Tickets For Arbitrary Addresses | 15/12/2023 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensys Diligence | Critical | - |
| Inconsistent Naming Conventions And Misleading Function/variable Names | 15/12/2023 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensys Diligence | TODO | - |
| Typo In Module Name | 01/02/2024 | npm:@fioprotocol/fio-wallet-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-fio/ | TODO | Sayfer | Low | - |
| Protected_handleaddassetaccount - Should Verify Name, Symbol Matches Assetid | 13/03/2024 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensys Diligence | TODO | - |
| Timestamp Logic Flaws In Snap’s Caching Mechanism | 13/03/2024 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensys Diligence | TODO | - |
| Unused Imports | 13/03/2024 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensys Diligence | Low | - |
| Protected (administrative Origin) Rpc Methods And Consent Management | 13/03/2024 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensys Diligence | TODO | - |
| Public Rpc Methods And Consent Management | 13/03/2024 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensys Diligence | TODO | - |
| Shared/hextobytes - Incorrect Hex String Handling | 13/03/2024 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensys Diligence | TODO | - |
| Keypairs Generated By Dapps Might Be Unrecoverable Which Could Result In Loss Of Funds | 13/03/2024 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensys Diligence | TODO | - |
| Entropy / Signature Handling & Hardening | 13/03/2024 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensys Diligence | TODO | - |
| Unused Functions | 05/12/2023 | npm:@galactica-net/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-galactica/ | TODO | Sayfer | Low | - |
| Non-functional Demo Samples | 05/12/2023 | npm:@galactica-net/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-galactica/ | TODO | Sayfer | TODO | - |
| Geterrormessage() Returns An Empty String | 02/10/2023 | npm:@kunalabs-io/sui-metamask-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-kunalabs/ | TODO | Sayfer | TODO | - |
| Low Log Limit | 13/09/2023 | npm:@pianity/arsnap | https://sayfer.io/audits/pianity-snap | TODO | Sayfer | Low | - |
| Todos In The Code | 13/09/2023 | npm:@pianity/arsnap | https://sayfer.io/audits/pianity-snap | TODO | Sayfer | TODO | - |
| Misleading Return Value | 13/09/2023 | npm:@pianity/arsnap | https://sayfer.io/audits/pianity-snap | TODO | Sayfer | TODO | - |
| Unhelpful Error Message | 13/09/2023 | npm:@pianity/arsnap | https://sayfer.io/audits/pianity-snap | TODO | Sayfer | TODO | - |
| Vault | 13/09/2023 | npm:@pianity/arsnap | https://sayfer.io/audits/pianity-snap | TODO | Sayfer | TODO | - |
| Arsnap/adapter | 13/09/2023 | npm:@pianity/arsnap | https://sayfer.io/audits/pianity-snap | TODO | Sayfer | TODO | - |
| Missing Summary Field In Createoperation | 13/09/2023 | npm:@pianity/arsnap | https://sayfer.io/audits/pianity-snap | TODO | Sayfer | TODO | - |
| Incomplete Unit Test Coverage | 26/02/2024 | npm:@polkagate/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-polkagate-snap/ | TODO | Sayfer | TODO | - |
| Fetchaddress - Inaccurate Function Name | 03/07/2023 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensys Diligence | TODO | - |
| Non-existent Base Config (eslint, Tsconfig) | 03/07/2023 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensys Diligence | TODO | - |
| Superfluous Permission Endowment:ethereum-provider | 03/07/2023 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensys Diligence | TODO | - |
| Package.json - Invalid License | 03/07/2023 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensys Diligence | TODO | - |
| A Trusted Website Can Add Any Address To The Snaps Address Storage; No Control Over Added Addresses; Confirmation Is A Notification | 03/07/2023 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensys Diligence | TODO | - |
| Unused Import Ethers, @metamask/snaps-ui | 03/07/2023 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensys Diligence | Low | - |
| Currentepoch - Unnecesary Conversion From/to String | 03/07/2023 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensys Diligence | TODO | - |
| Api Design - Consider Using Consistent Rpc Method Names | 03/07/2023 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensys Diligence | TODO | - |
| Performance - Await In For Loop | 03/07/2023 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensys Diligence | TODO | - |
| User Flow - Request To Sign Message Does Not Provide Security Guarantee | 03/07/2023 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensys Diligence | Low | - |
| Typescript Errors | 03/07/2023 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensys Diligence | TODO | - |
| Avoid Hardcoding The Local Snap Id | 03/07/2023 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensys Diligence | TODO | - |
| Persisteddata Race Where Snap_managestate.get Returnsnull | 03/07/2023 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensys Diligence | TODO | - |
| Chain Id Is Read From Node Instead Of Transaction Information | 27/08/2024 | npm:@quickintel/quickintel-snap | https://github.com/Quick-Intel/quickintel-snap/blob/main/VAR_quickintel_snap.pdf | TODO | Veridise | TODO | - |
| Hardcoded Api Key | 27/08/2024 | npm:@quickintel/quickintel-snap | https://github.com/Quick-Intel/quickintel-snap/blob/main/VAR_quickintel_snap.pdf | TODO | Veridise | TODO | - |
| Incorrect Http Response Error Handling For Api Endpoint | 27/08/2024 | npm:@quickintel/quickintel-snap | https://github.com/Quick-Intel/quickintel-snap/blob/main/VAR_quickintel_snap.pdf | TODO | Veridise | TODO | - |
| Unnecessary Rpc Permission | 27/08/2024 | npm:@quickintel/quickintel-snap | https://github.com/Quick-Intel/quickintel-snap/blob/main/VAR_quickintel_snap.pdf | TODO | Veridise | TODO | - |
| Api Endpoint Call Is Missing Recipient Address | 27/08/2024 | npm:@quickintel/quickintel-snap | https://github.com/Quick-Intel/quickintel-snap/blob/main/VAR_quickintel_snap.pdf | TODO | Veridise | TODO | - |
| Dependencies Should Be Pinned To Exact Versions | 27/08/2024 | npm:@rarimo/rarime | https://github.com/rarimo/rarime/blob/main/audits/halborn_2023-08-28.pdf | TODO | Halborn | TODO | - |
| Potential Generation Of Arbitrary Proofs | 27/08/2024 | npm:@rarimo/rarime | https://github.com/rarimo/rarime/blob/main/audits/halborn_2023-08-28.pdf | TODO | Halborn | Critical | - |
| Localhost String Included On The Allow-list | 18/01/2024 | npm:@safeheron/mpcsnap | https://cure53.de/pentest-report_safeheron-snap.pdf | https://github.com/Safeheron/multi-mpc-snap-monorepo/commit/80c59cc48c0e7c003e80c5d30a6895aa6d5d2eba | Cure53 | Low | - |
| Key Generation Overwrites Previous Mpc Account | 18/01/2024 | npm:@safeheron/mpcsnap | https://cure53.de/pentest-report_safeheron-snap.pdf | https://github.com/Safeheron/multi-mpc-snap-monorepo/commit/80c59cc48c0e7c003e80c5d30a6895aa6d5d2eba | Cure53 | TODO | - |
| Suboptimal State Follows Request Flow | 18/01/2024 | npm:@safeheron/mpcsnap | https://cure53.de/pentest-report_safeheron-snap.pdf | https://github.com/Safeheron/multi-mpc-snap-monorepo/commit/80c59cc48c0e7c003e80c5d30a6895aa6d5d2eba | Cure53 | Low | - |
| Request Signatures Require No User-modal Interaction | 18/01/2024 | npm:@safeheron/mpcsnap | https://cure53.de/pentest-report_safeheron-snap.pdf | https://github.com/Safeheron/multi-mpc-snap-monorepo/commit/80c59cc48c0e7c003e80c5d30a6895aa6d5d2eba | Cure53 | TODO | - |
| Missing Check In Feldman’s Secret Sharing Allows For Threshold | 05/02/2024 | npm:@safeheron/mpcsnap | https://leastauthority.com/wp-content/uploads/2024/02/Safeheron_Crypto_Suites__Multiparty_ECDSA_Updated_Final_Audit_Report_Least_Authority.pdf | TODO | Least Authority | Low | - |
| Incorrect Cofactor Handling In Pubkeyrecovery | 05/02/2024 | npm:@safeheron/mpcsnap | https://leastauthority.com/wp-content/uploads/2024/02/Safeheron_Crypto_Suites__Multiparty_ECDSA_Updated_Final_Audit_Report_Least_Authority.pdf | TODO | Least Authority | TODO | - |
| Sanity Check Assertions Are Compiled Away In Release Mode | 05/02/2024 | npm:@safeheron/mpcsnap | https://leastauthority.com/wp-content/uploads/2024/02/Safeheron_Crypto_Suites__Multiparty_ECDSA_Updated_Final_Audit_Report_Least_Authority.pdf | TODO | Least Authority | TODO | - |
| Missing Checks In Ecdsa Signature Verification | 05/02/2024 | npm:@safeheron/mpcsnap | https://leastauthority.com/wp-content/uploads/2024/02/Safeheron_Crypto_Suites__Multiparty_ECDSA_Updated_Final_Audit_Report_Least_Authority.pdf | TODO | Least Authority | TODO | - |
| Avalanche Rpc Endpoints Avax_* Are Enabled In The Snap But Disabled In The Sandbox App | 24/07/2023 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensys Diligence | TODO | - |
| Misleading Error Message (copy-paste) | 24/07/2023 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensys Diligence | TODO | - |
| Notify On Chain Switches And Allow Users To Restrict Access To Chain Specific Functionality And Data | 24/07/2023 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensys Diligence | Low | - |
| Rpc [eth|avax]_signmessage Endpoints Return Errors | 24/07/2023 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensys Diligence | TODO | - |
| Rpc Eth_getaddress Undermines Metamask Security Features By Exposing All Accounts W/o Explicit User Consent | 24/07/2023 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensys Diligence | TODO | - |
| Every Rpc Request Leads To The Creation Of A New Signer Object | 24/07/2023 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensys Diligence | TODO | - |
| Asynchronicity Might Lead To An Undefined Ethereum Provider | 24/07/2023 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensys Diligence | TODO | - |
| Unused Interface Declaration | 24/07/2023 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensys Diligence | Low | - |
| Signing Request Fails To Display Origin And User Account On Confirmation Message | 24/07/2023 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensys Diligence | TODO | - |
| Superfluous Permission Endowment:network-access | 24/07/2023 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensys Diligence | TODO | - |
| Rpc Eth_signmessage Allows Linked Dapps To Sign Messages With Any Wallet Account And W/o Explicit User Consent | 24/07/2023 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensys Diligence | Low | - |
| Rpc *_signtransaction Endpoints Should Display Human Readable Transaction Data | 24/07/2023 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensys Diligence | TODO | - |
| Sign Request Popup Handles Newlines Incorrectly | 07/09/2023 | npm:@silencelaboratories/silent-shard-snap | https://cure53.de/pentest-report_silencelabs-snap.pdf | TODO | Cure53 | TODO | - |
| Valid Jwt Forgery Containing Arbitrary User Ids | 07/09/2023 | npm:@silencelaboratories/silent-shard-snap | https://cure53.de/pentest-report_silencelabs-apps.pdf | TODO | Cure53 | Critical | - |
| Idor In Sendmessage's Cloud Functions Api | 07/09/2023 | npm:@silencelaboratories/silent-shard-snap | https://cure53.de/pentest-report_silencelabs-apps.pdf | TODO | Cure53 | TODO | - |
| Sign Request Screen Handles Newlines Incorrectly | 07/09/2023 | npm:@silencelaboratories/silent-shard-snap | https://cure53.de/pentest-report_silencelabs-apps.pdf | TODO | Cure53 | TODO | - |
| Misleading Html Entity And Function Name Getprivkey | 21/08/2023 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensys Diligence | TODO | - |
| Use Of Outdated Snap.config.json Instead Of Snap.config.js | 21/08/2023 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensys Diligence | TODO | - |
| Consider Using @metamask/detect-provider | 21/08/2023 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensys Diligence | TODO | - |
| Inconsistent Or Blank Fields In Package.json | 21/08/2023 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensys Diligence | TODO | - |
| Dapp May Force A Sign Approval Dialog Without Showing The Message To Be Signed | 21/08/2023 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensys Diligence | TODO | - |
| Production Builds Allow Development And Localhost Origins; Snap Does Not Enforce Transport Security | 21/08/2023 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensys Diligence | Low | - |
| Consider Moving To Typescript | 21/08/2023 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensys Diligence | TODO | - |
| Dapp May Suppress User Confirmation On Request To Extract Pubkey; May Extract Any Net-key | 21/08/2023 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensys Diligence | TODO | - |
| Consider Prefixing Rpc Calls With Solana_*, Sui_*, Aptos_* | 21/08/2023 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensys Diligence | TODO | - |
| Getpriceofassetquotedinusd Might Return Flawed Asset Prices | 09/04/2024 | npm:@tezoroproject/snap | https://consensys.io/diligence/audits/2024/04/tezoro-snap/ | TODO | Consensys Diligence | TODO | - |
| Lack Of Origin Check On Rpc Requests | 09/04/2024 | npm:@tezoroproject/snap | https://consensys.io/diligence/audits/2024/04/tezoro-snap/ | TODO | Consensys Diligence | TODO | - |
| External/user Input Sanitization | 09/04/2024 | npm:@tezoroproject/snap | https://consensys.io/diligence/audits/2024/04/tezoro-snap/ | TODO | Consensys Diligence | TODO | - |
| Dapp Origin Not Displayed In The Snap Ui | 04/08/2023 | npm:@tuum-tech/identify | https://github.com/tuum-tech/identify/blob/main/SNAP_AUDIT_REPORT_BY_CURE53.pdf | TODO | Cure53 | TODO | - |
| A Malicious Actor Can Terminate The Recovery Process | 13/02/2024 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Least Authority | TODO | - |
| Dkl+19 Does Not Support Key Refresh | 13/02/2024 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Least Authority | TODO | - |
| Sensitive Api Calls Are Not Restricted | 13/02/2024 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Least Authority | Medium | - |
| Dkl+19 Does Not Support Key Refresh (second Review) | 13/02/2024 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Least Authority | TODO | - |
| Security Groups And Security Group Rules Are Both Used For | 13/02/2024 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Least Authority | TODO | - |
| Sensitive Flag Is Not Set To True For Secret Variables | 13/02/2024 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Least Authority | Medium | - |
| Egress Traffic Is Allowed To Any Instance | 13/02/2024 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Least Authority | Low | - |
| Security Groups And Security Group Rules Are Both Used For Traffic | 13/02/2024 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Least Authority | TODO | - |
| Secret Used To Encrypt Shares Sent Over Network | 13/02/2024 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Least Authority | TODO | - |
| Http Traffic To Services Is Allowed | 13/02/2024 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Least Authority | Low | - |
| Initialization Vector Used Does Not Meet Recommended Best | 12/09/2023 | npm:@web3mq/snap | https://github.com/MetaMask/snaps-registry/files/12604989/Least_Authority_Generative_Labs_MetaMask_Snap_Updated_Final_Audit.pdf | TODO | Least Authority | TODO | - |
| Unnecessary Usage Of Non-standard Libraries | 12/09/2023 | npm:@web3mq/snap | https://github.com/MetaMask/snaps-registry/files/12604989/Least_Authority_Generative_Labs_MetaMask_Snap_Updated_Final_Audit.pdf | TODO | Least Authority | TODO | - |
| Weak Key Derivation Algorithm Used | 12/09/2023 | npm:@web3mq/snap | https://github.com/MetaMask/snaps-registry/files/12604989/Least_Authority_Generative_Labs_MetaMask_Snap_Updated_Final_Audit.pdf | TODO | Least Authority | TODO | - |
| Initialization Vector Used Does Not Meet Recommended Best Practices | 12/09/2023 | npm:@web3mq/snap | https://github.com/MetaMask/snaps-registry/files/12604989/Least_Authority_Generative_Labs_MetaMask_Snap_Updated_Final_Audit.pdf | TODO | Least Authority | TODO | - |
| Lack Of Unit Test Coverage | 18/04/2024 | npm:@xtreamly/xtreamly_slippage_predictor | https://sayfer.io/audits/metamask-snap-audit-report-for-xtreamly/ | TODO | Sayfer | TODO | - |
| Dependencies Are Not Pinned To Exact Versions | 18/04/2024 | npm:@xtreamly/xtreamly_slippage_predictor | https://sayfer.io/audits/metamask-snap-audit-report-for-xtreamly/ | TODO | Sayfer | TODO | - |
| Leftover Testing Code | 18/04/2024 | npm:@xtreamly/xtreamly_slippage_predictor | https://sayfer.io/audits/metamask-snap-audit-report-for-xtreamly/ | TODO | Sayfer | TODO | - |
| Simulation Of Multihop Swaps May Be Inaccurate | 18/04/2024 | npm:@xtreamly/xtreamly_slippage_predictor | https://sayfer.io/audits/metamask-snap-audit-report-for-xtreamly/ | TODO | Sayfer | TODO | - |
| Unused Functions | 12/12/2023 | npm:azero-wallet | https://sayfer.io/audits/metamask-snap-audit-report-for-alephzero/ | TODO | Sayfer | Low | - |
| Type Checking Is Not Uniform | 12/12/2023 | npm:azero-wallet | https://sayfer.io/audits/metamask-snap-audit-report-for-alephzero/ | TODO | Sayfer | TODO | - |
| Non-functioning Example | 13/02/2024 | npm:bch-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-fexcash/ | TODO | Sayfer | TODO | - |
| Missing Unit Tests | 13/02/2024 | npm:bch-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-fexcash/ | TODO | Sayfer | TODO | - |
| Prompt User When Requesting Public Keys | 27/08/2024 | npm:casper-manager | https://github.com/casper-ecosystem/casper-manager/blob/main/audits/20_06_2023_Casper_Management_Snap_App_WebApp_Pentest_Report_Halborn_Final.pdf | TODO | Halborn | TODO | - |
| Dependencies Should Be Pinned To Exact Versions | 27/08/2024 | npm:casper-manager | https://github.com/casper-ecosystem/casper-manager/blob/main/audits/20_06_2023_Casper_Management_Snap_App_WebApp_Pentest_Report_Halborn_Final.pdf | TODO | Halborn | TODO | - |
| Incorrect Rounding Evokes Balance Misinterpretation | 15/12/2023 | npm:dedaub-metamask-snap | https://cure53.de/pentest-report_dedaub-metamask-snap.pdf | TODO | Cure53 | TODO | - |
| Imprecise Conversion Of Chain Id To Uri | 02/02/2024 | npm:defi-armor-snap | https://github.com/Eulith/eulith-metamask-snap/blob/master/audit-report.pdf | TODO | Cure53 | TODO | - |
| Missing Timeout In Rpc.call | 14/08/2023 | npm:filsnap | https://consensys.io/diligence/audits/2023/08/metamask/partner-snaps-filsnap/ | TODO | Consensys Diligence | TODO | - |
| Lack Of Signature Dialog Context And Rpc Origin | 14/08/2023 | npm:filsnap | https://consensys.io/diligence/audits/2023/08/metamask/partner-snaps-filsnap/ | TODO | Consensys Diligence | TODO | - |
| No Way To Disable Approvals Checking, And Transaction Analytics | 17/07/2023 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensys Diligence | TODO | - |
| Devdependencies Erroneously Listed As Dependencies | 17/07/2023 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensys Diligence | TODO | - |
| Properties Of The Transaction Object Might Be Undefined | 17/07/2023 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensys Diligence | TODO | - |
| Consider Submitting Snap Version With Backend Api Requests | 17/07/2023 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensys Diligence | TODO | - |
| Package.json - Missing Author | 17/07/2023 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensys Diligence | TODO | - |
| Assetchangecomponent Displays A Change With Value 0 If Fiatvalue < 0.005 | 17/07/2023 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensys Diligence | TODO | - |
| Server Should Not Rely On Clients’ Randomness | 17/07/2023 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensys Diligence | TODO | - |
| Formatfiatvalue() Can Be Simplified | 17/07/2023 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensys Diligence | TODO | - |
| Extra ‘if’ Statement | 17/07/2023 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensys Diligence | TODO | - |
| Restrict Snap RPC access to trusted origins | 07/12/2023 | npm:walletchat-metamask-snap | https://drive.google.com/uc?export=download&id=1pNhN43mMOLiA2jWUF5IbJA-5kmfAod1f | TODO | Cure53 | Medium | - |
| Unsafe wild card targetOrigin usage in postMessage | 07/12/2023 | npm:walletchat-metamask-snap | https://drive.google.com/uc?export=download&id=1pNhN43mMOLiA2jWUF5IbJA-5kmfAod1f | TODO | Cure53 | Low | - |
| Restrict Snap RPC access to trusted origins | 12/07/2023 | npm:walletchat-metamask-snap | https://drive.google.com/uc?export=download&id=1dixJw4G4ekcO40GpbH7VmizLTINS5gUL | TODO | Cure53 | Medium | - |
| Unsafe wild card targetOrigin usage in postMessage | 12/07/2023 | npm:walletchat-metamask-snap | https://drive.google.com/uc?export=download&id=1dixJw4G4ekcO40GpbH7VmizLTINS5gUL | TODO | Cure53 | Low | - |
| PROMPT USER WHEN REQUESTING PUBLIC KEYS | 20/06/2023 | npm:casper-manager | https://raw.githubusercontent.com/casper-ecosystem/casper-manager/main/audits/20_06_2023_Casper_Management_Snap_App_WebApp_Pentest_Report_Halborn_Final.pdf | TODO | Halborn | Informational | - |
| RESTRICT SITES | 20/06/2023 | npm:casper-manager | https://raw.githubusercontent.com/casper-ecosystem/casper-manager/main/audits/20_06_2023_Casper_Management_Snap_App_WebApp_Pentest_Report_Halborn_Final.pdf | TODO | Halborn | Informational | - |
| DApp origin not displayed in the Snap UI | 08/04/2023 | npm:@tuum-tech/identify | https://raw.githubusercontent.com/tuum-tech/identify/main/SNAP_AUDIT_REPORT_BY_CURE53.pdf | TODO | Cure53 | Medium | - |
| No user confirmation dialog in GDrive configuration | 08/04/2023 | npm:@tuum-tech/identify | https://raw.githubusercontent.com/tuum-tech/identify/main/SNAP_AUDIT_REPORT_BY_CURE53.pdf | TODO | Cure53 | Low | - |
| No user-email displayed in sync dialog for GDrive | 08/04/2023 | npm:@tuum-tech/identify | https://raw.githubusercontent.com/tuum-tech/identify/main/SNAP_AUDIT_REPORT_BY_CURE53.pdf | TODO | Cure53 | Medium | - |
| Unused Functions | 15/08/2023 | npm:@tenderly/metamask-snap | https://raw.githubusercontent.com/Tenderly/tenderly-snap/main/audits/2023-08-Metamask-Snap-PT-for-Tenderly.pdf | TODO | Sayfer | Low | - |
| POTENTIAL GENERATION OF ARBITRARY PROOFS | 28/08/2023 | npm:@rarimo/rarime | https://raw.githubusercontent.com/rarimo/rarime/main/audits/halborn_2023-08-28.pdf | TODO | Halborn | Critical | - |
| RESTRICT SITES | 28/08/2023 | npm:@rarimo/rarime | https://raw.githubusercontent.com/rarimo/rarime/main/audits/halborn_2023-08-28.pdf | TODO | Halborn | Informational | - |
| Hardcoded API key | 10/10/2023 | npm:@quickintel/quickintel-snap | https://raw.githubusercontent.com/Quick-Intel/quickintel-snap/main/VAR_quickintel_snap.pdf | TODO | Quick intel | Critical | - |
| API endpoint call is missing recipient address | 10/10/2023 | npm:@quickintel/quickintel-snap | https://raw.githubusercontent.com/Quick-Intel/quickintel-snap/main/VAR_quickintel_snap.pdf | TODO | Quick intel | Medium | - |
| Incorrect HTTP response error handling for API endpoint | 10/10/2023 | npm:@quickintel/quickintel-snap | https://raw.githubusercontent.com/Quick-Intel/quickintel-snap/main/VAR_quickintel_snap.pdf | TODO | Quick intel | Low | - |
| Chain ID is read from node instead of transaction information | 10/10/2023 | npm:@quickintel/quickintel-snap | https://raw.githubusercontent.com/Quick-Intel/quickintel-snap/main/VAR_quickintel_snap.pdf | TODO | Quick intel | Low | - |
| Unnecessary RPC permission | 10/10/2023 | npm:@quickintel/quickintel-snap | https://raw.githubusercontent.com/Quick-Intel/quickintel-snap/main/VAR_quickintel_snap.pdf | TODO | Quick intel | Informational | - |
| Imprecise conversion of Chain ID to URI | 02/02/2024 | TODO | https://raw.githubusercontent.com/Eulith/eulith-metamask-snap/master/audit-report.pdf | TODO | Cure53 | Low | - |
| Dependencies with Known Vulnerabilities | 23/06/2023 | npm:tezos-metamask-snap | https://github.com/MetaMask/snaps-registry/files/12543946/Sayfer.-.2023-06.Penetration.Testing.Report.for.Tezos.Metamask.Snap.Application.pdf | TODO | Sayfer | Low | - |
| Magic Numbers | 23/06/2023 | npm:tezos-metamask-snap | https://github.com/MetaMask/snaps-registry/files/12543946/Sayfer.-.2023-06.Penetration.Testing.Report.for.Tezos.Metamask.Snap.Application.pdf | TODO | Sayfer | Informational | - |
| Comment About Unresolved Issue | 23/06/2023 | npm:tezos-metamask-snap | https://github.com/MetaMask/snaps-registry/files/12543946/Sayfer.-.2023-06.Penetration.Testing.Report.for.Tezos.Metamask.Snap.Application.pdf | TODO | Sayfer | Informational | - |
| Unused Functions | 15/08/2023 | npm:@tenderly/metamask-snap | https://github.com/Tenderly/tenderly-snap/blob/main/audits/2023-08-Metamask-Snap-PT-for-Tenderly.pdf | TODO | Sayfer | Low | - |
| Snap Hosted Locally | 30/08/2023 | npm:web3-security-snap | https://github.com/MetaMask/snaps-registry/files/12544383/Sayfer.-.2023-08.Penetration.Testing.Report.for.AnChain.Snap.pdf | TODO | Sayfer | High | - |
| Lack of Documentation | 30/08/2023 | npm:web3-security-snap | https://github.com/MetaMask/snaps-registry/files/12544383/Sayfer.-.2023-08.Penetration.Testing.Report.for.AnChain.Snap.pdf | TODO | Sayfer | Low | - |
| Wrong Fuction Name | 30/08/2023 | npm:web3-security-snap | https://github.com/MetaMask/snaps-registry/files/12544383/Sayfer.-.2023-08.Penetration.Testing.Report.for.AnChain.Snap.pdf | TODO | Sayfer | Low | - |
| Unused Parameter | 30/08/2023 | npm:web3-security-snap | https://github.com/MetaMask/snaps-registry/files/12544383/Sayfer.-.2023-08.Penetration.Testing.Report.for.AnChain.Snap.pdf | TODO | Sayfer | Low | - |
| Missing Unit Tests | 30/08/2023 | npm:web3-security-snap | https://github.com/MetaMask/snaps-registry/files/12544383/Sayfer.-.2023-08.Penetration.Testing.Report.for.AnChain.Snap.pdf | TODO | Sayfer | Informational | - |

## Improper Input Validation

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Lax Validation Using@starknet::validateandparseaddress Allows Short Addresses And Does Not Verify Checksums | 28/06/2023 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensys Diligence | Low | - |
| Rpc Starknet_getstoredtransactions - Lax Or Missing Input Validation | 28/06/2023 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensys Diligence | TODO | - |
| Insufficient Input Validation Derivekeypair() | 21/08/2023 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensys Diligence | TODO | - |
| Imprecise Eth Address Validation | 22/02/2024 | npm:rubic-snap | https://cure53.de/pentest-report_rubic-snap.pdf | TODO | Cure53 | TODO | - |
| Missing Input Validation For Walletaddress | 17/07/2023 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensys Diligence | TODO | - |

## Inadequate Documentation and Comments

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Lack Of Documentation And Commenting | 08/12/2023 | npm:@amax/amaxsnap | https://sayfer.io/audits/metamask-snap-audit-report-for-amax/ | TODO | Sayfer | Low | - |
| Outdated Documentation | 07/11/2023 | npm:@astar-network/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-astar/ | TODO | Sayfer | Low | - |
| Documentation Contains Incorrect Instructions | 17/09/2023 | npm:@chainsafe/aleo-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-aleo/ | TODO | Sayfer | Low | - |
| Commented Code And Leftover Todos | 05/12/2023 | npm:@galactica-net/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-galactica/ | TODO | Sayfer | TODO | - |
| Lack Of High-level And Inline Documentation | 24/07/2023 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensys Diligence | High | - |
| Lack Of Documentation And Commenting | 12/12/2023 | npm:azero-wallet | https://sayfer.io/audits/metamask-snap-audit-report-for-alephzero/ | TODO | Sayfer | Low | - |

## Misleading or Inconsistent Information

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Misleading Comment | 17/07/2023 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensys Diligence | TODO | - |
| No Explanation Of The Risk Associated With Exportseed() | 07/11/2023 | npm:@astar-network/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-astar/ | TODO | Sayfer | TODO | - |
| Misleading Error Message | 15/08/2023 | npm:@tenderly/metamask-snap | https://raw.githubusercontent.com/Tenderly/tenderly-snap/main/audits/2023-08-Metamask-Snap-PT-for-Tenderly.pdf | TODO | Sayfer | Informational | - |
| Misleading Error Message | 15/08/2023 | npm:@tenderly/metamask-snap | https://github.com/Tenderly/tenderly-snap/blob/main/audits/2023-08-Metamask-Snap-PT-for-Tenderly.pdf | TODO | Sayfer | Informational | - |

## Lack of Testing and Quality Assurance

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Insufficient Test Coverage | 08/12/2023 | npm:@amax/amaxsnap | https://sayfer.io/audits/metamask-snap-audit-report-for-amax/ | TODO | Sayfer | TODO | - |
| Example Dapp Only Has One Functionality Implemented | 08/12/2023 | npm:@amax/amaxsnap | https://sayfer.io/audits/metamask-snap-audit-report-for-amax/ | TODO | Sayfer | TODO | - |
| Non-functional Tests | 17/09/2023 | npm:@chainsafe/aleo-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-aleo/ | TODO | Sayfer | TODO | - |
| Insufficient Test Coverage | 01/02/2024 | npm:@fioprotocol/fio-wallet-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-fio/ | TODO | Sayfer | TODO | - |
| No Tests Found | 13/08/2023 | npm:@leapwallet/metamask-cosmos-snap | https://github.com/MetaMask/snaps-registry/files/12544468/Sayfer.-.2023-08.Penetration.Testing.Report.for.LeapWallet.Snap.-.Updated.pdf | TODO | Sayfer | Medium | - |

## Inadequate Security Measures

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Restrict Sites | 27/08/2024 | npm:@rarimo/rarime | https://github.com/rarimo/rarime/blob/main/audits/halborn_2023-08-28.pdf | TODO | Halborn | TODO | - |
| Restrict Sites | 27/08/2024 | npm:casper-manager | https://github.com/casper-ecosystem/casper-manager/blob/main/audits/20_06_2023_Casper_Management_Snap_App_WebApp_Pentest_Report_Halborn_Final.pdf | TODO | Halborn | TODO | - |
| Missing Address Protection | 14/08/2023 | npm:filsnap | https://consensys.io/diligence/audits/2023/08/metamask/partner-snaps-filsnap/ | TODO | Consensys Diligence | TODO | - |
| Restrict Snap Rpc Access To Trusted Origins | 12/07/2023 | npm:walletchat-metamask-snap | https://drive.google.com/file/d/1pNhN43mMOLiA2jWUF5IbJA-5kmfAod1f/view?usp=drive_link | TODO | Cure53 | TODO | - |
| Unsafe Wild Card Targetorigin Usage In Postmessage | 12/07/2023 | npm:walletchat-metamask-snap | https://drive.google.com/file/d/1pNhN43mMOLiA2jWUF5IbJA-5kmfAod1f/view?usp=drive_link | TODO | Cure53 | TODO | - |

## UI and UX Flaws

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| No User-email Displayed In Sync Dialog For Gdrive | 04/08/2023 | npm:@tuum-tech/identify | https://github.com/tuum-tech/identify/blob/main/SNAP_AUDIT_REPORT_BY_CURE53.pdf | TODO | Cure53 | TODO | - |
| Alarming Metamask Prompt | 23/06/2023 | npm:tezos-metamask-snap | https://github.com/MetaMask/snaps-registry/files/12543946/Sayfer.-.2023-06.Penetration.Testing.Report.for.Tezos.Metamask.Snap.Application.pdf | TODO | Sayfer | Informational | - |

## Error Handling Issues

| Title | Date | Snap | Report URL | Code URL | Auditor | Severity | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Unexpected Success Message | 30/08/2023 | npm:web3-security-snap | https://github.com/MetaMask/snaps-registry/files/12544383/Sayfer.-.2023-08.Penetration.Testing.Report.for.AnChain.Snap.pdf | TODO | Sayfer | Medium | - |