[**Snapper Project**](../../../README.md) • **Docs**

***

[Snapper Project](../../../README.md) / [utils/commandUtils](../README.md) / runCommandDetached

# Function: runCommandDetached()

> **runCommandDetached**(`command`, `args`, `cwd`, `onOutput`): `void`

Runs a command in a detached process.

This function spawns a child process to run the given command and arguments in
the specified working directory. The child process is detached from the
parent process, and the output is handled by the provided `onOutput` callback
function.

## Parameters

• **command**: `string`

The command to run.

• **args**: `string`[]

The arguments for the command.

• **cwd**: `string`

The current working directory for the command.

• **onOutput**

Callback function to handle the command output.

## Returns

`void`

## Defined in

[utils/commandUtils.ts:61](https://github.com/asifqatar/Snapper/blob/745a7dc53ba74a10939f2917619e05af16a1385f/utils/commandUtils.ts#L61)
