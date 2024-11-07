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

[utils/commandUtils.ts:100](https://github.com/asifqatar/Snapper/blob/745a7dc53ba74a10939f2917619e05af16a1385f/utils/commandUtils.ts#L100)
