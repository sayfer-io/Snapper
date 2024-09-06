# Snapper

## Preparing the Environment

To set up the environment, follow these steps:

1. **Install project dependencies**:

   ```bash
   npm install
   ```

2. **Install TypeScript and ts-node globally**:

   ```bash
   npm install -g typescript ts-node
   ```

3. **Install ts-morph**:

   ```bash
   npm install ts-morph
   ```

## Preparing an Example Test

To prepare an example test, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Consensys/starknet-snap
   ```

2. **Navigate to the project directory**:

   ```bash
   cd starknet-snap
   ```

3. **Reset the repository to a specific commit**:

   ```bash
   git reset --hard d9beafe
   ```

## Running the Test Case

To run the test case, use the following command:

```bash
/bin/bash buildenv.sh
ts-node main.ts --path testcases --recursive
```
