[**Snapper Project**](../../../README.md) • **Docs**

***

[Snapper Project](../../../README.md) / [utils/fileUtils](../README.md) / createTempDir

# Function: createTempDir()

> **createTempDir**(): `string`

Creates a temporary directory for the package audit.
Automatically cleans up the directory when done.

This function creates a temporary directory using the `tmp` library.
The `unsafeCleanup` option is set to `true` to ensure that the directory
and its contents are automatically removed when the process exits.

## Returns

`string`

- The path to the created temporary directory.

## Defined in

[utils/fileUtils.ts:18](https://github.com/asifqatar/Snapper/blob/745a7dc53ba74a10939f2917619e05af16a1385f/utils/fileUtils.ts#L18)
