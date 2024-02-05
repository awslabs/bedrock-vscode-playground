# Bedrock Visual Studio Code Playground

This is a Visual Studio Code (VS Code) extension which allows developers to easily explore and experiment with large language models (LLMs) available in Amazon Bedrock.

This is an open source project and we would love for you to be involved. To contributed, please refer to [CONTRIBUTING.md](./CONTRIBUTING.md).

## Getting Started

You can install this extension from the [VS Code Extension Marketplace](https://marketplace.visualstudio.com/items?itemName=AmazonWebServices-AISolutionsArchitecture.bedrock-vscode-playground)

This extension uses your local AWS credentials to invoke the Amazon Bedrock service. By default, the extension will use the `default` AWS profile will be used. If you want to change the profile to use, you can update `Bedrock Playground: Profile Name` in your User/Workspace settings.

![alt text](media/profileName.png)

## Extension Features

The extension currently has 2 features:

### 1. LLM Playground

The playground environment provides a user interface for exploring and experimenting with LLMs in Amazon Bedrock. To open the playground environment, use the Command Palette and run the command `Bedrock Playground: Open Playground`.

![alt text](media/openPlayground.gif)

You can adjust the inference parameters for each model by configuring your User/Workspace Settings.

### 2. Generate

You can use the `Bedrock Playground: Generate` command to use a LLM from Amazon Bedrock to generate text. You can configure which model to use by updating the setting `BedrockPlayground > Generate: Model ID`.

![alt text](media/generateModelId.png)

To generate text, just run the command `Bedrock Playground: Generate` using the Command Palette. The output will be placed in a new Markdown file.

![alt text](media/generate.gif)

You can also provide context from an active text editor when using the `Bedrock Playground: Generate` command. To provide context, simply select the code or text in your active text editor, run the command using the Command Palette, and input your request.

![alt text](media/generateWithContext.gif)

#### Customize prompt templates

You can customize the prompt templates that are used with the generate command. To customize the template used when there is no context, you should update the setting `Bedrock Playground › Generate: Prompt Template`. The template string should contain a `{REQUEST}` placeholder which will be substituted with the user's request. For example:

`"\n\nHuman: {REQUEST}\nPlease placed your response in <response></response> XML tags.\n\nAssistant:"`

To customize the prompt template that is used when context is provided, you should update the setting `Bedrock Playground › Generate: Contextual Prompt Template`. The template should contain both a `{REQUEST}` placeholder as well as a `{CONTEXT}` placeholder. For example:

`"\n\nHuman: Use the context wrapped in <context></context> tags to respond to a user's request.\nThe user's request will be wrapped in <request></request> tags.\n<context>{CONTEXT}</context>\n<request>{REQUEST}</request>\nPlease place your response in <response></response> tags.\n\nAssistant:"`
