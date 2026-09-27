import type { ModuleOptions } from "webpack";

export const cssRule = {
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
};

export const rules: Required<ModuleOptions>["rules"] = [
  {
    // We"re specifying native_modules in the test because the asset relocator
    // loader generates a  "fake" .node file which is really a cjs file.
    test: /native_modules[/\\].+\.node$/,
    use: "node-loader",
  },
  // NOTE: Currently broken, and apparently not needed. Fix if necessary.
  /*
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
  */
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
