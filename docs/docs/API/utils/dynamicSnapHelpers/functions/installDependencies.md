**Snapper Project** • **Docs**

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

[utils/dynamicSnapHelpers.ts:88](https://github.com/asifqatar/Snapper/blob/1d48336393770932279ea1b6ba1c8407a2b1d178/utils/dynamicSnapHelpers.ts#L88)
