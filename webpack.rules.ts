import type { ModuleOptions } from "webpack";

// For files that transpile to WebAssembly, make sure to set the module type
// in the 'module.rules' section of the config
// (e. g. 'type: "webassembly/async"').
// (Source code omitted for this binary file)
// type: "webassembly/async"

export const rules: Required<ModuleOptions>["rules"] = [
  {
    // We"re specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules[/\\].+\.node$/,
    use: "node-loader",
  },
  {
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@vercel/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules",
      },
    },
  },
  {
    test: /\.jsx?$/,
    use: {
      loader: "babel-loader",
      options: {
        exclude: /node_modules/,
        presets: ["@babel/preset-react"],
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: "ts-loader",
      options: {
        transpileOnly: true,
      },
    },
  },
  {
    test: /\.go/,
    use: [
      {
        loader: "@fiedka/golang-wasm-async-loader",
      },
    ],
  },
  {
    test: /\.svg?$/,
    use: {
      loader: "file-loader",
    },
  },
];
