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

[utils/commandUtils.ts:100](https://github.com/asifqatar/Snapper/blob/906ddfcaf1558e94a3ec8d6df532b24adee091b6/utils/commandUtils.ts#L100)
