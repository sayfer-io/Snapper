[**Snapper Project**](../../../README.md) • **Docs**

***

[Snapper Project](../../../README.md) / [detectors/StrictNullChecks](../README.md) / StrictNullChecksDetector

# Class: StrictNullChecksDetector

Class to detect if strict null checks are not enabled in tsconfig.json.

## Extends

- [`DetectorBase`](../../DetectorBase/classes/DetectorBase.md)

## Constructors

### new StrictNullChecksDetector()

> **new StrictNullChecksDetector**(): [`StrictNullChecksDetector`](StrictNullChecksDetector.md)

#### Returns

[`StrictNullChecksDetector`](StrictNullChecksDetector.md)

#### Overrides

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`constructor`](../../DetectorBase/classes/DetectorBase.md#constructors)

#### Defined in

[detectors/StrictNullChecks.ts:13](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/StrictNullChecks.ts#L13)

## Properties

### findings

> `protected` **findings**: [`Finding`](../../../types/type-aliases/Finding.md)[] = `[]`

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`findings`](../../DetectorBase/classes/DetectorBase.md#findings)

#### Defined in

[detectors/DetectorBase.ts:14](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L14)

***

### name

> `protected` **name**: `string`

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`name`](../../DetectorBase/classes/DetectorBase.md#name)

#### Defined in

[detectors/DetectorBase.ts:12](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L12)

***

### riskRating

> `protected` **riskRating**: [`RiskRating`](../../../structures/enumerations/RiskRating.md)

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`riskRating`](../../DetectorBase/classes/DetectorBase.md#riskrating)

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

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`addFinding`](../../DetectorBase/classes/DetectorBase.md#addfinding)

#### Defined in

[detectors/DetectorBase.ts:30](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L30)

***

### clearFindings()

> **clearFindings**(): `void`

Clears the findings.

#### Returns

`void`

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`clearFindings`](../../DetectorBase/classes/DetectorBase.md#clearfindings)

#### Defined in

[detectors/DetectorBase.ts:47](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L47)

***

### getFindings()

> **getFindings**(): [`Finding`](../../../types/type-aliases/Finding.md)[]

#### Returns

[`Finding`](../../../types/type-aliases/Finding.md)[]

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`getFindings`](../../DetectorBase/classes/DetectorBase.md#getfindings)

#### Defined in

[detectors/DetectorBase.ts:55](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L55)

***

### getName()

> **getName**(): `string`

#### Returns

`string`

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`getName`](../../DetectorBase/classes/DetectorBase.md#getname)

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

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`logDebug`](../../DetectorBase/classes/DetectorBase.md#logdebug)

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

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`logError`](../../DetectorBase/classes/DetectorBase.md#logerror)

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

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`logInfo`](../../DetectorBase/classes/DetectorBase.md#loginfo)

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

#### Inherited from

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`logWarning`](../../DetectorBase/classes/DetectorBase.md#logwarning)

#### Defined in

[detectors/DetectorBase.ts:89](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/DetectorBase.ts#L89)

***

### run()

> **run**(`sourceFile`): [`Finding`](../../../types/type-aliases/Finding.md)[]

Runs the detector on the given source file.

#### Parameters

• **sourceFile**: `SourceFile`

The source file to analyze.

#### Returns

[`Finding`](../../../types/type-aliases/Finding.md)[]

- Array of findings with details about the detected issues.

#### Overrides

[`DetectorBase`](../../DetectorBase/classes/DetectorBase.md).[`run`](../../DetectorBase/classes/DetectorBase.md#run)

#### Defined in

[detectors/StrictNullChecks.ts:22](https://github.com/sayfer-io/Snapper/blob/4045f2e5717fa308f1c1fd6496d318bda1e3311b/detectors/StrictNullChecks.ts#L22)
