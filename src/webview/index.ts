/* eslint-disable @typescript-eslint/naming-convention */
import {
  provideVSCodeDesignSystem,
  vsCodeButton,
  Button,
  vsCodeRadioGroup,
  vsCodeRadio,
  vsCodeTextArea,
  vsCodeDropdown,
  vsCodeOption,
} from "@vscode/webview-ui-toolkit";

// Register Webview UI Toolkit web components
provideVSCodeDesignSystem().register(
  vsCodeButton(),
  vsCodeRadioGroup(),
  vsCodeRadio(),
  vsCodeTextArea(),
  vsCodeDropdown(),
  vsCodeOption()
);

import {
  titanTextExpressModelCard,
  titanTextLiteModelCard,
  claude_2_ModelCard,
  claude_2_1_ModelCard,
  claude_3_Sonnet_ModelCard,
  claude_3_Haiku_ModelCard,
  claudeInstantModelCard,
  commandModelCard,
  commandLightModelCard,
  jurassicUltraModelCard,
  jurassicMidModelCard,
  llama_2_ModelCard,
  mistral_7b_Instruct_ModelCard,
  mistral_8x7b_Instruct_ModelCard,
  mistral_Large_ModelCard,
} from "./modelCards";

export const modelCardMapping: Record<string, string> = {
  "anthropic.claude-v2": claude_2_ModelCard,
  "anthropic.claude-v2:1": claude_2_1_ModelCard,
  "anthropic.claude-3-sonnet-20240229-v1:0": claude_3_Sonnet_ModelCard,
  "anthropic.claude-3-haiku-20240307-v1:0": claude_3_Haiku_ModelCard,
  "anthropic.claude-instant-v1": claudeInstantModelCard,
  "cohere.command-text-v14": commandModelCard,
  "cohere.command-light-text-v14": commandLightModelCard,
  "ai21.j2-ultra-v1": jurassicUltraModelCard,
  "ai21.j2-mid-v1": jurassicMidModelCard,
  "amazon.titan-text-express-v1": titanTextExpressModelCard,
  "amazon.titan-text-lite-v1": titanTextLiteModelCard,
  "meta.llama2-13b-chat-v1": llama_2_ModelCard,
  "meta.llama2-70b-chat-v1": llama_2_ModelCard,
  "mistral.mistral-7b-instruct-v0:2": mistral_7b_Instruct_ModelCard,
  "mistral.mixtral-8x7b-instruct-v0:1": mistral_8x7b_Instruct_ModelCard,
  "mistral.mistral-large-2402-v1:0": mistral_Large_ModelCard,
};

// Get access to the VS Code API from within the webview context
const vscode = acquireVsCodeApi();

// Just like a regular webpage we need to wait for the webview
// DOM to load before we can reference any of the HTML elements
// or toolkit components
window.addEventListener("load", main);

// Main function that gets executed once the webview DOM loads
function main() {
  const runButton = document.getElementById("run") as Button;
  const clearButton = document.getElementById("clear") as Button;
  const copyButton = document.getElementById("copy") as Button;
  runButton?.addEventListener("click", handleRunClick);
  clearButton?.addEventListener("click", handleClearClick);
  copyButton?.addEventListener("click", handleCopyClick);
  const selectedLLM = "anthropic.claude-v2:1";
  getModelCard(selectedLLM);
}

export function getModelCard(model: string | null) {
  const modelCardElement = document.getElementById("model-card") as HTMLDivElement;

  while (modelCardElement.firstChild) {
    modelCardElement.removeChild(modelCardElement.firstChild);
  }

  if (model !== null) {
    const modelDescription = modelCardMapping[model] || "";
    modelCardElement.insertAdjacentHTML("afterbegin", modelDescription);
  }
}

function handleRunClick() {
  const prompt = document.getElementById("promptInput") as HTMLInputElement;
  const dropDownElement = document.getElementById("llm") as HTMLDivElement;
  const selectedLLM = dropDownElement.getAttribute("current-value");
  vscode.postMessage({
    prompt: prompt.value,
    selectedLLM: selectedLLM,
  });
}

function handleClearClick() {
  const prompt = document.getElementById("promptInput") as HTMLInputElement;
  prompt.value = '';
}

function handleCopyClick() {
  const currentResponse = document.getElementById("promptResponse") as HTMLInputElement;
  navigator.clipboard.writeText(currentResponse.value);
}

window.addEventListener("change", (event) => {
  const eventTarget = event.target as HTMLInputElement;
  if (eventTarget.id === "llm") {
    const selectedLLM = eventTarget.value;
    console.log(selectedLLM);
    getModelCard(selectedLLM);
  }
});

window.addEventListener("message", (event) => {
  const currentResponse = document.getElementById("promptResponse") as HTMLInputElement;
  const response = event.data.response;
  if (currentResponse !== null) {
    currentResponse.value = response;
  } else {
    console.log("current response is null");
  }
});
