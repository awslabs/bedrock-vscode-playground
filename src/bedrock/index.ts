import {
  AnthropicClaude,
  CohereCommand,
  AI21Jurassic2,
  AI21JambaInstruct,
  AmazonTitanText,
  MetaLlama2,
  Mistral,
} from "./generator";

export function createGenerator(modelId: string) {
  switch (modelId) {
    case "anthropic.claude-3-5-sonnet-20240620-v1:0":
    case "anthropic.claude-3-opus-20240229-v1:0":
    case "anthropic.claude-3-sonnet-20240229-v1:0":
    case "anthropic.claude-3-haiku-20240307-v1:0":
    case "anthropic.claude-v2:1":
    case "anthropic.claude-v2":
    case "anthropic.claude-instant-v1":
      return new AnthropicClaude(modelId);
    case "cohere.command-text-v14":
    case "cohere.command-light-text-v14":
      return new CohereCommand(modelId);
    case "ai21.j2-ultra-v1":
    case "ai21.j2-mid-v1":
      return new AI21Jurassic2(modelId);
    case "ai21.jamba-instruct-v1:0":
      return new AI21JambaInstruct(modelId);
    case "amazon.titan-text-lite-v1":
    case "amazon.titan-text-express-v1":
      return new AmazonTitanText(modelId);
    case "meta.llama2-13b-chat-v1":
    case "meta.llama2-70b-chat-v1":
    case "meta.llama3-8b-instruct-v1:0":
    case "meta.llama3-70b-instruct-v1:0":
    case "meta.llama3-1-8b-instruct-v1:0":
    case "meta.llama3-1-70b-instruct-v1:0":
    case "meta.llama3-1-405b-instruct-v1:0":
      return new MetaLlama2(modelId);
    case "mistral.mistral-7b-instruct-v0:2":
    case "mistral.mixtral-8x7b-instruct-v0:1":
    case "mistral.mistral-large-2402-v1:0":
    case "mistral.mistral-large-2407-v1:0":
      return new Mistral(modelId);
    default:
      throw new Error("Model is invalid or not supported.");
  }
}
