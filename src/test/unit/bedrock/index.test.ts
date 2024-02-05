import { createGenerator } from "../../../bedrock";
import {
  AnthropicClaude,
  CohereCommand,
  AI21Jurassic2,
  AmazonTitan,
} from "../../../bedrock/generator";
import * as chai from "chai";

suite("bedrock.index", () => {
  test("Create generator", () => {
    const tests = [
      { modelId: "anthropic.claude-v2", expected: AnthropicClaude },
      { modelId: "anthropic.claude-v1", expected: AnthropicClaude },
      { modelId: "anthropic.claude-instant-v1", expected: AnthropicClaude },
      { modelId: "cohere.command-text-v14", expected: CohereCommand },
      { modelId: "cohere.command-light-text-v14", expected: CohereCommand },
      { modelId: "ai21.j2-ultra-v1", expected: AI21Jurassic2 },
      { modelId: "ai21.j2-mid-v1", expected: AI21Jurassic2 },
      { modelId: "amazon.titan-text-lite-v1", expected: AmazonTitan },
      { modelId: "amazon.titan-text-express-v1", expected: AmazonTitan },
    ];

    tests.forEach(({ modelId, expected }) => {
      const generator = createGenerator(modelId);
      chai.expect(generator).to.be.an.instanceof(expected);
    });
  });
  test("Create generator with invalid model ID", () => {
    chai
      .expect(createGenerator.bind("invalid-model-id"))
      .to.throw("Model is invalid or not supported.");
  });
});
