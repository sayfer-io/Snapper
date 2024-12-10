# Snapper 🐠

![Version](https://img.shields.io/npm/v/@sayfer_io/snapper)
![Release](https://github.com/sayfer-io/Snapper/actions/workflows/release.yaml/badge.svg)
![Documentation](https://github.com/sayfer-io/Snapper/actions/workflows/documentation.yaml/badge.svg)
![Node.js Version](https://img.shields.io/badge/Node.js-v22.3.0-brightgreen)
![TypeScript](https://img.shields.io/badge/types-TypeScript-blue)
![Last Commit](https://img.shields.io/github/last-commit/sayfer-io/Snapper)

Snapper aims to improve the overall security and reliability of **Metamask Snaps** by identifying vulnerabilities, potential issues, and ensuring best coding practices.

---

## Getting Started

### 1. **Installation**

To install **Snapper**, you have multiple options depending on your preferred setup.

#### **Using npm**

To install Snapper globally, run the following command:

```bash
npm install -g @sayfer_io/snapper
```

#### **Using GitHub**

You can also clone the repository and run **Snapper** from your local machine. First, clone the repository:

```bash
git clone https://github.com/sayfer-io/Snapper.git
cd Snapper
npm install
```

#### **Using Docker**

To use **Snapper** with Docker, run the following commands:

```bash
git clone https://github.com/sayfer-io/Snapper.git
docker build -t snapper .
docker run snapper --help
```

---

### 2. **Usage**

Once **Snapper** is installed, you can run it in various ways. Below are the usage instructions for npm, GitHub, and Docker.

#### **Using Snapper**

To run **Snapper** using npm, you can use the following command:

```bash
npx snapper --help
```

This will show you the available options for **Snapper**. Here's an example output:

```bash
> snapper@1.0.0 start
> npx ts-node main.ts

Options:
    --version          Show version number                           [boolean]
    -p, --path             Project path                        [string] [required]
    -d, --detectors        Specify which detector to run, specify multiple
                            detectors with a comma                        [string]
    --ignoreDetectors  Specify which detector to ignore, specify multiple
                            detectors with a comma                        [string]
    -v, --verbose          Enable verbose logging       [boolean] [default: false]
    -o, --output           Specify output file                            [string]
    -l, --logFile          Specify log file                               [string]
    --htmlReport       Generate HTML report         [boolean] [default: false]
    -h, --help             Show help                                     [boolean]
```

To run a test case:

```bash
npm run start -- --path ./starknet-snap
```

## Contributing

We welcome contributions to **Snapper**! If you would like to contribute, please follow the guidelines outlined in our [CONTRIBUTING.md](CONTRIBUTING.md) file.
