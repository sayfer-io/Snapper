---
layout: default
title: "UnusedImportsDetector"
parent: "classes"

---
[**Snapper Project**](../../../README.md) • **Docs**

***

[Snapper Project](../../../README.md) / [detectors/UnusedImports](../README.md) / UnusedImportsDetector

# Class: UnusedImportsDetector

Class to detect unused imports in the source code.
This detector identifies import declarations that are not utilized within the code,
helping to maintain clean and efficient code by removing unnecessary imports.

## Extends

- [`DetectorBase`](../../DetectorBase/classes/DetectorBase.md)

## Constructors

### new UnusedImportsDetector()

> **new UnusedImportsDetector**(): [`UnusedImportsDetector`](UnusedImportsDetector.md)

#### Returns

[`UnusedImportsDetector`](UnusedImportsDetector.md)

#### Overrides

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`constructor`](../../DetectorBase/classes/DetectorBase.md#constructors)

#### Defined in

[detectors/UnusedImports.ts:18](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/UnusedImports.ts#L18)

## Properties

### allowedFileRegexes

> **allowedFileRegexes**: `RegExp`[]

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`allowedFileRegexes`](../../DetectorBase/classes/DetectorBase.md#allowedfileregexes)

#### Defined in

[detectors/DetectorBase.ts:19](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L19)

***

### findings

> `protected` **findings**: [`Finding`](../../../types/type-aliases/Finding.md)[] = `[]`

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`findings`](../../DetectorBase/classes/DetectorBase.md#findings)

#### Defined in

[detectors/DetectorBase.ts:16](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L16)

***

### name

> `protected` **name**: `string`

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`name`](../../DetectorBase/classes/DetectorBase.md#name)

#### Defined in

[detectors/DetectorBase.ts:14](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L14)

***

### riskRating

> `protected` **riskRating**: [`RiskRating`](../../../structures/enumerations/RiskRating.md)

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`riskRating`](../../DetectorBase/classes/DetectorBase.md#riskrating)

#### Defined in

[detectors/DetectorBase.ts:15](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L15)

## Methods

### addFinding()

> **addFinding**(`description`, `filePath`, `lineNum`): `void`

Adds a finding to the findings array.
This method creates a Finding object and logs a debug message before adding it to the findings list.

#### Parameters

• **description**: `string`

Description of the finding.

• **filePath**: `string`

Path of the file where the finding was detected.

• **lineNum**: `number` = `1`

Line number where the finding was detected (default is 1).

#### Returns

`void`

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`addFinding`](../../DetectorBase/classes/DetectorBase.md#addfinding)

#### Defined in

[detectors/DetectorBase.ts:41](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L41)

***

### clearFindings()

> **clearFindings**(): `void`

Clears all findings from the detector.
This method resets the findings array to an empty state.

#### Returns

`void`

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`clearFindings`](../../DetectorBase/classes/DetectorBase.md#clearfindings)

#### Defined in

[detectors/DetectorBase.ts:59](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L59)

***

### getFindings()

> **getFindings**(): [`Finding`](../../../types/type-aliases/Finding.md)[]

Retrieves all findings collected by the detector.

#### Returns

[`Finding`](../../../types/type-aliases/Finding.md)[]

- Array of findings.

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`getFindings`](../../DetectorBase/classes/DetectorBase.md#getfindings)

#### Defined in

[detectors/DetectorBase.ts:75](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L75)

***

### getName()

> **getName**(): `string`

Gets the name of the detector.

#### Returns

`string`

- The name of the detector.

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`getName`](../../DetectorBase/classes/DetectorBase.md#getname)

#### Defined in

[detectors/DetectorBase.ts:67](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L67)

***

### logDebug()

> **logDebug**(`message`): `void`

Logs a debug message.
This method formats the message with the detector's name and logs it at the debug level.

#### Parameters

• **message**: `string`

The message to log.

#### Returns

`void`

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`logDebug`](../../DetectorBase/classes/DetectorBase.md#logdebug)

#### Defined in

[detectors/DetectorBase.ts:93](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L93)

***

### logError()

> **logError**(`message`, `error`?): `void`

Logs an error message.
This method formats the message with the detector's name and logs it at the error level.

#### Parameters

• **message**: `string`

The message to log.

• **error?**: `Error`

Optional error object to log alongside the message.

#### Returns

`void`

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`logError`](../../DetectorBase/classes/DetectorBase.md#logerror)

#### Defined in

[detectors/DetectorBase.ts:103](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L103)

***

### logInfo()

> **logInfo**(`message`): `void`

Logs an informational message.
This method formats the message with the detector's name and logs it at the info level.

#### Parameters

• **message**: `string`

The message to log.

#### Returns

`void`

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`logInfo`](../../DetectorBase/classes/DetectorBase.md#loginfo)

#### Defined in

[detectors/DetectorBase.ts:84](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L84)

***

### logWarning()

> **logWarning**(`message`, `error`?): `void`

Logs a warning message.
This method formats the message with the detector's name and logs it at the warning level.

#### Parameters

• **message**: `string`

The message to log.

• **error?**: `Error`

Optional error object to log alongside the message.

#### Returns

`void`

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`logWarning`](../../DetectorBase/classes/DetectorBase.md#logwarning)

#### Defined in

[detectors/DetectorBase.ts:113](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L113)

***

### run()

> **run**(`sourceFile`): [`Finding`](../../../types/type-aliases/Finding.md)[]

Runs the detector on the specified source file to identify unused imports.

This method orchestrates the detection process by collecting used identifiers,
fetching all import declarations, and then checking each named import, default import,
and namespace import for usage. It reports findings for any unused imports detected.

#### Parameters

• **sourceFile**: `SourceFile`

The source file to analyze for unused imports.

#### Returns

[`Finding`](../../../types/type-aliases/Finding.md)[]

- An array of findings with details about unused imports.

#### Overrides

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`run`](../../DetectorBase/classes/DetectorBase.md#run)

#### Defined in

[detectors/UnusedImports.ts:122](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/UnusedImports.ts#L122)
