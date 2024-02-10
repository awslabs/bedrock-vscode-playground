import * as vscode from "vscode";
import { playgroundCommandCallback } from "./commands/playground";
import { generateCommandCallback } from "./commands/generate";

export function activate(context: vscode.ExtensionContext) {
  const playgroundCommand = vscode.commands.registerCommand("bedrock.playground", () =>
    playgroundCommandCallback(context)
  );
  const generateCommand = vscode.commands.registerCommand("bedrock.generate", () =>
    generateCommandCallback()
  );
  context.subscriptions.push(playgroundCommand);
  context.subscriptions.push(generateCommand);

}

// This method is called when the extension is deactivated
// export function deactivate() {}
