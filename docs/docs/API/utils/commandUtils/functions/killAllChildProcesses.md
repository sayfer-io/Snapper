***

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

[utils/commandUtils.ts:100](https://github.com/asifqatar/Snapper/blob/e47c50848996c5aee18aed9672ee3a5a1bb1ca7d/utils/commandUtils.ts#L100)
