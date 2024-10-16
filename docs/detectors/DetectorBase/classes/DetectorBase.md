[**Snapper Project**](../../../README.md) • **Docs**

***

[Snapper Project](../../../README.md) / [detectors/DetectorBase](../README.md) / DetectorBase

# Class: `abstract` DetectorBase

Abstract base class for all detectors.

## Extended by

- [`BroadPermissionsDetector`](../../BroadPermissions/classes/BroadPermissionsDetector.md)
- [`ConsoleLogDetector`](../../ConsoleLog/classes/ConsoleLogDetector.md)
- [`DangerousFunctionsDetector`](../../DangerousFunctions/classes/DangerousFunctionsDetector.md)
- [`DependencyOutdatedDetector`](../../DependencyOutdated/classes/DependencyOutdatedDetector.md)
- [`DependencyVersioningDetector`](../../DependencyVersioning/classes/DependencyVersioningDetector.md)
- [`DeprecatedFunctionsDetector`](../../DeprecatedFunctions/classes/DeprecatedFunctionsDetector.md)
- [`DeprecatedPermissionsDetector`](../../DeprecatedPermissions/classes/DeprecatedPermissionsDetector.md)
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
- [`OriginValidation`](../../OriginValidation/classes/OriginValidation.md)
- [`PotentialOutdatedEngineDetector`](../../PotentialOutdatedEngine/classes/PotentialOutdatedEngineDetector.md)
- [`StrictNullChecksDetector`](../../StrictNullChecks/classes/StrictNullChecksDetector.md)
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

#### Parameters

• **name**: `string`

• **riskRating**: [`RiskRating`](../../../structures/enumerations/RiskRating.md)

#### Returns

[`DetectorBase`](DetectorBase.md)

#### Defined in

[detectors/DetectorBase.ts:16](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L16)

## Properties

### findings

> `protected` **findings**: [`Finding`](../../../types/type-aliases/Finding.md)[] = `[]`

#### Defined in

[detectors/DetectorBase.ts:14](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L14)

***

### name

> `protected` **name**: `string`

#### Defined in

[detectors/DetectorBase.ts:12](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L12)

***

### riskRating

> `protected` **riskRating**: [`RiskRating`](../../../structures/enumerations/RiskRating.md)

#### Defined in

[detectors/DetectorBase.ts:13](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L13)

## Methods

### addFinding()

> **addFinding**(`description`, `filePath`, `lineNum`): `void`

Adds a finding to the findings array.

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

[detectors/DetectorBase.ts:30](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L30)

***

### clearFindings()

> **clearFindings**(): `void`

Clears the findings.

#### Returns

`void`

#### Defined in

[detectors/DetectorBase.ts:47](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L47)

***

### getFindings()

> **getFindings**(): [`Finding`](../../../types/type-aliases/Finding.md)[]

#### Returns

[`Finding`](../../../types/type-aliases/Finding.md)[]

#### Defined in

[detectors/DetectorBase.ts:55](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L55)

***

### getName()

> **getName**(): `string`

#### Returns

`string`

#### Defined in

[detectors/DetectorBase.ts:51](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L51)

***

### logDebug()

> **logDebug**(`message`): `void`

Logs a debug message.

#### Parameters

• **message**: `string`

The message to log.

#### Returns

`void`

#### Defined in

[detectors/DetectorBase.ts:71](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L71)

***

### logError()

> **logError**(`message`, `error`?): `void`

Logs an error message.

#### Parameters

• **message**: `string`

The message to log.

• **error?**: `Error`

Optional error object to log.

#### Returns

`void`

#### Defined in

[detectors/DetectorBase.ts:80](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L80)

***

### logInfo()

> **logInfo**(`message`): `void`

Logs an informational message.

#### Parameters

• **message**: `string`

The message to log.

#### Returns

`void`

#### Defined in

[detectors/DetectorBase.ts:63](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L63)

***

### logWarning()

> **logWarning**(`message`, `error`?): `void`

Logs a warning message.

#### Parameters

• **message**: `string`

The message to log.

• **error?**: `Error`

Optional error object to log.

#### Returns

`void`

#### Defined in

[detectors/DetectorBase.ts:89](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L89)

***

### run()

> `abstract` **run**(`file`): [`Finding`](../../../types/type-aliases/Finding.md)[] \| `Promise`\<[`Finding`](../../../types/type-aliases/Finding.md)[]\>

#### Parameters

• **file**: `SourceFile`

#### Returns

[`Finding`](../../../types/type-aliases/Finding.md)[] \| `Promise`\<[`Finding`](../../../types/type-aliases/Finding.md)[]\>

#### Defined in

[detectors/DetectorBase.ts:22](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L22)
