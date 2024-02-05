import * as vscode from "vscode";
import * as path from "path";
import { getWebviewContent } from "../../webviewContent";
import { createGenerator } from "../../bedrock";

export function playgroundCommandCallback(context: vscode.ExtensionContext) {
  const cssRoot = vscode.Uri.file(path.join(context.extensionPath, "css"));
  const imagesRoot = vscode.Uri.file(path.join(context.extensionPath, "images"));
  const scriptRoot = vscode.Uri.file(path.join(context.extensionPath, "js"));

  // Create and show a new webview
  const panel = vscode.window.createWebviewPanel(
    "playground",
    "Bedrock Playground",
    vscode.ViewColumn.Beside,
    {
      localResourceRoots: [
        cssRoot,
        imagesRoot,
        scriptRoot,
        vscode.Uri.joinPath(context.extensionUri, "dist"),
      ],
      enableScripts: true,
    }
  );

  const cssPath = panel.webview.asWebviewUri(cssRoot);
  const imagesPath = panel.webview.asWebviewUri(imagesRoot);
  const scriptPath = panel.webview.asWebviewUri(scriptRoot);
  const cspSource = panel.webview.cspSource;

  panel.webview.html = getWebviewContent(
    cspSource,
    scriptPath,
    cssPath,
    imagesPath,
    panel.webview,
    context.extensionUri
  );

  panel.webview.onDidReceiveMessage(
    (message) => {
      vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Window,
          cancellable: false,
          title: "Running prompt",
        },
        (progress) => {
          progress.report({ increment: 0 });
          progress.report({ increment: 100 });
          let generator = createGenerator(message.selectedLLM);
          const p = new Promise<void>((resolve) => {
            generator!
              .generate(message.prompt)
              .then((result) => {
                panel.webview.postMessage({ response: result });
                resolve();
              })
              .catch((error) => {
                console.error(error);
                vscode.window.showErrorMessage(error.message);
                resolve();
              });
          });
          return p;
        }
      );
    },
    undefined,
    context.subscriptions
  );
}
