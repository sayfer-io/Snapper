---
layout: default
title: "UsedBeforeDefinedInterfacesDetector"
parent: "classes"

---
[**Snapper Project**](../../../README.md) • **Docs**

***

[Snapper Project](../../../README.md) / [detectors/UsedBeforeDefinedInterfaces](../README.md) / UsedBeforeDefinedInterfacesDetector

# Class: UsedBeforeDefinedInterfacesDetector

Class to detect if interfaces are used before they are defined in the given file.
This detector checks for instances where an interface is referenced in the code
prior to its declaration, which can lead to confusion and errors.

## Extends

- [`DetectorBase`](../../DetectorBase/classes/DetectorBase.md)

## Constructors

### new UsedBeforeDefinedInterfacesDetector()

> **new UsedBeforeDefinedInterfacesDetector**(): [`UsedBeforeDefinedInterfacesDetector`](UsedBeforeDefinedInterfacesDetector.md)

#### Returns

[`UsedBeforeDefinedInterfacesDetector`](UsedBeforeDefinedInterfacesDetector.md)

#### Overrides

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`constructor`](../../DetectorBase/classes/DetectorBase.md#constructors)

#### Defined in

[detectors/UsedBeforeDefinedInterfaces.ts:13](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/UsedBeforeDefinedInterfaces.ts#L13)

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

Analyzes the provided source file for interface declarations and their usages.
It traverses the Abstract Syntax Tree (AST) to identify any usages of interfaces
that occur before their respective declarations.

#### Parameters

• **sourceFile**: `SourceFile`

The source file to analyze for interface usage.

#### Returns

[`Finding`](../../../types/type-aliases/Finding.md)[]

- An array of findings detailing any interfaces used before declaration.

#### Overrides

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`run`](../../DetectorBase/classes/DetectorBase.md#run)

#### Defined in

[detectors/UsedBeforeDefinedInterfaces.ts:25](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/UsedBeforeDefinedInterfaces.ts#L25)
