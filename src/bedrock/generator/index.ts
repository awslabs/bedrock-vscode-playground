/* eslint-disable @typescript-eslint/naming-convention */
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { getWorkspaceConfig } from "../../utilities/getWorkspaceConfig";
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";

/**
 * Abstract class representing a generic text generator.
 *
 * @remarks
 * This class provides a common interface for text generation using a specified model.
 *
 * @abstract
 */
export abstract class Generator {
  /**
   * The identifier of the model used by the generator.
   */
  modelId: string;

  /**
   * Creates the request body for text generation based on the given prompt.
   *
   * @param prompt - The input prompt for text generation.
   * @returns The request body as an object.
   * @abstract
   */
  abstract createRequestBody(prompt: string): object;

  /**
   * Extracts the generated text from the response body.
   *
   * @param responseBody - The response body received from the text generation service.
   * @returns The extracted text.
   * @abstract
   */
  abstract extractResponse(responseBody: any): string;

  /**
   * Creates a new instance of the Generator class.
   *
   * @param modelId - The identifier of the model to be used by the generator.
   */
  constructor(modelId: string) {
    this.modelId = modelId;
  }

  /**
   * Generates text based on the provided prompt using the specified model.
   *
   * @param prompt - The input prompt for text generation.
   * @returns A Promise that resolves to the generated text.
   */
  async generate(prompt: string): Promise<string> {
    // Create a new BedrockRuntimeClient instance
    const client = new BedrockRuntimeClient({
      credentials: fromNodeProviderChain({
        profile: getWorkspaceConfig("profileName"),
      }),
    });

    // Stringify the request body
    var body = JSON.stringify(this.createRequestBody(prompt));

    // Log the request body
    console.log(body);

    // Create an InvokeModelCommand with the specified parameters
    const command = new InvokeModelCommand({
      modelId: this.modelId,
      body: body,
      contentType: "application/json",
    });

    // Send the command to the text generation service and await the response
    const response = await client.send(command);

    // Transform the response body to a string
    const responseString = response.body.transformToString();

    // Log the response string
    console.log(responseString);

    // Extract and return the generated text from the response
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

  extractResponse(responseBody: any): string {
    return responseBody.completion;
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

  extractResponse(responseBody: any): string {
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

  extractResponse(responseBody: any): string {
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

  extractResponse(responseBody: any): string {
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

  extractResponse(responseBody: any): string {
    return responseBody.generation;
  }
}
