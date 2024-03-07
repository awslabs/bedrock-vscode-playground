# Change Log

All notable changes to the "bedrock-vscode-playground" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## [0.3.0] - 2024-03-07

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
