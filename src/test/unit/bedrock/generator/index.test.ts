/* eslint-disable @typescript-eslint/naming-convention */
import {
  AnthropicClaude,
  AmazonTitan,
  AI21Jurassic2,
  CohereCommand,
  Llama2,
  Generator,
} from "../../../../bedrock/generator";
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import * as getWorkspaceConfigModule from "../../../../utilities/getWorkspaceConfig";

const expect = chai.expect;
chai.use(sinonChai);

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

let generator = new TestGenerator("test-model-id");

suite("bedrock.generator.index", () => {
  test("Generator properties", () => {
    expect(generator.modelId).to.equal("test-model-id");
  });

  test("Generate", async () => {
    const mockGenerate = sinon.stub(generator, "generate");
    mockGenerate.resolves("test response");

    const response = await generator.generate("test prompt");
    expect(response).to.equal("test response");

    mockGenerate.reset();
  });

  test("AnthropicClaude: create request body", () => {
    let generator = new AnthropicClaude("claude-model-id");

    var getWorkspaceConfigStub = sinon.stub(getWorkspaceConfigModule, "getWorkspaceConfig");

    getWorkspaceConfigStub.withArgs("anthropicClaude.maxTokensToSample").returns(300);
    getWorkspaceConfigStub.withArgs("anthropicClaude.temperature").returns(0.5);
    getWorkspaceConfigStub.withArgs("anthropicClaude.topK").returns(250);
    getWorkspaceConfigStub.withArgs("anthropicClaude.topP").returns(1);
    getWorkspaceConfigStub.withArgs("anthropicClaude.stopSequences").returns(["\n\nHuman:"]);

    let requestBody = generator.createRequestBody("test prompt");
    expect(requestBody).to.deep.equal({
      prompt: "test prompt",
      max_tokens_to_sample: 300,
      temperature: 0.5,
      top_k: 250,
      top_p: 1,
      stop_sequences: ["\n\nHuman:"],
    });

    getWorkspaceConfigStub.restore();
  });

  test("AnthropicClaude: extract response", () => {
    let generator = new AnthropicClaude("claude-model-id");
    let response = generator.extractResponse({ completion: "test response" });
    expect(response).to.equal("test response");
  });

  test("AmazonTitan: create request body", () => {
    let generator = new AmazonTitan("titan-model-id");

    var getWorkspaceConfigStub = sinon.stub(getWorkspaceConfigModule, "getWorkspaceConfig");

    getWorkspaceConfigStub.withArgs("amazonTitan.maxTokenCount").returns(4096);
    getWorkspaceConfigStub.withArgs("amazonTitan.temperature").returns(0);
    getWorkspaceConfigStub.withArgs("amazonTitan.topP").returns(1);
    getWorkspaceConfigStub.withArgs("amazonTitan.stopSequences").returns([]);

    let requestBody = generator.createRequestBody("test prompt");

    expect(requestBody).to.deep.equal({
      inputText: "test prompt",
      textGenerationConfig: {
        maxTokenCount: 4096,
        temperature: 0,
        topP: 1,
        stopSequences: [],
      },
    });

    getWorkspaceConfigStub.restore();
  });

  test("AmazonTitan: extract response", () => {
    let generator = new AmazonTitan("titan-model-id");
    let response = generator.extractResponse({ results: [{ outputText: "test response" }] });
    expect(response).to.equal("test response");
  });

  test("AI21Jurassic2: create request body", () => {
    let generator = new AI21Jurassic2("j2-model-id");

    var getWorkspaceConfigStub = sinon.stub(getWorkspaceConfigModule, "getWorkspaceConfig");

    getWorkspaceConfigStub.withArgs("AI21 Jurassic-2.maxTokens").returns(200);
    getWorkspaceConfigStub.withArgs("AI21 Jurassic-2.temperature").returns(0.5);
    getWorkspaceConfigStub.withArgs("AI21 Jurassic-2.topP").returns(0.5);
    getWorkspaceConfigStub.withArgs("AI21 Jurassic-2.stopSequences").returns([]);
    getWorkspaceConfigStub.withArgs("AI21 Jurassic-2.countPenalty.scale").returns(0);
    getWorkspaceConfigStub
      .withArgs("AI21 Jurassic-2.countPenalty.applyToWhitespaces")
      .returns(false);
    getWorkspaceConfigStub
      .withArgs("AI21 Jurassic-2.countPenalty.applyToPunctuations")
      .returns(false);
    getWorkspaceConfigStub.withArgs("AI21 Jurassic-2.countPenalty.applyToNumbers").returns(false);
    getWorkspaceConfigStub.withArgs("AI21 Jurassic-2.countPenalty.applyToStopwords").returns(false);
    getWorkspaceConfigStub.withArgs("AI21 Jurassic-2.countPenalty.applyToEmojis").returns(false);
    getWorkspaceConfigStub.withArgs("AI21 Jurassic-2.presencePenalty.scale").returns(0);
    getWorkspaceConfigStub
      .withArgs("AI21 Jurassic-2.presencePenalty.applyToWhitespaces")
      .returns(false);
    getWorkspaceConfigStub
      .withArgs("AI21 Jurassic-2.presencePenalty.applyToPunctuations")
      .returns(false);
    getWorkspaceConfigStub
      .withArgs("AI21 Jurassic-2.presencePenalty.applyToNumbers")
      .returns(false);
    getWorkspaceConfigStub
      .withArgs("AI21 Jurassic-2.presencePenalty.applyToStopwords")
      .returns(false);
    getWorkspaceConfigStub.withArgs("AI21 Jurassic-2.presencePenalty.applyToEmojis").returns(false);
    getWorkspaceConfigStub.withArgs("AI21 Jurassic-2.frequencyPenalty.scale").returns(0);
    getWorkspaceConfigStub
      .withArgs("AI21 Jurassic-2.frequencyPenalty.applyToWhitespaces")
      .returns(false);
    getWorkspaceConfigStub
      .withArgs("AI21 Jurassic-2.frequencyPenalty.applyToPunctuations")
      .returns(false);
    getWorkspaceConfigStub
      .withArgs("AI21 Jurassic-2.frequencyPenalty.applyToNumbers")
      .returns(false);
    getWorkspaceConfigStub
      .withArgs("AI21 Jurassic-2.frequencyPenalty.applyToStopwords")
      .returns(false);
    getWorkspaceConfigStub
      .withArgs("AI21 Jurassic-2.frequencyPenalty.applyToEmojis")
      .returns(false);

    let requestBody = generator.createRequestBody("test prompt");

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

    getWorkspaceConfigStub.restore();
  });

  test("AI21Jurassic2: extract response", () => {
    let generator = new AI21Jurassic2("j2-model-id");
    let response = generator.extractResponse({
      completions: [{ data: { text: "test response" } }],
    });
    expect(response).to.equal("test response");
  });

  test("CohereCommand: create request body", () => {
    let generator = new CohereCommand("command-model-id");

    var getWorkspaceConfigStub = sinon.stub(getWorkspaceConfigModule, "getWorkspaceConfig");

    getWorkspaceConfigStub.withArgs("cohereCommand.temperature").returns(0.9);
    getWorkspaceConfigStub.withArgs("cohereCommand.topP").returns(0.75);
    getWorkspaceConfigStub.withArgs("cohereCommand.topK").returns(1);
    getWorkspaceConfigStub.withArgs("cohereCommand.maxTokens").returns(20);
    getWorkspaceConfigStub.withArgs("cohereCommand.stopSequences").returns([]);
    getWorkspaceConfigStub.withArgs("cohereCommand.returnLikelihoods").returns("GENERATION");
    getWorkspaceConfigStub.withArgs("cohereCommand.truncate").returns("NONE");

    let requestBody = generator.createRequestBody("test prompt");

    expect(requestBody).to.deep.equal({
      prompt: "test prompt",
      temperature: 0.9,
      p: 0.75,
      k: 1,
      max_tokens: 20,
      stop_sequences: [],
      return_likelihoods: "GENERATION",
      truncate: "NONE",
    });

    getWorkspaceConfigStub.restore();
  });

  test("CohereCommand: extract response", () => {
    let generator = new CohereCommand("j2-model-id");
    let response = generator.extractResponse({
      generations: [{ text: "test response" }],
    });

    expect(response).to.equal("test response");
  });

  test("LLama2: create request body", () => {
    let generator = new Llama2("llama2-model-id");

    var getWorkspaceConfigStub = sinon.stub(getWorkspaceConfigModule, "getWorkspaceConfig");

    getWorkspaceConfigStub.withArgs("bedrockPlayground.llama2.temperature").returns(0.5);
    getWorkspaceConfigStub.withArgs("bedrockPlayground.llama2.topP").returns(0.9);
    getWorkspaceConfigStub.withArgs("bedrockPlayground.llama2.maximumLength").returns(512);

    let requestBody = generator.createRequestBody("test prompt");

    expect(requestBody).to.deep.equal({
      prompt: "test prompt",
      temperature: 0.5,
      top_p: 0.9,
      max_gen_len: 512,
    });

    getWorkspaceConfigStub.restore();
  });

  test("LLama2: extract response", () => {
    let generator = new Llama2("llama2-model-id");
    let response = generator.extractResponse({
      generation: "test response",
    });

    expect(response).to.equal("test response");
  });
});
