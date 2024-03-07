/* eslint-disable @typescript-eslint/naming-convention */
import {
  AnthropicClaude,
  AmazonTitanText,
  AI21Jurassic2,
  CohereCommand,
  MetaLlama2,
  Generator,
} from "../../../../bedrock/generator";
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import * as getWorkspaceConfigModule from "../../../../utilities/getWorkspaceConfig";

const expect = chai.expect;
chai.use(sinonChai);

suite("bedrock.generator.index", () => {
  let getWorkspaceConfigStub: sinon.SinonStub;

  setup(() => {
    getWorkspaceConfigStub = sinon.stub(getWorkspaceConfigModule, "getWorkspaceConfig");
  });

  teardown(() => {
    getWorkspaceConfigStub.restore();
  });

  suite("Generator", () => {
    let generator: Generator;
    let generateStub: sinon.SinonStub;

    setup(() => {
      class TestGenerator extends Generator {
        createRequestBody(prompt: string) {
          return {
            prompt: prompt,
            maxTokens: 300,
          };
        }

        extractResponse(responseBody: any): string {
          return responseBody.completion;
        }
      }

      generator = new TestGenerator("test-model-id");

      generateStub = sinon.stub(generator, "generate");
      generateStub.resolves("test response");
    });

    teardown(() => {
      generateStub.restore();
    });

    test("Generator properties", () => {
      expect(generator.modelId).to.equal("test-model-id");
    });

    test("Generate", async () => {
      const response = await generator.generate("test prompt");
      expect(response).to.equal("test response");
    });
  });

  suite("AnthropicClaude", () => {
    let generator: AnthropicClaude;

    setup(() => {
      getWorkspaceConfigStub.returns({
        max_tokens: 500,
        anthropic_version: "bedrock-2023-05-31",
        system: "",
        temperature: 0.5,
        top_k: 250,
        top_p: 1,
        stop_sequences: ["\n\nHuman:"],
      });

      generator = new AnthropicClaude("claude-model-id");
    });

    test("Create request body", () => {
      const requestBody = generator.createRequestBody("test prompt");
      expect(getWorkspaceConfigStub).to.have.been.calledOnceWith(
        "inferenceParameters.anthropicClaude"
      );

      expect(requestBody).to.deep.equal({
        max_tokens: 500,
        anthropic_version: "bedrock-2023-05-31",
        system: "",
        temperature: 0.5,
        top_k: 250,
        top_p: 1,
        stop_sequences: ["\n\nHuman:"],
        messages: [{'role': 'user', content: [{type: 'text', text: 'test prompt'}]}]
      });
    });
    test("Extract response", () => {
      const response = generator.extractResponse({ content: [{ text: "test response" }] });
      expect(response).to.equal("test response");
    });
  });

  suite("AmazonTitanText", () => {
    let generator: AmazonTitanText;

    setup(() => {
      getWorkspaceConfigStub.returns({
        temperature: 0,
        topP: 1,
        maxTokenCount: 512,
        stopSequences: [],
      });

      generator = new AmazonTitanText("titan-model-id");
    });
    test("Create request body", () => {
      const requestBody = generator.createRequestBody("test prompt");

      expect(getWorkspaceConfigStub).to.have.been.calledOnceWith(
        "inferenceParameters.amazonTitanText"
      );

      expect(requestBody).to.deep.equal({
        inputText: "test prompt",
        textGenerationConfig: {
          maxTokenCount: 512,
          temperature: 0,
          topP: 1,
          stopSequences: [],
        },
      });
    });

    test("Extract response", () => {
      const response = generator.extractResponse({ results: [{ outputText: "test response" }] });
      expect(response).to.equal("test response");
    });
  });

  suite("AI21Jurassic2", () => {
    let generator: AI21Jurassic2;

    setup(() => {
      getWorkspaceConfigStub.returns({
        temperature: 0.5,
        topP: 0.5,
        maxTokens: 200,
        stopSequences: [],
        countPenalty: {
          scale: 0,
          applyToWhitespaces: false,
          applyToPunctuations: false,
          applyToNumbers: false,
          applyToStopwords: false,
          applyToEmojis: false,
        },
        presencePenalty: {
          scale: 0,
          applyToWhitespaces: false,
          applyToPunctuations: false,
          applyToNumbers: false,
          applyToStopwords: false,
          applyToEmojis: false,
        },
        frequencyPenalty: {
          scale: 0,
          applyToWhitespaces: false,
          applyToPunctuations: false,
          applyToNumbers: false,
          applyToStopwords: false,
          applyToEmojis: false,
        },
      });

      generator = new AI21Jurassic2("j2-model-id");
    });
    test("Create request body", () => {
      const requestBody = generator.createRequestBody("test prompt");

      expect(getWorkspaceConfigStub).to.have.been.calledOnceWith(
        "inferenceParameters.AI21 Jurassic-2"
      );

      expect(requestBody).to.deep.equal({
        prompt: "test prompt",
        maxTokens: 200,
        temperature: 0.5,
        topP: 0.5,
        stopSequences: [],
        countPenalty: {
          scale: 0,
          applyToWhitespaces: false,
          applyToPunctuations: false,
          applyToNumbers: false,
          applyToStopwords: false,
          applyToEmojis: false,
        },
        presencePenalty: {
          scale: 0,
          applyToWhitespaces: false,
          applyToPunctuations: false,
          applyToNumbers: false,
          applyToStopwords: false,
          applyToEmojis: false,
        },
        frequencyPenalty: {
          scale: 0,
          applyToWhitespaces: false,
          applyToPunctuations: false,
          applyToNumbers: false,
          applyToStopwords: false,
          applyToEmojis: false,
        },
      });
    });
    test("Extract response", () => {
      const response = generator.extractResponse({
        completions: [{ data: { text: "test response" } }],
      });
      expect(response).to.equal("test response");
    });
  });

  suite("CohereCommand", () => {
    let generator: CohereCommand;

    setup(() => {
      getWorkspaceConfigStub.returns({
        temperature: 0.9,
        p: 0.75,
        k: 0,
        max_tokens: 20,
        stop_sequences: [],
        truncate: "END",
      });

      generator = new CohereCommand("command-model-id");
    });
    test("Create request body", () => {
      const requestBody = generator.createRequestBody("test prompt");

      expect(getWorkspaceConfigStub).to.have.been.calledOnceWith(
        "inferenceParameters.cohereCommand"
      );

      expect(requestBody).to.deep.equal({
        prompt: "test prompt",
        temperature: 0.9,
        p: 0.75,
        k: 0,
        max_tokens: 20,
        stop_sequences: [],
        truncate: "END",
      });
    });
    test("Extract response", () => {
      const response = generator.extractResponse({
        generations: [{ text: "test response" }],
      });

      expect(response).to.equal("test response");
    });
  });

  suite("MetaLlama2", () => {
    let generator: MetaLlama2;

    setup(() => {
      getWorkspaceConfigStub.returns({
        temperature: 0.5,
        top_p: 0.9,
        max_gen_len: 512,
      });

      generator = new MetaLlama2("llama2-model-id");
    });
    test("Create request body", () => {
      const requestBody = generator.createRequestBody("test prompt");

      expect(getWorkspaceConfigStub).to.have.been.calledOnceWith("inferenceParameters.metaLlama2");

      expect(requestBody).to.deep.equal({
        prompt: "test prompt",
        temperature: 0.5,
        top_p: 0.9,
        max_gen_len: 512,
      });
    });
    test("Extract response", () => {
      const response = generator.extractResponse({
        generation: "test response",
      });

      expect(response).to.equal("test response");
    });
  });
});
