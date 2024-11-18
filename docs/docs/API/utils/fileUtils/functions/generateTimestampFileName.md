***

# Function: generateTimestampFileName()

> **generateTimestampFileName**(`filename`?, `extension`?): `string`

Generates a timestamp-based file name.

This function generates a file name that includes a timestamp in the format
`HHMMDDMMYYYYresult.json`. The timestamp is generated using the current date
and time. The base file name and extension can be customized using the
optional parameters.

## Parameters

• **filename?**: `string` = `"result"`

The base name for the file.

• **extension?**: `string` = `"json"`

The file extension.

## Returns

`string`

- The generated file name.

## Defined in

[utils/fileUtils.ts:93](https://github.com/asifqatar/Snapper/blob/e47c50848996c5aee18aed9672ee3a5a1bb1ca7d/utils/fileUtils.ts#L93)
