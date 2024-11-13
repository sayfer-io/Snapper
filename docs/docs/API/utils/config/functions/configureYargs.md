[**Snapper Project**](../../../README.md) • **Docs**

***

[Snapper Project](../../../README.md) / [utils/config](../README.md) / configureYargs

# Function: configureYargs()

> **configureYargs**(): `CliOptions`

Configures command-line arguments using yargs.

This function sets up the command-line argument parsing using the `yargs`
library. It defines the following options:

- `path`: The path to the project directory. This is a required option.
- `detectors`: An array of detector names to run. This is an optional option.
- `verbose`: A flag to enable verbose logging. This is an optional option.
- `output`: The path to the output file. This is an optional option.
- `logFile`: The path to the log file. This is an optional option.

The function also includes error handling to display a helpful error message
if the provided arguments are invalid, and then exits the process.

## Returns

`CliOptions`

- The parsed command-line arguments.

## Defined in

[utils/config.ts:31](https://github.com/asifqatar/Snapper/blob/cbd1e990f7eda7e735082611ff93e8f046c82e35/utils/config.ts#L31)
