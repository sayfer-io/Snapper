---
layout: default
title: "DetectorBase"
parent: "classes"

---
[**Snapper Project**](../../../README.md) • **Docs**

***

[Snapper Project](../../../README.md) / [detectors/DetectorBase](../README.md) / DetectorBase

# Class: `abstract` DetectorBase

Abstract base class for all detectors.
This class provides a common structure and utility methods for specific detectors
that will implement the run method to analyze source files for issues.

## Extended by

- [`BroadPermissionsDetector`](../../BroadPermissions/classes/BroadPermissionsDetector.md)
- [`ConsoleLogDetector`](../../ConsoleLog/classes/ConsoleLogDetector.md)
- [`DangerousFunctionsDetector`](../../DangerousFunctions/classes/DangerousFunctionsDetector.md)
- [`DependencyOutdatedDetector`](../../DependencyOutdated/classes/DependencyOutdatedDetector.md)
- [`DependencyVersioningDetector`](../../DependencyVersioning/classes/DependencyVersioningDetector.md)
- [`DeprecatedFunctionsDetector`](../../DeprecatedFunctions/classes/DeprecatedFunctionsDetector.md)
- [`DeprecatedPermissionsDetector`](../../DeprecatedPermissions/classes/DeprecatedPermissionsDetector.md)
- [`ESLintingDetector`](../../ESLinting/classes/ESLintingDetector.md)
- [`ExcessiveCommentsDetector`](../../ExcessiveComments/classes/ExcessiveCommentsDetector.md)
- [`FloatingPointPrecisionDetector`](../../FloatingPointPrecision/classes/FloatingPointPrecisionDetector.md)
- [`HardcodedSecretsDetector`](../../HardcodedSecrets/classes/HardcodedSecretsDetector.md)
- [`ImproperTypeUsageDetector`](../../ImproperTypeUsage/classes/ImproperTypeUsageDetector.md)
- [`InsecureCryptoLibrariesDetector`](../../InsecureCryptoLibraries/classes/InsecureCryptoLibrariesDetector.md)
- [`InsecureCryptographyDetector`](../../InsecureCryptography/classes/InsecureCryptographyDetector.md)
- [`InsecureRandomnessDetector`](../../InsecureRandomness/classes/InsecureRandomnessDetector.md)
- [`LackOfExceptionHandlingDetector`](../../LackOfExceptionHandling/classes/LackOfExceptionHandlingDetector.md)
- [`LeftoverTODOsDetector`](../../LeftoverTODOs/classes/LeftoverTODOsDetector.md)
- [`MissingExplicitStrictTypeCheckingDetector`](../../MissingExplicitStrictTypeChecking/classes/MissingExplicitStrictTypeCheckingDetector.md)
- [`OriginValidationDetector`](../../OriginValidation-temp/classes/OriginValidationDetector.md)
- [`OriginValidationDetector`](../../OriginValidation/classes/OriginValidationDetector.md)
- [`PotentialOutdatedEngineDetector`](../../PotentialOutdatedEngine/classes/PotentialOutdatedEngineDetector.md)
- [`UnhandledPromiseRejectionDetector`](../../UnhandledPromiseRejection/classes/UnhandledPromiseRejectionDetector.md)
- [`UnusedFunctionsDetector`](../../UnusedFunctions/classes/UnusedFunctionsDetector.md)
- [`UnusedImportsDetector`](../../UnusedImports/classes/UnusedImportsDetector.md)
- [`UnusedPermissionsDetector`](../../UnusedPermissions/classes/UnusedPermissionsDetector.md)
- [`UnusedVariablesDetector`](../../UnusedVariables/classes/UnusedVariablesDetector.md)
- [`UsedBeforeDefinedArrowFunctionsDetector`](../../UsedBeforeDefinedArrowFunctions/classes/UsedBeforeDefinedArrowFunctionsDetector.md)
- [`UsedBeforeDefinedFunctionsDetector`](../../UsedBeforeDefinedFunctions/classes/UsedBeforeDefinedFunctionsDetector.md)
- [`UsedBeforeDefinedInterfacesDetector`](../../UsedBeforeDefinedInterfaces/classes/UsedBeforeDefinedInterfacesDetector.md)

## Constructors

### new DetectorBase()

> **new DetectorBase**(`name`, `riskRating`): [`DetectorBase`](DetectorBase.md)

Constructor to initialize the detector with a name and risk rating.

#### Parameters

• **name**: `string`

The name of the detector.

• **riskRating**: [`RiskRating`](../../../structures/enumerations/RiskRating.md)

The risk rating associated with the findings from this detector.

#### Returns

[`DetectorBase`](DetectorBase.md)

#### Defined in

[detectors/DetectorBase.ts:26](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L26)

## Properties

### allowedFileRegexes

> **allowedFileRegexes**: `RegExp`[]

#### Defined in

[detectors/DetectorBase.ts:19](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L19)

***

### findings

> `protected` **findings**: [`Finding`](../../../types/type-aliases/Finding.md)[] = `[]`

#### Defined in

[detectors/DetectorBase.ts:16](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L16)

***

### name

> `protected` **name**: `string`

#### Defined in

[detectors/DetectorBase.ts:14](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L14)

***

### riskRating

> `protected` **riskRating**: [`RiskRating`](../../../structures/enumerations/RiskRating.md)

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

#### Defined in

[detectors/DetectorBase.ts:41](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L41)

***

### clearFindings()

> **clearFindings**(): `void`

Clears all findings from the detector.
This method resets the findings array to an empty state.

#### Returns

`void`

#### Defined in

[detectors/DetectorBase.ts:59](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L59)

***

### getFindings()

> **getFindings**(): [`Finding`](../../../types/type-aliases/Finding.md)[]

Retrieves all findings collected by the detector.

#### Returns

[`Finding`](../../../types/type-aliases/Finding.md)[]

- Array of findings.

#### Defined in

[detectors/DetectorBase.ts:75](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L75)

***

### getName()

> **getName**(): `string`

Gets the name of the detector.

#### Returns

`string`

- The name of the detector.

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

#### Defined in

[detectors/DetectorBase.ts:113](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L113)

***

### run()

> `abstract` **run**(`file`): [`Finding`](../../../types/type-aliases/Finding.md)[] \| `Promise`\<[`Finding`](../../../types/type-aliases/Finding.md)[]\>

#### Parameters

• **file**: `SourceFile`

#### Returns

[`Finding`](../../../types/type-aliases/Finding.md)[] \| `Promise`\<[`Finding`](../../../types/type-aliases/Finding.md)[]\>

#### Defined in

[detectors/DetectorBase.ts:32](https://github.com/asifqatar/Snapper/blob/86c1eb41f9528d02705503143d7fd9f479592c8a/detectors/DetectorBase.ts#L32)
