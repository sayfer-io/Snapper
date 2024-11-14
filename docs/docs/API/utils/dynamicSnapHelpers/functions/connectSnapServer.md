***

# Function: connectSnapServer()

> **connectSnapServer**(`port`): `Promise`\<`any`\>

Connects to the Snap server.

This function connects to the Snap server running at the specified port and
returns the `request`, `onHomePage`, and `onTransaction` functions from the
`installSnap` function.

## Parameters

• **port**: `number`

The port number of the Snap server.

## Returns

`Promise`\<`any`\>

An object containing the Snap server functions.

## Defined in

[utils/dynamicSnapHelpers.ts:134](https://github.com/asifqatar/Snapper/blob/906ddfcaf1558e94a3ec8d6df532b24adee091b6/utils/dynamicSnapHelpers.ts#L134)
