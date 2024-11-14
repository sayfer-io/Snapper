***

# Function: buildSnap()

> **buildSnap**(`projectFolderPath`): `Promise`\<`void`\>

Prepares the Snap by setting up dependencies and building it.

This function runs the `npx mm-snap build` command in the given project
folder path to build the Snap.

## Parameters

• **projectFolderPath**: `string`

The directory of the Snap.

## Returns

`Promise`\<`void`\>

## Defined in

[utils/dynamicSnapHelpers.ts:120](https://github.com/asifqatar/Snapper/blob/906ddfcaf1558e94a3ec8d6df532b24adee091b6/utils/dynamicSnapHelpers.ts#L120)
