import {
  AnthropicClaude,
  CohereCommand,
  AI21Jurassic2,
  AmazonTitanText,
  MetaLlama2,
} from "./generator";

export function createGenerator(modelId: string) {
  switch (modelId) {
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
    case "amazon.titan-text-lite-v1":
    case "amazon.titan-text-express-v1":
      return new AmazonTitanText(modelId);
    case "meta.llama2-13b-chat-v1":
    case "meta.llama2-70b-chat-v1":
      return new MetaLlama2(modelId);
    default:
      throw new Error("Model is invalid or not supported.");
  }
}
