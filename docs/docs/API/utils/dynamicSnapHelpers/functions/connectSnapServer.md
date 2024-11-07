[**Snapper Project**](../../../README.md) • **Docs**

***

[Snapper Project](../../../README.md) / [utils/dynamicSnapHelpers](../README.md) / connectSnapServer

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

[utils/dynamicSnapHelpers.ts:134](https://github.com/asifqatar/Snapper/blob/745a7dc53ba74a10939f2917619e05af16a1385f/utils/dynamicSnapHelpers.ts#L134)
