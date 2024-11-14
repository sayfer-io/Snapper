***

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

[utils/fileUtils.ts:18](https://github.com/asifqatar/Snapper/blob/906ddfcaf1558e94a3ec8d6df532b24adee091b6/utils/fileUtils.ts#L18)
