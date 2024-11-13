**Snapper Project** • **Docs**

***

# Function: copySnapToTempDirectory()

> **copySnapToTempDirectory**(`directory`): `string`

Copies the Snap directory to a temporary directory.

This function creates a new temporary directory using the `createTempDir`
function, and then recursively copies the contents of the given Snap
directory to the temporary directory.

## Parameters

• **directory**: `string`

The Snap directory to copy.

## Returns

`string`

The path to the temporary directory.

## Defined in

[utils/dynamicSnapHelpers.ts:47](https://github.com/asifqatar/Snapper/blob/1d48336393770932279ea1b6ba1c8407a2b1d178/utils/dynamicSnapHelpers.ts#L47)
