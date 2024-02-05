import * as getWorkspaceConfig from "../../../utilities/getWorkspaceConfig";
import * as vscode from "vscode";
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

const expect = chai.expect;
chai.use(sinonChai);

suite("utilities.getWorkspaceConfig", () => {
  test("Get workspace configuration", () => {
    
    var getConfigurationValueStub = sinon.stub();
    var getConfigurationStub = sinon
      .stub(vscode.workspace, "getConfiguration")
      .returns({ get: getConfigurationValueStub } as any);

    getWorkspaceConfig.getWorkspaceConfig("testConfigKey");

    expect(getConfigurationStub).to.be.calledOnceWith("bedrockPlayground");
    expect(getConfigurationValueStub).to.be.calledOnceWith("testConfigKey");

    getConfigurationValueStub.reset();
    getConfigurationStub.reset();

  });
});
