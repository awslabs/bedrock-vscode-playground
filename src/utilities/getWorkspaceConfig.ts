import * as vscode from "vscode";

const BEDROCK_CONFIG_TITLE = "bedrockPlayground";

export function getWorkspaceConfig<T>(configName: string): T | undefined {
  return vscode.workspace.getConfiguration(BEDROCK_CONFIG_TITLE).get(configName);
}
