[**Snapper Project**](../../../README.md) • **Docs**

***

[Snapper Project](../../../README.md) / [utils/commandUtils](../README.md) / killAllChildProcesses

# Function: killAllChildProcesses()

> **killAllChildProcesses**(): `void`

Kills all running child processes.

This function terminates all child processes that were spawned using the
`runCommandDetached` function. It iterates through the list of child
processes and attempts to kill each one, including the entire process group.
If any errors occur during the termination process, they are logged.

## Returns

`void`

## Defined in

[utils/commandUtils.ts:100](https://github.com/asifqatar/Snapper/blob/cbd1e990f7eda7e735082611ff93e8f046c82e35/utils/commandUtils.ts#L100)
