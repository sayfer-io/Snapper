***

# Function: installDependencies()

> **installDependencies**(`tempDir`, `packageManager`): `void`

Installs dependencies in the temporary directory.

This function installs the project dependencies in the temporary directory
using the specified package manager (pnpm, yarn, or npm). It uses the
`runCommand` utility to execute the appropriate command for each package
manager.

## Parameters

• **tempDir**: `string`

The path to the temporary directory.

• **packageManager**: `string`

The package manager to use.

## Returns

`void`

## Defined in

[utils/dynamicSnapHelpers.ts:88](https://github.com/asifqatar/Snapper/blob/e47c50848996c5aee18aed9672ee3a5a1bb1ca7d/utils/dynamicSnapHelpers.ts#L88)
