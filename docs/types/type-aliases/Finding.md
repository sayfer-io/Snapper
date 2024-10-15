[**Snapper Project**](../../README.md) • **Docs**

***

[Snapper Project](../../README.md) / [types](../README.md) / Finding

# Type Alias: Finding

> **Finding**: `object`

Represents a finding in the source code.

## Type declaration

### description

> **description**: `string`

A description of the finding.

### position

> **position**: `object`

The position of the finding in the source code.

### position.filePath

> **filePath**: `string`

The file path where the finding is located.

### position.lineNum

> **lineNum**: `number`

The line number where the finding is located.

### riskRating

> **riskRating**: `RiskRating`

The risk rating associated with the finding.

### type

> **type**: `string`

The type of the finding.

## Defined in

[types/index.d.ts:6](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/types/index.d.ts#L6)
