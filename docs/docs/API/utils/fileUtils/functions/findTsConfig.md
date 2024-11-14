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

[utils/fileUtils.ts:34](https://github.com/asifqatar/Snapper/blob/906ddfcaf1558e94a3ec8d6df532b24adee091b6/utils/fileUtils.ts#L34)
