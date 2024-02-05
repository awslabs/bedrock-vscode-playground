import * as vscode from "vscode";

const BEDROCK_CONFIG_TITLE: string = "bedrockPlayground";

export function getWorkspaceConfig(configName: string): any | undefined {
  return vscode.workspace.getConfiguration(BEDROCK_CONFIG_TITLE).get(configName);
}
