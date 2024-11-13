[**Snapper Project**](../../README.md) • **Docs**

***

[Snapper Project](../../README.md) / [processor](../README.md) / processFiles

# Function: processFiles()

> **processFiles**(`projectPath`, `detectorNames`?): `Promise`\<[`Finding`](../../types/type-aliases/Finding.md)[]\>

Processes files in a TypeScript project to find issues based on specified detectors.

## Parameters

• **projectPath**: `string`

The path to the TypeScript project.

• **detectorNames?**: `string`[]

The list of detectors to run. If not provided, all detectors will be applied.

## Returns

`Promise`\<[`Finding`](../../types/type-aliases/Finding.md)[]\>

- A promise that resolves to an array of findings.

## Defined in

[processor.ts:48](https://github.com/asifqatar/Snapper/blob/cbd1e990f7eda7e735082611ff93e8f046c82e35/processor.ts#L48)
