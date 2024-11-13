**Snapper Project** • **Docs**

***

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

[utils/commandUtils.ts:18](https://github.com/asifqatar/Snapper/blob/1d48336393770932279ea1b6ba1c8407a2b1d178/utils/commandUtils.ts#L18)
