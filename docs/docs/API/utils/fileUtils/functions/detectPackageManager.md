[**Snapper Project**](../../../README.md) • **Docs**

***

[Snapper Project](../../../README.md) / [utils/fileUtils](../README.md) / detectPackageManager

# Function: detectPackageManager()

> **detectPackageManager**(`workingDir`): `string`

Detects the package manager used in the project.

This function detects the package manager used in the project by checking the
`package.json` file and the presence of lock files (yarn.lock, pnpm-lock.yaml,
package-lock.json). It supports Yarn, npm, and pnpm.

## Parameters

• **workingDir**: `string`

The directory where package.json is located.

## Returns

`string`

- The detected package manager ("yarn", "npm", or "pnpm").

## Throws

Will throw an error if no package.json is found in the working directory.

## Defined in

[utils/fileUtils.ts:142](https://github.com/asifqatar/Snapper/blob/cbd1e990f7eda7e735082611ff93e8f046c82e35/utils/fileUtils.ts#L142)
