[**Snapper Project**](../../../README.md) • **Docs**

***

[Snapper Project](../../../README.md) / [utils/dynamicSnapHelpers](../README.md) / installDependencies

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

[utils/dynamicSnapHelpers.ts:88](https://github.com/asifqatar/Snapper/blob/cbd1e990f7eda7e735082611ff93e8f046c82e35/utils/dynamicSnapHelpers.ts#L88)
