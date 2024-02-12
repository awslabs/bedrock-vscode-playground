import * as vscode from "vscode";

const BEDROCK_CONFIG_TITLE = "bedrockPlayground";

export function getWorkspaceConfig<T>(configName: string): T {
  return vscode.workspace.getConfiguration(BEDROCK_CONFIG_TITLE).get(configName)!; // config will always exist since VSCode uses default if missing
}
