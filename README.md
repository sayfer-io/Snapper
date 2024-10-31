# Snapper 🐠

Snapper aims to improve the overall security and reliability of Metamask Snaps by identifying vulnerabilities, potential issues, and ensuring best coding practices.

## Getting Started

To set up the environment, follow these steps:

1. **Install project dependencies**:

To install the required project dependencies, run:

```bash
npm install
```

## Setting Up an Example Test

To prepare an example test, follow these steps:

1. **Clone the repository**:

Clone the example repository for a sample Metamask Snap:

```bash
git clone https://github.com/Consensys/starknet-snap
```

2. **Navigate to the project directory**:

```bash
cd starknet-snap
```

3. **Reset the repository to a vulnerable commit**:

For consistent results, reset to a vulnerable commit:

```bash
git reset --hard d9beafe
```

## Running the Test Case

1. Build the environment

Set up the test environment by running:

```bash
/bin/bash buildenv.sh
```

2. Verify the application runs

Get the usage of the Snapper application with:

```bash
npm run start --help

> snapper@1.0.0 start
> npx ts-node main.ts

Options:
      --version    Show version number                                 [boolean]
  -p, --path       Project path                              [string] [required]
  -d, --detectors  Specify which detector to run, specify multiple detectors
                   with a comma                                         [string]
  -v, --verbose    Enable verbose logging             [boolean] [default: false]
  -o, --output     Specify output file                                  [string]
  -l, --logFile    Specify log file path                                [string]
      --help       Show help                                           [boolean]
```

3. Run test cases

Run Snapper against test cases in the specified directory:

```bash
npm run start -- --path ./testcases
```
