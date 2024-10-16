[**Snapper Project**](../../README.md) • **Docs**

***

[Snapper Project](../../README.md) / [processor](../README.md) / processFiles

# Function: processFiles()

> **processFiles**(`projectPath`, `detectorName`?): `Promise`\<[`Finding`](../../types/type-aliases/Finding.md)[]\>

Processes files in a TypeScript project to find issues based on specified detector.

## Parameters

• **projectPath**: `string`

The path to the TypeScript project.

• **detectorName?**: `string`

The specific detector to run. If not provided, all detectors will be applied.

## Returns

`Promise`\<[`Finding`](../../types/type-aliases/Finding.md)[]\>

- A promise that resolves to an array of findings.

## Defined in

[processor.ts:48](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/processor.ts#L48)
