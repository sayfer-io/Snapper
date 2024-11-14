***

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

[utils/commandUtils.ts:61](https://github.com/asifqatar/Snapper/blob/906ddfcaf1558e94a3ec8d6df532b24adee091b6/utils/commandUtils.ts#L61)
