---
layout: default
title: "Finding"
parent: "type aliases"

---
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

[types/index.d.ts:6](https://github.com/asifqatar/Snapper/blob/631887a19a78ac303c1e0435e30d78f6439baa45/types/index.d.ts#L6)
