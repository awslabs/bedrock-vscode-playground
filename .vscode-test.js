// https://github.com/microsoft/vscode-docs/blob/vnext/api/working-with-extensions/testing-extension.md
const { defineConfig } = require("@vscode/test-cli");

module.exports = defineConfig([
  {
    label: "unitTests",
    files: "out/test/unit/**/*.test.js",
    version: "insiders",
    workspaceFolder: "./sampleWorkspace",
    mocha: {
      ui: "tdd",
      timeout: 20000,
    },
  },
]);
