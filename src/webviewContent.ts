import { Uri, Webview } from "vscode";
import { getUri } from "./utilities/getUri";
import { getNonce } from "./utilities/getNonce";

export function getWebviewContent(
  cspSource: string,
  scriptPath: Uri,
  cssPath: Uri,
  imagesPath: Uri,
  webview: Webview,
  extensionUri: Uri
) {
  const webviewUri = getUri(webview, extensionUri, ["dist", "webview.js"]);
  const nonce = getNonce();

  return /*html*/ `<!doctype html>
	<html lang="en">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src ${cspSource} 'nonce-${nonce}'; style-src ${cspSource} 'nonce-${nonce}'; img-src 'nonce-${nonce}';">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bedrock Playground</title>
        <link rel="stylesheet" href="${cssPath}/custom.css">
    </head>

    <body>
        <main>
            <div class="container">
                <h1>Amazon Bedrock: Text Playground</h1>
                <div class="intro-settings">
                    <p> With Amazon Bedrock, you can build and scale generative AI applications using foundation models from Amazon and leading AI startups.</p>
				</div>

                <div class="group">
                    <div class="dropdown-container">
                        <h3> Select a model </h3>
                        <vscode-dropdown id="llm">
                            <vscode-option value="anthropic.claude-3-5-sonnet-20240620-v1:0">Anthropic Claude v3.5 Sonnet</vscode-option>
                            <vscode-option value="anthropic.claude-3-opus-20240229-v1:0">Anthropic Claude v3 Opus</vscode-option>
                            <vscode-option value="anthropic.claude-3-sonnet-20240229-v1:0">Anthropic Claude v3 Sonnet</vscode-option>
                            <vscode-option value="anthropic.claude-3-haiku-20240307-v1:0">Anthropic Claude v3 Haiku</vscode-option>
                            <vscode-option value="anthropic.claude-v2:1">Anthropic Claude v2.1</vscode-option>
                            <vscode-option value="anthropic.claude-v2">Anthropic Claude v2</vscode-option>
                            <vscode-option value="anthropic.claude-instant-v1">Anthropic Claude Instant</vscode-option>
                            <vscode-option value="cohere.command-text-v14">Cohere Command</vscode-option>
                            <vscode-option value="cohere.command-light-text-v14">Cohere Command Light</vscode-option>
                            <vscode-option value="ai21.j2-ultra-v1">AI21 Jurassic-2 Ultra</vscode-option>
                            <vscode-option value="ai21.j2-mid-v1">AI21 Jurassic-2 Mid</vscode-option>
                            <vscode-option value="ai21.jamba-instruct-v1:0">AI21 Jamba Instruct</vscode-option>
                            <vscode-option value="amazon.titan-text-express-v1">Amazon Titan Text G1 - Express</vscode-option>
                            <vscode-option value="amazon.titan-text-lite-v1">Amazon Titan Text G1 - Lite</vscode-option>
                            <vscode-option value="amazon.titan-text-premier-v1:0">Amazon Titan Text G1 - Premier</vscode-option>
                            <vscode-option value="meta.llama2-13b-chat-v1">Meta Llama 2 Chat 13B</vscode-option>
                            <vscode-option value="meta.llama2-70b-chat-v1">Meta Llama 2 Chat 70B</vscode-option>
                            <vscode-option value="meta.llama3-8b-instruct-v1:0">Meta Llama 3 8B Instruct</vscode-option>
                            <vscode-option value="meta.llama3-70b-instruct-v1:0">Meta Llama 3 70B Instruct</vscode-option>
                            <vscode-option value="meta.llama3-1-8b-instruct-v1:0">Meta Llama 3.1 8B Instruct</vscode-option>
                            <vscode-option value="meta.llama3-1-70b-instruct-v1:0">Meta Llama 3.1 70B Instruct</vscode-option>
                            <vscode-option value="meta.llama3-1-405b-instruct-v1:0">Meta Llama 3.1 405B Instruct</vscode-option>
                            <vscode-option value="mistral.mistral-7b-instruct-v0:2">Mistral 7B Instruct</vscode-option>
                            <vscode-option value="mistral.mixtral-8x7b-instruct-v0:1">Mistral 8x7B Instruct</vscode-option>
                            <vscode-option value="mistral.mistral-large-2402-v1:0">Mistral Large (24.02)</vscode-option>
                            <vscode-option value="mistral.mistral-small-2402-v1:0">Mistral Small (24.02)</vscode-option>
                            <vscode-option value="mistral.mistral-large-2407-v1:0">Mistral Large 2 (24.07)</vscode-option>
                        </vscode-dropdown>
                    </div>
                </div>

                <div class="group">
                    <div class="model-card" id="model-card">
                    </div>
                </div>

                <div class="group">
					<h2>Prompt</h2>
                    <vscode-text-area id="promptInput", class="prompt", cols="55", rows="10", resize="vertical", placeholder=""></vscode-text-area>
                    <vscode-button appearance="primary" id="run">Run</vscode-button>
                    <vscode-button appearance="secondary" id="clear">Clear</vscode-button>
                </div>

                <div class="group">
					<h2>Output</h2>
                    <vscode-text-area id="promptResponse", class="prompt", cols="55", rows="10", resize="vertical", disabled=True></vscode-text-area>
                    <vscode-button appearance="primary" id="copy">Copy</vscode-button>
                </div>
            </div>
        <main>

        <script type="module" nonce="${nonce}" src="${webviewUri}"></script>
        <!-- <script src="${scriptPath}/custom.js"></script> -->
    </body>

</html>
`;
}
