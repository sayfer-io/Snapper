[**Snapper Project**](../../../README.md) • **Docs**

***

[Snapper Project](../../../README.md) / [detectors/DetectorBase](../README.md) / DetectorBase

# Class: `abstract` DetectorBase

## Extended by

- [`ConsoleLogDetector`](../../ConsoleLog/classes/ConsoleLogDetector.md)
- [`DangerousFunctionsDetector`](../../DangerousFunctions/classes/DangerousFunctionsDetector.md)
- [`DependencyOutdatedDetector`](../../DependencyOutdated/classes/DependencyOutdatedDetector.md)
- [`DependencyVersioningDetector`](../../DependencyVersioning/classes/DependencyVersioningDetector.md)
- [`DeprecatedFunctionsDetector`](../../DeprecatedFunctions/classes/DeprecatedFunctionsDetector.md)
- [`DeprecatedPermissionsDetector`](../../DeprecatedPermissions/classes/DeprecatedPermissionsDetector.md)
- [`ExcessiveCommentsDetector`](../../ExcessiveComments/classes/ExcessiveCommentsDetector.md)
- [`HardcodedSecretsDetector`](../../HardcodedSecrets/classes/HardcodedSecretsDetector.md)
- [`InsecureCryptoLibrariesDetector`](../../InsecureCryptoLibraries/classes/InsecureCryptoLibrariesDetector.md)
- [`InsecureCryptographyDetector`](../../InsecureCryptography/classes/InsecureCryptographyDetector.md)
- [`InsecureRandomnessDetector`](../../InsecureRandomness/classes/InsecureRandomnessDetector.md)
- [`LackOfExceptionHandlingDetector`](../../LackOfExceptionHandling/classes/LackOfExceptionHandlingDetector.md)
- [`LeftoverTODOsDetector`](../../LeftoverTODOs/classes/LeftoverTODOsDetector.md)
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

[detectors/DetectorBase.ts:13](https://github.com/sayfer-io/Snapper/blob/a444e49088c95ab4a94b5ec3502c29e0d5191e98/detectors/DetectorBase.ts#L13)

## Properties

### findings

> `protected` **findings**: [`Finding`](../../../types/type-aliases/Finding.md)[] = `[]`

#### Defined in

[detectors/DetectorBase.ts:11](https://github.com/sayfer-io/Snapper/blob/a444e49088c95ab4a94b5ec3502c29e0d5191e98/detectors/DetectorBase.ts#L11)

***

### name

> `protected` **name**: `string`

#### Defined in

[detectors/DetectorBase.ts:9](https://github.com/sayfer-io/Snapper/blob/a444e49088c95ab4a94b5ec3502c29e0d5191e98/detectors/DetectorBase.ts#L9)

***

### riskRating

> `protected` **riskRating**: [`RiskRating`](../../../structures/enumerations/RiskRating.md)

#### Defined in

[detectors/DetectorBase.ts:10](https://github.com/sayfer-io/Snapper/blob/a444e49088c95ab4a94b5ec3502c29e0d5191e98/detectors/DetectorBase.ts#L10)

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

[detectors/DetectorBase.ts:27](https://github.com/sayfer-io/Snapper/blob/a444e49088c95ab4a94b5ec3502c29e0d5191e98/detectors/DetectorBase.ts#L27)

***

### clearFindings()

> **clearFindings**(): `void`

Clears the findings.

#### Returns

`void`

#### Defined in

[detectors/DetectorBase.ts:44](https://github.com/sayfer-io/Snapper/blob/a444e49088c95ab4a94b5ec3502c29e0d5191e98/detectors/DetectorBase.ts#L44)

***

### getFindings()

> **getFindings**(): [`Finding`](../../../types/type-aliases/Finding.md)[]

#### Returns

[`Finding`](../../../types/type-aliases/Finding.md)[]

#### Defined in

[detectors/DetectorBase.ts:52](https://github.com/sayfer-io/Snapper/blob/a444e49088c95ab4a94b5ec3502c29e0d5191e98/detectors/DetectorBase.ts#L52)

***

### getName()

> **getName**(): `string`

#### Returns

`string`

#### Defined in

[detectors/DetectorBase.ts:48](https://github.com/sayfer-io/Snapper/blob/a444e49088c95ab4a94b5ec3502c29e0d5191e98/detectors/DetectorBase.ts#L48)

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

[detectors/DetectorBase.ts:68](https://github.com/sayfer-io/Snapper/blob/a444e49088c95ab4a94b5ec3502c29e0d5191e98/detectors/DetectorBase.ts#L68)

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

[detectors/DetectorBase.ts:77](https://github.com/sayfer-io/Snapper/blob/a444e49088c95ab4a94b5ec3502c29e0d5191e98/detectors/DetectorBase.ts#L77)

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

[detectors/DetectorBase.ts:60](https://github.com/sayfer-io/Snapper/blob/a444e49088c95ab4a94b5ec3502c29e0d5191e98/detectors/DetectorBase.ts#L60)

***

### run()

> `abstract` **run**(`file`): [`Finding`](../../../types/type-aliases/Finding.md)[]

#### Parameters

• **file**: `SourceFile`

#### Returns

[`Finding`](../../../types/type-aliases/Finding.md)[]

#### Defined in

[detectors/DetectorBase.ts:19](https://github.com/sayfer-io/Snapper/blob/a444e49088c95ab4a94b5ec3502c29e0d5191e98/detectors/DetectorBase.ts#L19)
