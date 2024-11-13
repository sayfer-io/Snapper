**Snapper Project** • **Docs**

***

# Type Alias: Finding

> **Finding**: `object`

Represents a finding in the source code.

This interface defines the structure of a finding, which is a detected issue or
problem within the source code. It includes the following properties:

- `type`: The type or category of the finding (e.g., "security vulnerability", "code smell").
- `description`: A textual description of the finding, providing more details about the issue.
- `position`: An object that contains information about the location of the finding in the source code:
  - `filePath`: The full path to the file where the finding is located.
  - `lineNum`: The line number within the file where the finding is located.
- `riskRating`: The risk rating associated with the finding, which is an enum of type `RiskRating`.

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

> **riskRating**: [`RiskRating`](../../structures/enumerations/RiskRating.md)

The risk rating associated with the finding.

### type

> **type**: `string`

The type of the finding.

## Defined in

[types/index.d.ts:16](https://github.com/asifqatar/Snapper/blob/1d48336393770932279ea1b6ba1c8407a2b1d178/types/index.d.ts#L16)
