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
      region: getWorkspaceConfig<string>("region")
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
      ...getWorkspaceConfig<Record<string, string>>(
        "inferenceParameters.anthropicClaude"
      ),
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": prompt
            }
          ]
        }
      ],
    };
  }

  extractResponse(completionResponse: Record<"content", { text: string }[]>): string {
    return completionResponse.content[0].text;
  }
}

export class AmazonTitanText extends Generator {
  createRequestBody(prompt: string) {
    return {
      inputText: prompt,
      textGenerationConfig: getWorkspaceConfig<Record<string, string>>(
        "inferenceParameters.amazonTitanText"
      ),
    };
  }

  extractResponse(responseBody: Record<"results", { outputText: string }[]>): string {
    return responseBody.results[0].outputText;
  }
}

export class AI21Jurassic2 extends Generator {
  createRequestBody(prompt: string) {
    return {
      prompt,
      ...getWorkspaceConfig<Record<string, string>>("inferenceParameters.AI21 Jurassic-2"),
    };
  }

  extractResponse(responseBody: Record<"completions", { data: { text: string } }[]>): string {
    return responseBody.completions[0].data.text;
  }
}

export class CohereCommand extends Generator {
  createRequestBody(prompt: string) {
    return {
      prompt,
      ...getWorkspaceConfig<Record<string, string>>("inferenceParameters.cohereCommand"),
    };
  }

  extractResponse(responseBody: Record<"generations", { text: string }[]>): string {
    return responseBody.generations[0].text;
  }
}

export class MetaLlama2 extends Generator {
  createRequestBody(prompt: string) {
    return {
      prompt,
      ...getWorkspaceConfig<Record<string, string>>("inferenceParameters.metaLlama2"),
    };
  }

  extractResponse(responseBody: Record<"generation", string>): string {
    return responseBody.generation;
  }
}

export class Mistral extends Generator {
  createRequestBody(prompt: string) {
    return {
      prompt,
      ...getWorkspaceConfig<Record<string, string>>("inferenceParameters.mistral"),
    };
  }

  extractResponse(responseBody: Record<"outputs", { text: string }[]>): string {
    return responseBody.outputs[0].text;
  }
}
