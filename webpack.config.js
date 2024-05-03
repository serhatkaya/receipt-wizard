const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production", // or 'development' for development mode
  entry: "./index.js", // entry point of your application
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js", // name of the output bundle,
    library: "rWizard",
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "src"), // Look for modules in src directory
      "node_modules",
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "readme.md", to: path.resolve(__dirname, "dist") },
        { from: "LICENSE", to: path.resolve(__dirname, "dist") },
        { from: "package.json", to: path.resolve(__dirname, "dist") },
      ],
    }),
  ],
};
