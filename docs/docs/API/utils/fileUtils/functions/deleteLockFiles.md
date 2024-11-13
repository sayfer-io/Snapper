**Snapper Project** • **Docs**

***

# Function: deleteLockFiles()

> **deleteLockFiles**(`mainDir`): `string`[]

Deletes all package manager lock files (yarn.lock, pnpm-lock.yaml, package-lock.json)
from the given directory.

This function checks for the existence of the various lock files in the given
directory and deletes them if found. It logs the deletion of each file using
the `logger` module.

## Parameters

• **mainDir**: `string`

The main directory where lock files will be deleted.

## Returns

`string`[]

- An array of the names of the deleted lock files.

## Defined in

[utils/fileUtils.ts:182](https://github.com/asifqatar/Snapper/blob/1d48336393770932279ea1b6ba1c8407a2b1d178/utils/fileUtils.ts#L182)
