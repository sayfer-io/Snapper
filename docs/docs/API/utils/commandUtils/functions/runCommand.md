[**Snapper Project**](../../../README.md) • **Docs**

***

[Snapper Project](../../../README.md) / [utils/commandUtils](../README.md) / runCommand

# Function: runCommand()

> **runCommand**(`command`, `workingDir`?): `string`

Runs a command in the specified directory.

This function executes the given command in the specified working directory.
If no working directory is provided, it uses the current directory. The
function captures the output of the command and returns it as a string.

## Parameters

• **command**: `string`

The command to run.

• **workingDir?**: `string`

The path to the working directory. If not provided, the current directory is used.

## Returns

`string`

- The command's output.

## Defined in

[utils/commandUtils.ts:18](https://github.com/asifqatar/Snapper/blob/745a7dc53ba74a10939f2917619e05af16a1385f/utils/commandUtils.ts#L18)
