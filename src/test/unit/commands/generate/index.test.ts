import { createPrompt } from "../../../../commands/generate";
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import * as getWorkspaceConfigModule from "../../../../utilities/getWorkspaceConfig";

const expect = chai.expect;
chai.use(sinonChai);
chai.config.truncateThreshold = 0; // disable truncating

suite("commands.generate.index", () => {
  let getWorkspaceConfigStub: sinon.SinonStub;

  setup(() => {
    getWorkspaceConfigStub = sinon.stub(getWorkspaceConfigModule, "getWorkspaceConfig");
    getWorkspaceConfigStub.returns({
      generate:
        "\n\nHuman: {REQUEST}\nPlease placed your response in <response></response> XML tags.\n\nAssistant:",
      generateWithContext:
        "\n\nHuman: Use the context wrapped in <context></context> tags to respond to a user's request.\nThe user's request will be wrapped in <request></request> tags.\n<context>{CONTEXT}</context>\n<request>{REQUEST}</request>\nPlease place your response in <response></response> tags.\n\nAssistant:",
    });
  });

  teardown(() => {
    getWorkspaceConfigStub.restore();
  });

  test("Create prompt", () => {
    const prompt = createPrompt("test request", "");
    expect(prompt).to.equal(
      "\n\nHuman: test request\nPlease placed your response in <response></response> XML tags.\n\nAssistant:"
    );

    getWorkspaceConfigStub.restore();
  });
  test("Create prompt with context", () => {
    const prompt = createPrompt("test request", "test context");
    expect(prompt).to.equal(
      "\n\nHuman: Use the context wrapped in <context></context> tags to respond to a user's request.\nThe user's request will be wrapped in <request></request> tags.\n<context>test context</context>\n<request>test request</request>\nPlease place your response in <response></response> tags.\n\nAssistant:"
    );
  });
});
