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

[utils/fileUtils.ts:34](https://github.com/asifqatar/Snapper/blob/e47c50848996c5aee18aed9672ee3a5a1bb1ca7d/utils/fileUtils.ts#L34)
