# Change Log

All notable changes to the "bedrock-vscode-playground" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## [0.7.0] - 2024-08-08

### Added

- Support for: Llama 3.1 8B Instruct, Llama 3.1 70B Instruct, Llama 3.1 405B Instruct, Claude 3.5 Sonnet, AI21 Jamba Instruct, Mistral Large 2, Mistral Small, and Amazon Titan Text G1 - Premier

## [0.6.0] - 2024-05-01

### Added

- Support for: Llama 3 8B Instruct, Llama 3 70B Instruct, Claude 3 Opus

## [0.5.0] - 2024-04-05

### Added

- Support for: Mistral Large

## [0.4.0] - 2024-03-26

### Added

- Support for: Claude 3 Haiku

## [0.3.0] - 2024-03-07

### Added

- Support for: Claude 3 Sonnet, Mistral 7B Instruct and Mistral 8x7B Instruct

### Changed

- Inference parameters for Claude models now follow the [Messages API](https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-anthropic-claude-messages.html#model-parameters-anthropic-claude-messages-request-response)

## [0.2.1] - 2024-02-13

### Fixed

- `README` instructions on customizing prompt templates.

## [0.2.0] - 2024-02-12

### Added

- `bedrockPlayground.region` setting to configure the AWS region.

### Fixed

- Resolve AWS credentials using the `bedrockPlayground.profileName` setting.

### Changed

- Moved all model inference parameters to VS Code's `setting.json` for better user experience.

- Consolidate prompt template settings to `bedrockPlayground.generate.promptTemplates`.

## [0.1.1] - 2024-02-07

### Added

- Disclaimer on AWS pricing in `README`.

### Fixed

- Bug where if user opened the Playground for the first time, a model card description would not be displayed.

### Changed

- Updated plugin name to be more friendly when displayed in the marketplace.

## [0.1.0] - 2024-02-05

- Initial release
