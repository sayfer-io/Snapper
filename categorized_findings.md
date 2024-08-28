# Cybersecurity Findings

## Injection Flaws

| title | date | snap | report_url | code_url | auditor | severity | Covered |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Rpc Starknet_sendtransaction - The User Displayed Message Generated With Getsigningtxntext() Is Prone To Markdown/control Chars Injection From Contractcalldata | 2023-06-28 16:26:59 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensysdiligence | TODO | - |
| Rpc Starknet_signmessage - Inconsistency When Previewing The Signed Message (markdown Injection) | 2023-06-28 16:26:59 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensysdiligence | TODO | - |
| Markdown Injection In Snaps Ui Components | 2023-12-15 10:52:50 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensysdiligence | TODO | - |
| Makeavatarsvgcustom - Potential Svg Html Injection, React Innerhtml | 2024-03-13 11:38:18 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensysdiligence | TODO | - |
| Ctrlchar/markdown Injection | 2024-03-13 11:38:18 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensysdiligence | TODO | - |
| Lax Input Validation, Control Char, Uri, And Markdown Injection | 2023-07-03 11:46:54 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensysdiligence | TODO | - |
| Potential Url Query Injection When Building Link For Full Audit | 2024-08-27 03:07:02 | npm:@quickintel/quickintel-snap | https://github.com/Quick-Intel/quickintel-snap/blob/main/VAR_quickintel_snap.pdf | TODO | Veridise | TODO | - |
| Control Character And Markdown Injection In Snap_dialog | 2023-07-24 08:35:44 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensysdiligence | TODO | - |
| Ctrlchar/markdown Injection In Rendersigntransaction, Rendersignalltransactions | 2023-08-21 10:55:22 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensysdiligence | TODO | - |
| Potential Markdown Injection In Snap_notify | 2024-04-09 13:39:49 | npm:@tezoroproject/snap | https://consensys.io/diligence/audits/2024/04/tezoro-snap/ | TODO | Consensysdiligence | TODO | - |
| Markdown And Control Character Injection | 2023-08-14 09:57:02 | npm:filsnap | https://consensys.io/diligence/audits/2023/08/metamask/partner-snaps-filsnap/ | TODO | Consensysdiligence | TODO | - |

## Broken Authentication

| title | date | snap | report_url | code_url | auditor | severity | Covered |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Protected_handleidentitylogin - Unchecked Withidentityid | 2024-03-13 11:38:18 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensysdiligence | TODO | - |

## Sensitive Data Exposure

| title | date | snap | report_url | code_url | auditor | severity | Covered |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Backup Flow Exports Private Keys As Plaintext | 2024-01-18 00:00:00 | npm:@safeheron/mpcsnap | https://cure53.de/pentest-report_safeheron-snap.pdf | TODO | Cure53 | Low | - |

## Broken Access Control

| title | date | snap | report_url | code_url | auditor | severity | Covered |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Broken Authorization Scheme | 2023-12-15 10:52:50 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensysdiligence | TODO | - |
| Security Groups And Security Group Rules Are Both Used For Traffic Access Control | 2024-02-13 00:00:00 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Leastauthority | TODO | - |

## Security Misconfiguration

| title | date | snap | report_url | code_url | auditor | severity | Covered |
| --- | --- | --- | --- | --- | --- | --- | --- |
| No User Confirmation Dialog In Gdrive Configuration | 2023-08-04 00:00:00 | npm:@tuum-tech/identify | https://github.com/tuum-tech/identify/blob/main/SNAP_AUDIT_REPORT_BY_CURE53.pdf | TODO | Cure53 | TODO | - |
| Fil_configure Allows Anyone To Change The Snap’s Configuration | 2023-08-14 09:57:02 | npm:filsnap | https://consensys.io/diligence/audits/2023/08/metamask/partner-snaps-filsnap/ | TODO | Consensysdiligence | Low | - |

## Cross-Site Scripting (XSS)

No findings available.

## Insecure Deserialization

No findings available.

## Using Components with Known Vulnerabilities

| title | date | snap | report_url | code_url | auditor | severity | Covered |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Signdata() Will Soon Be Deprecated | 2023-10-02 08:28:52 | npm:@kunalabs-io/sui-metamask-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-kunalabs/ | TODO | Sayfer | TODO | - |
| Usage Of Vulnerable Packages | 2023-09-13 17:18:23 | npm:@pianity/arsnap | https://sayfer.io/audits/pianity-snap | TODO | Sayfer | Medium | - |
| Usage Of Deprecated Functions | 2023-09-13 17:18:23 | npm:@pianity/arsnap | https://sayfer.io/audits/pianity-snap | TODO | Sayfer | TODO | - |
| Use Of Deprecated Metamask Permissions In Snaps | 2024-01-18 00:00:00 | npm:@safeheron/mpcsnap | https://cure53.de/pentest-report_safeheron-snap.pdf | TODO | Cure53 | TODO | - |
| Update And Replace Vulnerable Dependencies | 2024-02-13 00:00:00 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Leastauthority | Medium | - |
| Vulnerable And Unused Dependencies Detected In The Codebase | 2023-09-12 00:00:00 | npm:@web3mq/snap | https://github.com/MetaMask/snaps-registry/files/12604989/Least_Authority_Generative_Labs_MetaMask_Snap_Updated_Final_Audit.pdf | TODO | Leastauthority | Medium | - |
| Potentially Vulnerable Dependencies | 2024-04-18 14:02:14 | npm:@xtreamly/xtreamly_slippage_predictor | https://sayfer.io/audits/metamask-snap-audit-report-for-xtreamly/ | TODO | Sayfer | Medium | - |
| Dependency With Outstanding Vulnerability | 2023-12-12 17:12:21 | npm:azero-wallet | https://sayfer.io/audits/metamask-snap-audit-report-for-alephzero/ | TODO | Sayfer | TODO | - |

## Insufficient Logging & Monitoring

| title | date | snap | report_url | code_url | auditor | severity | Covered |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Wallet Monitoring Improvements | 2023-07-17 10:41:29 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensysdiligence | TODO | - |

## Code Quality Issues

| title | date | snap | report_url | code_url | auditor | severity | Covered |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Unused Imports, Inconsistent Coding Style And Unsafe Patterns | 2023-12-15 10:52:50 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensysdiligence | TODO | - |
| Minor Typos | 2024-02-01 10:14:30 | npm:@fioprotocol/fio-wallet-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-fio/ | TODO | Sayfer | Low | - |
| Dead Code Popup | 2023-07-03 11:46:54 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensysdiligence | TODO | - |
| Typos | 2024-02-13 13:49:49 | npm:bch-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-fexcash/ | TODO | Sayfer | Low | - |

## Insufficient Input Validation

| title | date | snap | report_url | code_url | auditor | severity | Covered |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Lax Validation Using@starknet::validateandparseaddress Allows Short Addresses And Does Not Verify Checksums | 2023-06-28 16:26:59 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensysdiligence | Low | - |
| Rpc Starknet_getstoredtransactions - Lax Or Missing Input Validation | 2023-06-28 16:26:59 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensysdiligence | TODO | - |
| Fetchallticketcommentscount() Is Unoptimized, Overly Complex, And Lacks Untrusted Input Validation | 2023-12-15 10:52:50 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensysdiligence | TODO | - |
| Missing Url Validation | 2023-12-05 13:56:05 | npm:@galactica-net/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-galactica/ | TODO | Sayfer | TODO | - |
| Lack Of Payload Validation In Snaps | 2024-01-18 00:00:00 | npm:@safeheron/mpcsnap | https://cure53.de/pentest-report_safeheron-snap.pdf | TODO | Cure53 | TODO | - |
| Insufficient Input Validation Derivekeypair() | 2023-08-21 10:55:22 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensysdiligence | TODO | - |
| Lack Of Validation In Uint8arrayfromhex(string) | 2023-12-12 17:12:21 | npm:azero-wallet | https://sayfer.io/audits/metamask-snap-audit-report-for-alephzero/ | TODO | Sayfer | TODO | - |
| Imprecise Eth Address Validation | 2024-02-22 00:00:00 | npm:rubic-snap | https://cure53.de/pentest-report_rubic-snap.pdf | TODO | Cure53 | TODO | - |
| Missing Input Validation For Walletaddress | 2023-07-17 10:41:29 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensysdiligence | TODO | - |

## Documentation and Comments Issues

| title | date | snap | report_url | code_url | auditor | severity | Covered |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Lack Of Documentation And Commenting | 2023-12-08 15:56:28 | npm:@amax/amaxsnap | https://sayfer.io/audits/metamask-snap-audit-report-for-amax/ | TODO | Sayfer | Low | - |
| Outdated Documentation | 2023-11-07 08:55:57 | npm:@astar-network/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-astar/ | TODO | Sayfer | Low | - |
| Documentation Contains Incorrect Instructions | 2023-09-17 14:19:24 | npm:@chainsafe/aleo-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-aleo/ | TODO | Sayfer | Low | - |
| Improper Paramater Sanitization In Fetchallticketcommentscount(), Updateticket(), And Parseticketcomments() | 2023-12-15 10:52:50 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensysdiligence | TODO | - |
| Lack Of Inline Code Documentation | 2023-12-15 10:52:50 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensysdiligence | Low | - |
| Commented Code And Leftover Todos | 2023-12-05 13:56:05 | npm:@galactica-net/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-galactica/ | TODO | Sayfer | TODO | - |
| Lack Of High-level And Inline Documentation | 2023-07-24 08:35:44 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensysdiligence | Low | - |
| Lack Of Documentation And Commenting | 2023-12-12 17:12:21 | npm:azero-wallet | https://sayfer.io/audits/metamask-snap-audit-report-for-alephzero/ | TODO | Sayfer | Low | - |
| Incomplete Natspec And General Documentation | 2023-07-17 10:41:29 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensysdiligence | Low | - |
| Misleading Comment | 2023-07-17 10:41:29 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensysdiligence | TODO | - |

## Miscellaneous

| title | date | snap | report_url | code_url | auditor | severity | Covered |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Insufficient Test Coverage | 2023-12-08 15:56:28 | npm:@amax/amaxsnap | https://sayfer.io/audits/metamask-snap-audit-report-for-amax/ | TODO | Sayfer | TODO | - |
| Example Dapp Only Has One Functionality Implemented | 2023-12-08 15:56:28 | npm:@amax/amaxsnap | https://sayfer.io/audits/metamask-snap-audit-report-for-amax/ | TODO | Sayfer | TODO | - |
| Type Checking Is Not Uniform | 2023-12-08 15:56:28 | npm:@amax/amaxsnap | https://sayfer.io/audits/metamask-snap-audit-report-for-amax/ | TODO | Sayfer | TODO | - |
| Dependencies With Known Vulnerabilities | 2023-12-08 15:56:28 | npm:@amax/amaxsnap | https://sayfer.io/audits/metamask-snap-audit-report-for-amax/ | TODO | Sayfer | TODO | - |
| Uninformative Confirmation Popup | 2023-12-08 15:56:28 | npm:@amax/amaxsnap | https://sayfer.io/audits/metamask-snap-audit-report-for-amax/ | TODO | Sayfer | TODO | - |
| If Statement Could Be Simplified | 2023-11-07 08:55:57 | npm:@astar-network/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-astar/ | TODO | Sayfer | TODO | - |
| Dysfunctional Image Link | 2023-11-07 08:55:57 | npm:@astar-network/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-astar/ | TODO | Sayfer | TODO | - |
| No Explanation Of The Risk Associated With Exportseed() | 2023-11-07 08:55:57 | npm:@astar-network/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-astar/ | TODO | Sayfer | TODO | - |
| Non-functional Tests | 2023-09-17 14:19:24 | npm:@chainsafe/aleo-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-aleo/ | TODO | Sayfer | TODO | - |
| Usage Of “magic Numbers” | 2023-09-17 14:19:24 | npm:@chainsafe/aleo-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-aleo/ | TODO | Sayfer | TODO | - |
| Rpc Urls Are Defined As Wsrpcurl While Using Http | 2023-09-17 14:19:27 | npm:@chainsafe/polkadot-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-polkadot/ | TODO | Sayfer | TODO | - |
| Non-working Demo | 2023-09-17 14:19:27 | npm:@chainsafe/polkadot-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-polkadot/ | TODO | Sayfer | TODO | - |
| No Confirmation Dialogue When Sending | 2023-09-17 14:19:27 | npm:@chainsafe/polkadot-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-polkadot/ | TODO | Sayfer | TODO | - |
| Conformations For Key Features Are Not Handled When Rejected | 2023-09-17 14:19:27 | npm:@chainsafe/polkadot-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-polkadot/ | TODO | Sayfer | TODO | - |
| Enablepolkadotsnap Returns An Error When Using The Default Networkname | 2023-09-17 14:19:27 | npm:@chainsafe/polkadot-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-polkadot/ | TODO | Sayfer | TODO | - |
| Ui/hooks - Detectethereumprovider() Should Require Mustbemetamask | 2023-06-28 16:26:59 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensysdiligence | TODO | - |
| Ui/alertview - Unnecessary Use Of Dangerouslysetinnerhtml | 2023-06-28 16:26:59 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensysdiligence | TODO | - |
| Getkeysfromaddress - Possible Unchecked Null Dereference When Looking Up Private Key | 2023-06-28 16:26:59 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensysdiligence | TODO | - |
| Package.json - Invalid License | 2023-06-28 16:26:59 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensysdiligence | TODO | - |
| Rpc Starknet_addnetwork - Not Implemented, No User Confirmation | 2023-06-28 16:26:59 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensysdiligence | TODO | - |
| Rpc Starknet_extractprivatekey - Should Be Renamed To Starknet_displayprivatekey | 2023-06-28 16:26:59 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensysdiligence | TODO | - |
| Rpc Starknet_adderc20token - Should Ask For User Confirmation | 2023-06-28 16:26:59 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensysdiligence | TODO | - |
| Package.json - Dependecy Mixup | 2023-06-28 16:26:59 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensysdiligence | TODO | - |
| Disable Debug Log For Production Build | 2023-06-28 16:26:59 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensysdiligence | TODO | - |
| Rpc Starknet_signmessage - Fails To Display The User Account That Is Used For Signing The Message | 2023-06-28 16:26:59 | npm:@consensys/starknet-snap | https://consensys.io/diligence/audits/2023/06/metamask/partner-snaps-starknetsnap/ | TODO | Consensysdiligence | TODO | - |
| Any Website Connected To The Snap Can Access The Address And Api Key And Impersonate The User | 2023-12-15 10:52:50 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensysdiligence | TODO | - |
| Missing Notifications In Case Multiple Tickets Are Updated | 2023-12-15 10:52:50 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensysdiligence | TODO | - |
| General Design And Performance Considerations: Data Fetching/caching And State Update | 2023-12-15 10:52:50 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensysdiligence | TODO | - |
| An Attacker Can Flood The Support By Creating Many Tickets For Arbitrary Addresses | 2023-12-15 10:52:50 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensysdiligence | TODO | - |
| Inconsistent Naming Conventions And Misleading Function/variable Names | 2023-12-15 10:52:50 | npm:@consensys/web3tickets-snap | https://consensys.io/diligence/audits/2023/12/web3-tickets/ | TODO | Consensysdiligence | TODO | - |
| Typo In Module Name | 2024-02-01 10:14:30 | npm:@fioprotocol/fio-wallet-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-fio/ | TODO | Sayfer | Low | - |
| Insufficient Test Coverage | 2024-02-01 10:14:30 | npm:@fioprotocol/fio-wallet-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-fio/ | TODO | Sayfer | TODO | - |
| Protected_handleaddassetaccount - Should Verify Name, Symbol Matches Assetid | 2024-03-13 11:38:18 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensysdiligence | TODO | - |
| Timestamp Logic Flaws In Snap’s Caching Mechanism | 2024-03-13 11:38:18 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensysdiligence | TODO | - |
| Unused Imports | 2024-03-13 11:38:18 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensysdiligence | TODO | - |
| Protected (administrative Origin) Rpc Methods And Consent Management | 2024-03-13 11:38:18 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensysdiligence | TODO | - |
| Public Rpc Methods And Consent Management | 2024-03-13 11:38:18 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensysdiligence | TODO | - |
| Shared/hextobytes - Incorrect Hex String Handling | 2024-03-13 11:38:18 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensysdiligence | TODO | - |
| Keypairs Generated By Dapps Might Be Unrecoverable Which Could Result In Loss Of Funds | 2024-03-13 11:38:18 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensysdiligence | TODO | - |
| Entropy / Signature Handling & Hardening | 2024-03-13 11:38:18 | npm:@fort-major/msq | https://consensys.io/diligence/audits/2024/03/msq-snap/ | TODO | Consensysdiligence | TODO | - |
| Unused Functions | 2023-12-05 13:56:05 | npm:@galactica-net/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-galactica/ | TODO | Sayfer | TODO | - |
| Non-functional Demo Samples | 2023-12-05 13:56:05 | npm:@galactica-net/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-galactica/ | TODO | Sayfer | TODO | - |
| Instance Of Outdated Cryptography | 2024-02-24 00:00:00 | npm:@gobob/bob-snap | https://github.com/bob-collective/bob-snap/blob/master/docs/audit.pdf | TODO | Cure53 | TODO | - |
| Floating Dependency Versions | 2024-07-09 20:40:16 | npm:@harbour-fi/ramp-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-harbour/ | TODO | Sayfer | TODO | - |
| Geterrormessage() Returns An Empty String | 2023-10-02 08:28:52 | npm:@kunalabs-io/sui-metamask-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-kunalabs/ | TODO | Sayfer | TODO | - |
| Floating Dependency Versions | 2024-05-15 14:23:43 | npm:@nufi/cardano-metamask-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-nufi/ | TODO | Sayfer | TODO | - |
| No Warning On Signing Arbitrary Data | 2024-05-15 14:23:43 | npm:@nufi/cardano-metamask-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-nufi/ | TODO | Sayfer | TODO | - |
| Low Log Limit | 2023-09-13 17:18:23 | npm:@pianity/arsnap | https://sayfer.io/audits/pianity-snap | TODO | Sayfer | Low | - |
| Todos In The Code | 2023-09-13 17:18:23 | npm:@pianity/arsnap | https://sayfer.io/audits/pianity-snap | TODO | Sayfer | TODO | - |
| Misleading Return Value | 2023-09-13 17:18:23 | npm:@pianity/arsnap | https://sayfer.io/audits/pianity-snap | TODO | Sayfer | TODO | - |
| Unhelpful Error Message | 2023-09-13 17:18:23 | npm:@pianity/arsnap | https://sayfer.io/audits/pianity-snap | TODO | Sayfer | TODO | - |
| Vault | 2023-09-13 17:18:23 | npm:@pianity/arsnap | https://sayfer.io/audits/pianity-snap | TODO | Sayfer | TODO | - |
| Arsnap/adapter | 2023-09-13 17:18:23 | npm:@pianity/arsnap | https://sayfer.io/audits/pianity-snap | TODO | Sayfer | TODO | - |
| Missing Summary Field In Createoperation | 2023-09-13 17:18:23 | npm:@pianity/arsnap | https://sayfer.io/audits/pianity-snap | TODO | Sayfer | TODO | - |
| No Warning When Signing Arbitrary Data | 2024-02-26 11:47:58 | npm:@polkagate/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-polkagate-snap/ | TODO | Sayfer | TODO | - |
| Incomplete Unit Test Coverage | 2024-02-26 11:47:58 | npm:@polkagate/snap | https://sayfer.io/audits/metamask-snap-audit-report-for-polkagate-snap/ | TODO | Sayfer | TODO | - |
| Fetchaddress - Inaccurate Function Name | 2023-07-03 11:46:54 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensysdiligence | TODO | - |
| Non-existent Base Config (eslint, Tsconfig) | 2023-07-03 11:46:54 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensysdiligence | TODO | - |
| Superfluous Permission Endowment:ethereum-provider | 2023-07-03 11:46:54 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensysdiligence | TODO | - |
| Package.json - Invalid License | 2023-07-03 11:46:54 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensysdiligence | TODO | - |
| A Trusted Website Can Add Any Address To The Snaps Address Storage; No Control Over Added Addresses; Confirmation Is A Notification | 2023-07-03 11:46:54 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensysdiligence | TODO | - |
| Unused Import Ethers, @metamask/snaps-ui | 2023-07-03 11:46:54 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensysdiligence | TODO | - |
| Currentepoch - Unnecesary Conversion From/to String | 2023-07-03 11:46:54 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensysdiligence | TODO | - |
| Api Design - Consider Using Consistent Rpc Method Names | 2023-07-03 11:46:54 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensysdiligence | TODO | - |
| Performance - Await In For Loop | 2023-07-03 11:46:54 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensysdiligence | TODO | - |
| User Flow - Request To Sign Message Does Not Provide Security Guarantee | 2023-07-03 11:46:54 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensysdiligence | Low | - |
| Typescript Errors | 2023-07-03 11:46:54 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensysdiligence | TODO | - |
| Avoid Hardcoding The Local Snap Id | 2023-07-03 11:46:54 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensysdiligence | TODO | - |
| Persisteddata Race Where Snap_managestate.get Returnsnull | 2023-07-03 11:46:54 | npm:@pushprotocol/snap | https://consensys.io/diligence/audits/2023/07/push-protocol-snap-for-metamask/ | TODO | Consensysdiligence | TODO | - |
| Chain Id Is Read From Node Instead Of Transaction Information | 2024-08-27 03:07:02 | npm:@quickintel/quickintel-snap | https://github.com/Quick-Intel/quickintel-snap/blob/main/VAR_quickintel_snap.pdf | TODO | Veridise | TODO | - |
| Hardcoded Api Key | 2024-08-27 03:07:02 | npm:@quickintel/quickintel-snap | https://github.com/Quick-Intel/quickintel-snap/blob/main/VAR_quickintel_snap.pdf | TODO | Veridise | TODO | - |
| Incorrect Http Response Error Handling For Api Endpoint | 2024-08-27 03:07:02 | npm:@quickintel/quickintel-snap | https://github.com/Quick-Intel/quickintel-snap/blob/main/VAR_quickintel_snap.pdf | TODO | Veridise | TODO | - |
| Unnecessary Rpc Permission | 2024-08-27 03:07:02 | npm:@quickintel/quickintel-snap | https://github.com/Quick-Intel/quickintel-snap/blob/main/VAR_quickintel_snap.pdf | TODO | Veridise | TODO | - |
| Api Endpoint Call Is Missing Recipient Address | 2024-08-27 03:07:02 | npm:@quickintel/quickintel-snap | https://github.com/Quick-Intel/quickintel-snap/blob/main/VAR_quickintel_snap.pdf | TODO | Veridise | TODO | - |
| Potential Save Of Arbitrary Credentials | 2024-08-27 03:06:57 | npm:@rarimo/rarime | https://github.com/rarimo/rarime/blob/main/audits/halborn_2023-08-28.pdf | TODO | Halborn | TODO | - |
| Restrict Sites | 2024-08-27 03:06:57 | npm:@rarimo/rarime | https://github.com/rarimo/rarime/blob/main/audits/halborn_2023-08-28.pdf | TODO | Halborn | TODO | - |
| Dependencies Should Be Pinned To Exact Versions | 2024-08-27 03:06:57 | npm:@rarimo/rarime | https://github.com/rarimo/rarime/blob/main/audits/halborn_2023-08-28.pdf | TODO | Halborn | TODO | - |
| Potential Generation Of Arbitrary Proofs | 2024-08-27 03:06:57 | npm:@rarimo/rarime | https://github.com/rarimo/rarime/blob/main/audits/halborn_2023-08-28.pdf | TODO | Halborn | TODO | - |
| Localhost String Included On The Allow-list | 2024-01-18 00:00:00 | npm:@safeheron/mpcsnap | https://cure53.de/pentest-report_safeheron-snap.pdf | TODO | Cure53 | Low | - |
| Key Generation Overwrites Previous Mpc Account | 2024-01-18 00:00:00 | npm:@safeheron/mpcsnap | https://cure53.de/pentest-report_safeheron-snap.pdf | TODO | Cure53 | TODO | - |
| Suboptimal State Follows Request Flow | 2024-01-18 00:00:00 | npm:@safeheron/mpcsnap | https://cure53.de/pentest-report_safeheron-snap.pdf | TODO | Cure53 | Low | - |
| Request Signatures Require No User-modal Interaction | 2024-01-18 00:00:00 | npm:@safeheron/mpcsnap | https://cure53.de/pentest-report_safeheron-snap.pdf | TODO | Cure53 | TODO | - |
| Private Key Logged In The Console | 2024-01-18 00:00:00 | npm:@safeheron/mpcsnap | https://cure53.de/pentest-report_safeheron-snap.pdf | TODO | Cure53 | TODO | - |
| Length Field In Csafehash256/512::write Can Overflow | 2024-02-05 00:00:00 | npm:@safeheron/mpcsnap | https://leastauthority.com/wp-content/uploads/2024/02/Safeheron_Crypto_Suites__Multiparty_ECDSA_Updated_Final_Audit_Report_Least_Authority.pdf | TODO | Leastauthority | Low | - |
| Missing Check In Feldman’s Secret Sharing Allows For Threshold | 2024-02-05 00:00:00 | npm:@safeheron/mpcsnap | https://leastauthority.com/wp-content/uploads/2024/02/Safeheron_Crypto_Suites__Multiparty_ECDSA_Updated_Final_Audit_Report_Least_Authority.pdf | TODO | Leastauthority | Low | - |
| Incorrect Cofactor Handling In Pubkeyrecovery | 2024-02-05 00:00:00 | npm:@safeheron/mpcsnap | https://leastauthority.com/wp-content/uploads/2024/02/Safeheron_Crypto_Suites__Multiparty_ECDSA_Updated_Final_Audit_Report_Least_Authority.pdf | TODO | Leastauthority | TODO | - |
| Missing Check In Feldman’s Secret Sharing Allows For Threshold Escalation [known | 2024-02-05 00:00:00 | npm:@safeheron/mpcsnap | https://leastauthority.com/wp-content/uploads/2024/02/Safeheron_Crypto_Suites__Multiparty_ECDSA_Updated_Final_Audit_Report_Least_Authority.pdf | TODO | Leastauthority | Low | - |
| Sanity Check Assertions Are Compiled Away In Release Mode | 2024-02-05 00:00:00 | npm:@safeheron/mpcsnap | https://leastauthority.com/wp-content/uploads/2024/02/Safeheron_Crypto_Suites__Multiparty_ECDSA_Updated_Final_Audit_Report_Least_Authority.pdf | TODO | Leastauthority | TODO | - |
| Missing Checks In Ecdsa Signature Verification | 2024-02-05 00:00:00 | npm:@safeheron/mpcsnap | https://leastauthority.com/wp-content/uploads/2024/02/Safeheron_Crypto_Suites__Multiparty_ECDSA_Updated_Final_Audit_Report_Least_Authority.pdf | TODO | Leastauthority | TODO | - |
| Shapeshift Manages Metamasks Ethereum Private Keys | 2023-07-24 08:35:44 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensysdiligence | TODO | - |
| Avalanche Rpc Endpoints Avax_* Are Enabled In The Snap But Disabled In The Sandbox App | 2023-07-24 08:35:44 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensysdiligence | TODO | - |
| Misleading Error Message (copy-paste) | 2023-07-24 08:35:44 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensysdiligence | TODO | - |
| Notify On Chain Switches And Allow Users To Restrict Access To Chain Specific Functionality And Data | 2023-07-24 08:35:44 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensysdiligence | Low | - |
| Rpc [eth|avax]_signmessage Endpoints Return Errors | 2023-07-24 08:35:44 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensysdiligence | TODO | - |
| Rpc Eth_getaddress Undermines Metamask Security Features By Exposing All Accounts W/o Explicit User Consent | 2023-07-24 08:35:44 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensysdiligence | TODO | - |
| Every Rpc Request Leads To The Creation Of A New Signer Object | 2023-07-24 08:35:44 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensysdiligence | TODO | - |
| Asynchronicity Might Lead To An Undefined Ethereum Provider | 2023-07-24 08:35:44 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensysdiligence | TODO | - |
| Unused Interface Declaration | 2023-07-24 08:35:44 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensysdiligence | TODO | - |
| Signing Request Fails To Display Origin And User Account On Confirmation Message | 2023-07-24 08:35:44 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensysdiligence | TODO | - |
| Superfluous Permission Endowment:network-access | 2023-07-24 08:35:44 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensysdiligence | TODO | - |
| Rpc Eth_signmessage Allows Linked Dapps To Sign Messages With Any Wallet Account And W/o Explicit User Consent | 2023-07-24 08:35:44 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensysdiligence | Low | - |
| Rpc *_signtransaction Endpoints Should Display Human Readable Transaction Data | 2023-07-24 08:35:44 | npm:@shapeshiftoss/metamask-snaps | https://consensys.io/diligence/audits/2023/07/metamask/partner-snaps-shapeshift-snap/ | TODO | Consensysdiligence | TODO | - |
| Sign Request Popup Handles Newlines Incorrectly | 2023-09-07 00:00:00 | npm:@silencelaboratories/silent-shard-snap | https://cure53.de/pentest-report_silencelabs-snap.pdf | TODO | Cure53 | TODO | - |
| Valid Jwt Forgery Containing Arbitrary User Ids | 2023-09-07 00:00:00 | npm:@silencelaboratories/silent-shard-snap | https://cure53.de/pentest-report_silencelabs-apps.pdf | TODO | Cure53 | TODO | - |
| Idor In Sendmessage's Cloud Functions Api | 2023-09-07 00:00:00 | npm:@silencelaboratories/silent-shard-snap | https://cure53.de/pentest-report_silencelabs-apps.pdf | TODO | Cure53 | TODO | - |
| Seed Phrase Leakage In Mobile Application Memory | 2023-09-07 00:00:00 | npm:@silencelaboratories/silent-shard-snap | https://cure53.de/pentest-report_silencelabs-apps.pdf | TODO | Cure53 | TODO | - |
| Seed Phrase Leakage Via Dynamic Instrumentation | 2023-09-07 00:00:00 | npm:@silencelaboratories/silent-shard-snap | https://cure53.de/pentest-report_silencelabs-apps.pdf | TODO | Cure53 | TODO | - |
| Sign Request Screen Handles Newlines Incorrectly | 2023-09-07 00:00:00 | npm:@silencelaboratories/silent-shard-snap | https://cure53.de/pentest-report_silencelabs-apps.pdf | TODO | Cure53 | TODO | - |
| Misleading Html Entity And Function Name Getprivkey | 2023-08-21 10:55:22 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensysdiligence | TODO | - |
| Use Of Outdated Snap.config.json Instead Of Snap.config.js | 2023-08-21 10:55:22 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensysdiligence | TODO | - |
| Consider Using @metamask/detect-provider | 2023-08-21 10:55:22 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensysdiligence | TODO | - |
| Inconsistent Or Blank Fields In Package.json | 2023-08-21 10:55:22 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensysdiligence | TODO | - |
| Dapp May Force A Sign Approval Dialog Without Showing The Message To Be Signed | 2023-08-21 10:55:22 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensysdiligence | TODO | - |
| Production Builds Allow Development And Localhost Origins; Snap Does Not Enforce Transport Security | 2023-08-21 10:55:22 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensysdiligence | Low | - |
| Consider Moving To Typescript | 2023-08-21 10:55:22 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensysdiligence | TODO | - |
| Dapp May Suppress User Confirmation On Request To Extract Pubkey; May Extract Any Net-key | 2023-08-21 10:55:22 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensysdiligence | TODO | - |
| Consider Prefixing Rpc Calls With Solana_*, Sui_*, Aptos_* | 2023-08-21 10:55:22 | npm:@solflare-wallet/solana-snap | https://consensys.io/diligence/audits/2023/08/solflare-metamask-snaps-solflare-sui-aptos/ | TODO | Consensysdiligence | TODO | - |
| Deletetoken Should Prompt User For Its Consent | 2024-04-09 13:39:49 | npm:@tezoroproject/snap | https://consensys.io/diligence/audits/2024/04/tezoro-snap/ | TODO | Consensysdiligence | TODO | - |
| Getpriceofassetquotedinusd Might Return Flawed Asset Prices | 2024-04-09 13:39:49 | npm:@tezoroproject/snap | https://consensys.io/diligence/audits/2024/04/tezoro-snap/ | TODO | Consensysdiligence | TODO | - |
| Cronjob Checktokens Might Flood User Notifications | 2024-04-09 13:39:49 | npm:@tezoroproject/snap | https://consensys.io/diligence/audits/2024/04/tezoro-snap/ | TODO | Consensysdiligence | TODO | - |
| Cronjob Checktokens Return Value Is Not Necessary | 2024-04-09 13:39:49 | npm:@tezoroproject/snap | https://consensys.io/diligence/audits/2024/04/tezoro-snap/ | TODO | Consensysdiligence | TODO | - |
| Inaccurate Return Value In Checktokens() | 2024-04-09 13:39:49 | npm:@tezoroproject/snap | https://consensys.io/diligence/audits/2024/04/tezoro-snap/ | TODO | Consensysdiligence | TODO | - |
| Lack Of Origin Check On Rpc Requests | 2024-04-09 13:39:49 | npm:@tezoroproject/snap | https://consensys.io/diligence/audits/2024/04/tezoro-snap/ | TODO | Consensysdiligence | TODO | - |
| External/user Input Sanitization | 2024-04-09 13:39:49 | npm:@tezoroproject/snap | https://consensys.io/diligence/audits/2024/04/tezoro-snap/ | TODO | Consensysdiligence | TODO | - |
| No User-email Displayed In Sync Dialog For Gdrive | 2023-08-04 00:00:00 | npm:@tuum-tech/identify | https://github.com/tuum-tech/identify/blob/main/SNAP_AUDIT_REPORT_BY_CURE53.pdf | TODO | Cure53 | TODO | - |
| Dapp Origin Not Displayed In The Snap Ui | 2023-08-04 00:00:00 | npm:@tuum-tech/identify | https://github.com/tuum-tech/identify/blob/main/SNAP_AUDIT_REPORT_BY_CURE53.pdf | TODO | Cure53 | TODO | - |
| A Malicious Actor Can Terminate The Recovery Process | 2024-02-13 00:00:00 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Leastauthority | TODO | - |
| Dkl+19 Does Not Support Key Refresh | 2024-02-13 00:00:00 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Leastauthority | TODO | - |
| Sensitive Api Calls Are Not Restricted | 2024-02-13 00:00:00 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Leastauthority | TODO | - |
| Dkl+19 Does Not Support Key Refresh (second Review) | 2024-02-13 00:00:00 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Leastauthority | TODO | - |
| Security Groups And Security Group Rules Are Both Used For | 2024-02-13 00:00:00 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Leastauthority | TODO | - |
| Sensitive Flag Is Not Set To True For Secret Variables | 2024-02-13 00:00:00 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Leastauthority | TODO | - |
| Egress Traffic Is Allowed To Any Instance | 2024-02-13 00:00:00 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Leastauthority | Low | - |
| Usage Of Unmaintained Cryptographic Library | 2024-02-13 00:00:00 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Leastauthority | TODO | - |
| Security Groups And Security Group Rules Are Both Used For Traffic | 2024-02-13 00:00:00 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Leastauthority | TODO | - |
| Secret Used To Encrypt Shares Sent Over Network | 2024-02-13 00:00:00 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Leastauthority | TODO | - |
| Non-uniform Private Key Generation | 2024-02-13 00:00:00 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Leastauthority | TODO | - |
| Missing Domain Separation For Session Identifier | 2024-02-13 00:00:00 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Leastauthority | TODO | - |
| Http Traffic To Services Is Allowed | 2024-02-13 00:00:00 | npm:@usecapsule/account-snap | https://leastauthority.com/wp-content/uploads/2024/02/Capsule_Signing_and_Permissioning_Toolkit_Updated_2.pdf | TODO | Leastauthority | Low | - |
| Initialization Vector Used Does Not Meet Recommended Best | 2023-09-12 00:00:00 | npm:@web3mq/snap | https://github.com/MetaMask/snaps-registry/files/12604989/Least_Authority_Generative_Labs_MetaMask_Snap_Updated_Final_Audit.pdf | TODO | Leastauthority | TODO | - |
| Unnecessary Usage Of Non-standard Libraries | 2023-09-12 00:00:00 | npm:@web3mq/snap | https://github.com/MetaMask/snaps-registry/files/12604989/Least_Authority_Generative_Labs_MetaMask_Snap_Updated_Final_Audit.pdf | TODO | Leastauthority | TODO | - |
| Weak Key Derivation Algorithm Used | 2023-09-12 00:00:00 | npm:@web3mq/snap | https://github.com/MetaMask/snaps-registry/files/12604989/Least_Authority_Generative_Labs_MetaMask_Snap_Updated_Final_Audit.pdf | TODO | Leastauthority | TODO | - |
| Initialization Vector Used Does Not Meet Recommended Best Practices | 2023-09-12 00:00:00 | npm:@web3mq/snap | https://github.com/MetaMask/snaps-registry/files/12604989/Least_Authority_Generative_Labs_MetaMask_Snap_Updated_Final_Audit.pdf | TODO | Leastauthority | TODO | - |
| Lack Of Unit Test Coverage | 2024-04-18 14:02:14 | npm:@xtreamly/xtreamly_slippage_predictor | https://sayfer.io/audits/metamask-snap-audit-report-for-xtreamly/ | TODO | Sayfer | TODO | - |
| Dependencies Are Not Pinned To Exact Versions | 2024-04-18 14:02:14 | npm:@xtreamly/xtreamly_slippage_predictor | https://sayfer.io/audits/metamask-snap-audit-report-for-xtreamly/ | TODO | Sayfer | TODO | - |
| Leftover Testing Code | 2024-04-18 14:02:14 | npm:@xtreamly/xtreamly_slippage_predictor | https://sayfer.io/audits/metamask-snap-audit-report-for-xtreamly/ | TODO | Sayfer | TODO | - |
| Incorrect Dependency Version | 2024-04-18 14:02:14 | npm:@xtreamly/xtreamly_slippage_predictor | https://sayfer.io/audits/metamask-snap-audit-report-for-xtreamly/ | TODO | Sayfer | TODO | - |
| Simulation Of Multihop Swaps May Be Inaccurate | 2024-04-18 14:02:14 | npm:@xtreamly/xtreamly_slippage_predictor | https://sayfer.io/audits/metamask-snap-audit-report-for-xtreamly/ | TODO | Sayfer | TODO | - |
| Unused Functions | 2023-12-12 17:12:21 | npm:azero-wallet | https://sayfer.io/audits/metamask-snap-audit-report-for-alephzero/ | TODO | Sayfer | TODO | - |
| Type Checking Is Not Uniform | 2023-12-12 17:12:21 | npm:azero-wallet | https://sayfer.io/audits/metamask-snap-audit-report-for-alephzero/ | TODO | Sayfer | TODO | - |
| Non-functioning Example | 2024-02-13 13:49:49 | npm:bch-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-fexcash/ | TODO | Sayfer | TODO | - |
| Missing Unit Tests | 2024-02-13 13:49:49 | npm:bch-snap | https://sayfer.io/audits/metamask-snap-audit-report-for-fexcash/ | TODO | Sayfer | TODO | - |
| Restrict Sites | 2024-08-27 03:06:49 | npm:casper-manager | https://github.com/casper-ecosystem/casper-manager/blob/main/audits/20_06_2023_Casper_Management_Snap_App_WebApp_Pentest_Report_Halborn_Final.pdf | TODO | Halborn | TODO | - |
| Prompt User When Requesting Public Keys | 2024-08-27 03:06:49 | npm:casper-manager | https://github.com/casper-ecosystem/casper-manager/blob/main/audits/20_06_2023_Casper_Management_Snap_App_WebApp_Pentest_Report_Halborn_Final.pdf | TODO | Halborn | TODO | - |
| Dependencies Should Be Pinned To Exact Versions | 2024-08-27 03:06:49 | npm:casper-manager | https://github.com/casper-ecosystem/casper-manager/blob/main/audits/20_06_2023_Casper_Management_Snap_App_WebApp_Pentest_Report_Halborn_Final.pdf | TODO | Halborn | TODO | - |
| Incorrect Rounding Evokes Balance Misinterpretation | 2023-12-15 00:00:00 | npm:dedaub-metamask-snap | https://cure53.de/pentest-report_dedaub-metamask-snap.pdf | TODO | Cure53 | TODO | - |
| Imprecise Conversion Of Chain Id To Uri | 2024-02-02 00:00:00 | npm:defi-armor-snap | https://github.com/Eulith/eulith-metamask-snap/blob/master/audit-report.pdf | TODO | Cure53 | TODO | - |
| Unnecessary Distribution Of Private Key Information | 2023-08-14 09:57:02 | npm:filsnap | https://consensys.io/diligence/audits/2023/08/metamask/partner-snaps-filsnap/ | TODO | Consensysdiligence | TODO | - |
| Missing Timeout In Rpc.call | 2023-08-14 09:57:02 | npm:filsnap | https://consensys.io/diligence/audits/2023/08/metamask/partner-snaps-filsnap/ | TODO | Consensysdiligence | TODO | - |
| Missing Address Protection | 2023-08-14 09:57:02 | npm:filsnap | https://consensys.io/diligence/audits/2023/08/metamask/partner-snaps-filsnap/ | TODO | Consensysdiligence | TODO | - |
| Directly Exposed Private Key Export | 2023-08-14 09:57:02 | npm:filsnap | https://consensys.io/diligence/audits/2023/08/metamask/partner-snaps-filsnap/ | TODO | Consensysdiligence | TODO | - |
| Lack Of Signature Dialog Context And Rpc Origin | 2023-08-14 09:57:02 | npm:filsnap | https://consensys.io/diligence/audits/2023/08/metamask/partner-snaps-filsnap/ | TODO | Consensysdiligence | TODO | - |
| No Way To Disable Approvals Checking, And Transaction Analytics | 2023-07-17 10:41:29 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensysdiligence | TODO | - |
| Devdependencies Erroneously Listed As Dependencies | 2023-07-17 10:41:29 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensysdiligence | TODO | - |
| Properties Of The Transaction Object Might Be Undefined | 2023-07-17 10:41:29 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensysdiligence | TODO | - |
| Consider Submitting Snap Version With Backend Api Requests | 2023-07-17 10:41:29 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensysdiligence | TODO | - |
| Package.json - Missing Author | 2023-07-17 10:41:29 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensysdiligence | TODO | - |
| Assetchangecomponent Displays A Change With Value 0 If Fiatvalue < 0.005 | 2023-07-17 10:41:29 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensysdiligence | TODO | - |
| Server Should Not Rely On Clients’ Randomness | 2023-07-17 10:41:29 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensysdiligence | TODO | - |
| Formatfiatvalue() Can Be Simplified | 2023-07-17 10:41:29 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensysdiligence | TODO | - |
| Extra ‘if’ Statement | 2023-07-17 10:41:29 | npm:wallet-guard-snap | https://consensys.io/diligence/audits/2023/07/wallet-guard/ | TODO | Consensysdiligence | TODO | - |
| Restrict Snap Rpc Access To Trusted Origins | 2023-07-12 00:00:00 | npm:walletchat-metamask-snap | https://drive.google.com/file/d/1pNhN43mMOLiA2jWUF5IbJA-5kmfAod1f/view?usp=drive_link | TODO | Cure53 | TODO | - |
| Arbitrary Dapp Can Retrieve Access Token | 2023-07-12 00:00:00 | npm:walletchat-metamask-snap | https://drive.google.com/file/d/1pNhN43mMOLiA2jWUF5IbJA-5kmfAod1f/view?usp=drive_link | TODO | Cure53 | TODO | - |
| Unsafe Wild Card Targetorigin Usage In Postmessage | 2023-07-12 00:00:00 | npm:walletchat-metamask-snap | https://drive.google.com/file/d/1pNhN43mMOLiA2jWUF5IbJA-5kmfAod1f/view?usp=drive_link | TODO | Cure53 | TODO | - |
| {'name': 'Arbitrary DApp can retrieve access token', 'severity': 'High'} | 07/12/2023 | npm:walletchat-metamask-snap | https://drive.google.com/uc?export=download&id=1pNhN43mMOLiA2jWUF5IbJA-5kmfAod1f | TODO | Cure53 | TODO | - |
| {'name': ' Restrict Snap RPC access to trusted origins', 'severity': 'Medium'} | 07/12/2023 | npm:walletchat-metamask-snap | https://drive.google.com/uc?export=download&id=1pNhN43mMOLiA2jWUF5IbJA-5kmfAod1f | TODO | Cure53 | TODO | - |
| {'name': ' Unsafe wild card targetOrigin usage in postMessage', 'severity': 'Low'} | 07/12/2023 | npm:walletchat-metamask-snap | https://drive.google.com/uc?export=download&id=1pNhN43mMOLiA2jWUF5IbJA-5kmfAod1f | TODO | Cure53 | TODO | - |
| {'name': 'Arbitrary DApp can retrieve access token', 'severity': 'High'} | 12/07/2023 | npm:walletchat-metamask-snap | https://drive.google.com/uc?export=download&id=1dixJw4G4ekcO40GpbH7VmizLTINS5gUL | TODO | Cure53 | TODO | - |
| {'name': ' Restrict Snap RPC access to trusted origins', 'severity': 'Medium'} | 12/07/2023 | npm:walletchat-metamask-snap | https://drive.google.com/uc?export=download&id=1dixJw4G4ekcO40GpbH7VmizLTINS5gUL | TODO | Cure53 | TODO | - |
| {'name': ' Unsafe wild card targetOrigin usage in postMessage', 'severity': 'Low'} | 12/07/2023 | npm:walletchat-metamask-snap | https://drive.google.com/uc?export=download&id=1dixJw4G4ekcO40GpbH7VmizLTINS5gUL | TODO | Cure53 | TODO | - |
| {'name': 'DEPENDENCIES SHOULD BE PINNED TO EXACT VERSIONS', 'severity': 'Low'} | 20/06/2023 | npm:casper-manager | https://raw.githubusercontent.com/casper-ecosystem/casper-manager/main/audits/20_06_2023_Casper_Management_Snap_App_WebApp_Pentest_Report_Halborn_Final.pdf | TODO | Halborn | TODO | - |
| {'name': 'PROMPT USER WHEN REQUESTING PUBLIC KEYS', 'severity': 'Informational'} | 20/06/2023 | npm:casper-manager | https://raw.githubusercontent.com/casper-ecosystem/casper-manager/main/audits/20_06_2023_Casper_Management_Snap_App_WebApp_Pentest_Report_Halborn_Final.pdf | TODO | Halborn | TODO | - |
| {'name': 'RESTRICT SITES', 'severity': 'Informational'} | 20/06/2023 | npm:casper-manager | https://raw.githubusercontent.com/casper-ecosystem/casper-manager/main/audits/20_06_2023_Casper_Management_Snap_App_WebApp_Pentest_Report_Halborn_Final.pdf | TODO | Halborn | TODO | - |
| {'name': 'DApp origin not displayed in the Snap UI', 'severity': 'Medium'} | 08/04/2023 | npm:@tuum-tech/identify | https://raw.githubusercontent.com/tuum-tech/identify/main/SNAP_AUDIT_REPORT_BY_CURE53.pdf | TODO | Cure53 | TODO | - |
| {'name': 'No user confirmation dialog in GDrive configuration', 'severity': 'Low'} | 08/04/2023 | npm:@tuum-tech/identify | https://raw.githubusercontent.com/tuum-tech/identify/main/SNAP_AUDIT_REPORT_BY_CURE53.pdf | TODO | Cure53 | TODO | - |
| {'name': 'No user-email displayed in sync dialog for GDrive', 'severity': 'Medium'} | 08/04/2023 | npm:@tuum-tech/identify | https://raw.githubusercontent.com/tuum-tech/identify/main/SNAP_AUDIT_REPORT_BY_CURE53.pdf | TODO | Cure53 | TODO | - |
| {'name': 'Unused Functions', 'severity': 'Informational'} | 15/08/2023 | npm:@tenderly/metamask-snap | https://raw.githubusercontent.com/Tenderly/tenderly-snap/main/audits/2023-08-Metamask-Snap-PT-for-Tenderly.pdf | TODO | Sayfer | TODO | - |
| {'name': 'Misleading Error Message', 'severity': 'Informational'} | 15/08/2023 | npm:@tenderly/metamask-snap | https://raw.githubusercontent.com/Tenderly/tenderly-snap/main/audits/2023-08-Metamask-Snap-PT-for-Tenderly.pdf | TODO | Sayfer | TODO | - |
| {'name': 'POTENTIAL SAVE OF ARBITRARY CREDENTIALS', 'severity': 'Medium'} | 28/08/2023 | npm:@rarimo/rarime | https://raw.githubusercontent.com/rarimo/rarime/main/audits/halborn_2023-08-28.pdf | TODO | Halborn | TODO | - |
| {'name': 'POTENTIAL GENERATION OF ARBITRARY PROOFS', 'severity': 'Medium'} | 28/08/2023 | npm:@rarimo/rarime | https://raw.githubusercontent.com/rarimo/rarime/main/audits/halborn_2023-08-28.pdf | TODO | Halborn | TODO | - |
| {'name': 'DEPENDENCIES SHOULD BE PINNED TO EXACT VERSIONS', 'severity': 'Low'} | 28/08/2023 | npm:@rarimo/rarime | https://raw.githubusercontent.com/rarimo/rarime/main/audits/halborn_2023-08-28.pdf | TODO | Halborn | TODO | - |
| {'name': 'RESTRICT SITES', 'severity': 'Informational'} | 28/08/2023 | npm:@rarimo/rarime | https://raw.githubusercontent.com/rarimo/rarime/main/audits/halborn_2023-08-28.pdf | TODO | Halborn | TODO | - |
| {'name': 'Hardcoded API key', 'severity': 'Critical'} | 10/10/2023 | npm:@quickintel/quickintel-snap | https://raw.githubusercontent.com/Quick-Intel/quickintel-snap/main/VAR_quickintel_snap.pdf | TODO | Quick intel | TODO | - |
| {'name': 'API endpoint call is missing recipient address', 'severity': 'Medium'} | 10/10/2023 | npm:@quickintel/quickintel-snap | https://raw.githubusercontent.com/Quick-Intel/quickintel-snap/main/VAR_quickintel_snap.pdf | TODO | Quick intel | TODO | - |
| {'name': 'Incorrect HTTP response error handling for API endpoint', 'severity': 'Low'} | 10/10/2023 | npm:@quickintel/quickintel-snap | https://raw.githubusercontent.com/Quick-Intel/quickintel-snap/main/VAR_quickintel_snap.pdf | TODO | Quick intel | TODO | - |
| {'name': 'Potential URL query injection when building link for full audit', 'severity': 'Low'} | 10/10/2023 | npm:@quickintel/quickintel-snap | https://raw.githubusercontent.com/Quick-Intel/quickintel-snap/main/VAR_quickintel_snap.pdf | TODO | Quick intel | TODO | - |
| {'name': 'Chain ID is read from node instead of transaction information', 'severity': 'Low'} | 10/10/2023 | npm:@quickintel/quickintel-snap | https://raw.githubusercontent.com/Quick-Intel/quickintel-snap/main/VAR_quickintel_snap.pdf | TODO | Quick intel | TODO | - |
| {'name': 'Unnecessary RPC permission', 'severity': 'Informational'} | 10/10/2023 | npm:@quickintel/quickintel-snap | https://raw.githubusercontent.com/Quick-Intel/quickintel-snap/main/VAR_quickintel_snap.pdf | TODO | Quick intel | TODO | - |
| {'name': 'Imprecise conversion of Chain ID to URI', 'severity': 'Low'} | 02/02/2024 | TODO | https://raw.githubusercontent.com/Eulith/eulith-metamask-snap/master/audit-report.pdf | TODO | Cure53 | TODO | - |
| {'name': 'Instance of outdated cryptography', 'severity': 'Low'} | 24/02/2024 | npm:@gobob/bob-snap | https://raw.githubusercontent.com/bob-collective/bob-snap/master/docs/audit.pdf | TODO | Cure53 | TODO | - |
| {'name': 'Dependencies with Known Vulnerabilities', 'severity': 'Low'} | 23/06/2023 | npm:tezos-metamask-snap | https://github.com/MetaMask/snaps-registry/files/12543946/Sayfer.-.2023-06.Penetration.Testing.Report.for.Tezos.Metamask.Snap.Application.pdf | TODO | Sayfer | TODO | - |
| {'name': 'Magic Numbers', 'severity': 'Informational'} | 23/06/2023 | npm:tezos-metamask-snap | https://github.com/MetaMask/snaps-registry/files/12543946/Sayfer.-.2023-06.Penetration.Testing.Report.for.Tezos.Metamask.Snap.Application.pdf | TODO | Sayfer | TODO | - |
| {'name': 'Alarming Metamask Prompt', 'severity': 'Informational'} | 23/06/2023 | npm:tezos-metamask-snap | https://github.com/MetaMask/snaps-registry/files/12543946/Sayfer.-.2023-06.Penetration.Testing.Report.for.Tezos.Metamask.Snap.Application.pdf | TODO | Sayfer | TODO | - |
| {'name': 'Comment About Unresolved Issue', 'severity': 'Informational'} | 23/06/2023 | npm:tezos-metamask-snap | https://github.com/MetaMask/snaps-registry/files/12543946/Sayfer.-.2023-06.Penetration.Testing.Report.for.Tezos.Metamask.Snap.Application.pdf | TODO | Sayfer | TODO | - |
| {'name': 'Unused Functions', 'severity': 'Informational'} | 15/08/2023 | npm:@tenderly/metamask-snap | https://github.com/Tenderly/tenderly-snap/blob/main/audits/2023-08-Metamask-Snap-PT-for-Tenderly.pdf | TODO | Sayfer | TODO | - |
| {'name': 'Misleading Error Message', 'severity': 'Informational'} | 15/08/2023 | npm:@tenderly/metamask-snap | https://github.com/Tenderly/tenderly-snap/blob/main/audits/2023-08-Metamask-Snap-PT-for-Tenderly.pdf | TODO | Sayfer | TODO | - |
| {'name': 'No Tests Found', 'severity': 'Medium'} | 13/08/2023 | npm:@leapwallet/metamask-cosmos-snap | https://github.com/MetaMask/snaps-registry/files/12544468/Sayfer.-.2023-08.Penetration.Testing.Report.for.LeapWallet.Snap.-.Updated.pdf | TODO | Sayfer | TODO | - |
| {'name': 'formatAllowanceOption Function is Missing a Default Case', 'severity': 'Low'} | 13/08/2023 | npm:@leapwallet/metamask-cosmos-snap | https://github.com/MetaMask/snaps-registry/files/12544468/Sayfer.-.2023-08.Penetration.Testing.Report.for.LeapWallet.Snap.-.Updated.pdf | TODO | Sayfer | TODO | - |
| {'name': 'tokenToString is Used Before Defined', 'severity': 'Informational'} | 13/08/2023 | npm:@leapwallet/metamask-cosmos-snap | https://github.com/MetaMask/snaps-registry/files/12544468/Sayfer.-.2023-08.Penetration.Testing.Report.for.LeapWallet.Snap.-.Updated.pdf | TODO | Sayfer | TODO | - |
| {'name': 'Snap Hosted Locally', 'severity': 'High'} | 30/08/2023 | npm:web3-security-snap | https://github.com/MetaMask/snaps-registry/files/12544383/Sayfer.-.2023-08.Penetration.Testing.Report.for.AnChain.Snap.pdf | TODO | Sayfer | TODO | - |
| {'name': 'Unexpected Success Message', 'severity': 'Medium'} | 30/08/2023 | npm:web3-security-snap | https://github.com/MetaMask/snaps-registry/files/12544383/Sayfer.-.2023-08.Penetration.Testing.Report.for.AnChain.Snap.pdf | TODO | Sayfer | TODO | - |
| {'name': 'Lack of Documentation', 'severity': 'Low'} | 30/08/2023 | npm:web3-security-snap | https://github.com/MetaMask/snaps-registry/files/12544383/Sayfer.-.2023-08.Penetration.Testing.Report.for.AnChain.Snap.pdf | TODO | Sayfer | TODO | - |
| {'name': 'Wrong Fuction Name', 'severity': 'Low'} | 30/08/2023 | npm:web3-security-snap | https://github.com/MetaMask/snaps-registry/files/12544383/Sayfer.-.2023-08.Penetration.Testing.Report.for.AnChain.Snap.pdf | TODO | Sayfer | TODO | - |
| Unused Parameter | 30/08/2023 | npm:web3-security-snap | https://github.com/MetaMask/snaps-registry/files/12544383/Sayfer.-.2023-08.Penetration.Testing.Report.for.AnChain.Snap.pdf | TODO | Sayfer | Informational | - |
| Missing Unit Tests | 30/08/2023 | npm:web3-security-snap | https://github.com/MetaMask/snaps-registry/files/12544383/Sayfer.-.2023-08.Penetration.Testing.Report.for.AnChain.Snap.pdf | TODO | Sayfer | Informational | - |

