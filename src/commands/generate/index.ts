import * as vscode from "vscode";
import { createGenerator } from "../../bedrock";
import { getWorkspaceConfig } from "../../utilities/getWorkspaceConfig";

export function generateCommandCallback() {
  let prompt: string;
  let context: string;
  const editor = vscode.window.activeTextEditor;
  const selection = editor?.selection;
  if (selection && !selection.isEmpty && editor) {
    // Get code selection
    const selectionRange = new vscode.Range(
      selection.start.line,
      selection.start.character,
      selection.end.line,
      selection.end.character
    );
    context = editor.document.getText(selectionRange);
  }
  vscode.window
    .showInputBox({
      placeHolder: "Document this function.",
      prompt: "Input your prompt.",
    })
    .then((userRequest) => {
      if (!userRequest) {
        throw new Error("Input was not defined or cancelled.");
      } else {
        const modelId = getWorkspaceConfig("generate.modelId") || "";
        vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Window,
            cancellable: false,
            title: "Generating with " + modelId,
          },
          (progress) => {
            progress.report({ increment: 0 });
            progress.report({ increment: 100 });
            prompt = createPrompt(userRequest, context);
            const generator = createGenerator(modelId);
            const promise = new Promise<void>((resolve) => {
              generator!
                .generate(prompt)
                .then((response) => {
                  vscode.workspace
                    .openTextDocument({
                      content: response,
                      language: "markdown",
                    })
                    .then((result) => {
                      vscode.window.showTextDocument(result);
                      resolve();
                    });
                })
                .catch((error) => {
                  console.error(error);
                  vscode.window.showErrorMessage(error.message);
                  resolve();
                });
            });
            return promise;
          }
        );
      }
    });
}

export function createPrompt(request: string, context: string): string {
  let prompt: string;

  if (context) {
    const promptTemplate = getWorkspaceConfig("generate.contextualPromptTemplate")[0];
    prompt = promptTemplate.replace("{REQUEST}", request).replace("{CONTEXT}", context);
  } else {
    const promptTemplate = getWorkspaceConfig("generate.promptTemplate")[0];
    prompt = promptTemplate.replace("{REQUEST}", request);
  }
  return prompt;
}
