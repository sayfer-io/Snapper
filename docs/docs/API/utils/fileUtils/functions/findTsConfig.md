[**Snapper Project**](../../../README.md) • **Docs**

***

[Snapper Project](../../../README.md) / [utils/fileUtils](../README.md) / findTsConfig

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

[utils/fileUtils.ts:34](https://github.com/asifqatar/Snapper/blob/cbd1e990f7eda7e735082611ff93e8f046c82e35/utils/fileUtils.ts#L34)
