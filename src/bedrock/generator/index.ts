/* eslint-disable @typescript-eslint/naming-convention */
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { getWorkspaceConfig } from "../../utilities/getWorkspaceConfig";
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";

export abstract class Generator {
  modelId: string;

  abstract createRequestBody(prompt: string): object;

  abstract extractResponse(responseBody: Record<string, unknown>): string;

  constructor(modelId: string) {
    this.modelId = modelId;
  }

  async generate(prompt: string): Promise<string> {
    const client = new BedrockRuntimeClient({
      credentials: fromNodeProviderChain({
        profile: getWorkspaceConfig<string>("profileName"),
      }),
    });

    const body = JSON.stringify(this.createRequestBody(prompt));

    console.log(body);

    const command = new InvokeModelCommand({
      modelId: this.modelId,
      body: body,
      contentType: "application/json",
    });

    const response = await client.send(command);

    const responseString = response.body.transformToString();

    console.log(responseString);

    return this.extractResponse(await JSON.parse(responseString));
  }
}

export class AnthropicClaude extends Generator {
  createRequestBody(prompt: string) {
    return {
      prompt: prompt,
      max_tokens_to_sample: getWorkspaceConfig("anthropicClaude.maxTokensToSample"),
      temperature: getWorkspaceConfig("anthropicClaude.temperature"),
      top_k: getWorkspaceConfig("anthropicClaude.topK"),
      top_p: getWorkspaceConfig("anthropicClaude.topP"),
      stop_sequences: getWorkspaceConfig("anthropicClaude.stopSequences"),
    };
  }

  extractResponse(completionResponse: Record<"completion", string>): string {
    return completionResponse.completion;
  }
}

export class AmazonTitan extends Generator {
  createRequestBody(prompt: string) {
    return {
      inputText: prompt,
      textGenerationConfig: {
        maxTokenCount: getWorkspaceConfig("amazonTitan.maxTokenCount"),
        temperature: getWorkspaceConfig("amazonTitan.temperature"),
        topP: getWorkspaceConfig("amazonTitan.topP"),
        stopSequences: getWorkspaceConfig("amazonTitan.stopSequences"),
      },
    };
  }

  extractResponse(responseBody: Record<"results", { outputText: string }[]>): string {
    return responseBody.results[0].outputText;
  }
}

export class AI21Jurassic2 extends Generator {
  createRequestBody(prompt: string) {
    return {
      prompt: prompt,
      maxTokens: getWorkspaceConfig("AI21 Jurassic-2.maxTokens"),
      temperature: getWorkspaceConfig("AI21 Jurassic-2.temperature"),
      topP: getWorkspaceConfig("AI21 Jurassic-2.topP"),
      stopSequences: getWorkspaceConfig("AI21 Jurassic-2.stopSequences"),
      countPenalty: {
        scale: getWorkspaceConfig("AI21 Jurassic-2.countPenalty.scale"),
        applyToWhitespaces: getWorkspaceConfig("AI21 Jurassic-2.countPenalty.applyToWhitespaces"),
        applyToPunctuations: getWorkspaceConfig("AI21 Jurassic-2.countPenalty.applyToPunctuations"),
        applyToNumbers: getWorkspaceConfig("AI21 Jurassic-2.countPenalty.applyToNumbers"),
        applyToStopwords: getWorkspaceConfig("AI21 Jurassic-2.countPenalty.applyToStopwords"),
        applyToEmojis: getWorkspaceConfig("AI21 Jurassic-2.countPenalty.applyToEmojis"),
      },
      presencePenalty: {
        scale: getWorkspaceConfig("AI21 Jurassic-2.presencePenalty.scale"),
        applyToWhitespaces: getWorkspaceConfig(
          "AI21 Jurassic-2.presencePenalty.applyToWhitespaces"
        ),
        applyToPunctuations: getWorkspaceConfig(
          "AI21 Jurassic-2.presencePenalty.applyToPunctuations"
        ),
        applyToNumbers: getWorkspaceConfig("AI21 Jurassic-2.presencePenalty.applyToNumbers"),
        applyToStopwords: getWorkspaceConfig("AI21 Jurassic-2.presencePenalty.applyToStopwords"),
        applyToEmojis: getWorkspaceConfig("AI21 Jurassic-2.presencePenalty.applyToEmojis"),
      },
      frequencyPenalty: {
        scale: getWorkspaceConfig("AI21 Jurassic-2.frequencyPenalty.scale"),
        applyToWhitespaces: getWorkspaceConfig(
          "AI21 Jurassic-2.frequencyPenalty.applyToWhitespaces"
        ),
        applyToPunctuations: getWorkspaceConfig(
          "AI21 Jurassic-2.frequencyPenalty.applyToPunctuations"
        ),
        applyToNumbers: getWorkspaceConfig("AI21 Jurassic-2.frequencyPenalty.applyToNumbers"),
        applyToStopwords: getWorkspaceConfig("AI21 Jurassic-2.frequencyPenalty.applyToStopwords"),
        applyToEmojis: getWorkspaceConfig("AI21 Jurassic-2.frequencyPenalty.applyToEmojis"),
      },
    };
  }

  extractResponse(responseBody: Record<"completions", { data: { text: string } }[]>): string {
    return responseBody.completions[0].data.text;
  }
}

export class CohereCommand extends Generator {
  createRequestBody(prompt: string) {
    return {
      prompt: prompt,
      temperature: getWorkspaceConfig("cohereCommand.temperature"),
      p: getWorkspaceConfig("cohereCommand.topP"),
      k: getWorkspaceConfig("cohereCommand.topK"),
      max_tokens: getWorkspaceConfig("cohereCommand.maxTokens"),
      stop_sequences: getWorkspaceConfig("cohereCommand.stopSequences"),
      return_likelihoods: getWorkspaceConfig("cohereCommand.returnLikelihoods"),
      truncate: getWorkspaceConfig("cohereCommand.truncate"),
    };
  }

  extractResponse(responseBody: Record<"generations", { text: string }[]>): string {
    return responseBody.generations[0].text;
  }
}

export class Llama2 extends Generator {
  createRequestBody(prompt: string) {
    return {
      prompt: prompt,
      temperature: getWorkspaceConfig("bedrockPlayground.llama2.temperature"),
      top_p: getWorkspaceConfig("bedrockPlayground.llama2.topP"),
      max_gen_len: getWorkspaceConfig("bedrockPlayground.llama2.maximumLength"),
    };
  }

  extractResponse(responseBody: Record<"generation", string>): string {
    return responseBody.generation;
  }
}
