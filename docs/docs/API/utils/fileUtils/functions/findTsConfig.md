**Snapper Project** • **Docs**

***

# Function: findTsConfig()

> **findTsConfig**(`projectPath`): `Promise`\<`string`[]\>

Finds all `tsconfig.json` files in the given project path.

This function recursively searches the given project directory and its subdirectories
for any `tsconfig.json` files. It returns an array of the full paths to all found
`tsconfig.json` files.

## Parameters

• **projectPath**: `string`

The path to the project directory.

## Returns

`Promise`\<`string`[]\>

- A promise that resolves to an array of paths to `tsconfig.json` files.

## Defined in

[utils/fileUtils.ts:34](https://github.com/asifqatar/Snapper/blob/1d48336393770932279ea1b6ba1c8407a2b1d178/utils/fileUtils.ts#L34)
