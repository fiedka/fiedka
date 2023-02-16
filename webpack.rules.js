// For files that transpile to WebAssembly, make sure to set the module type
// in the 'module.rules' section of the config
// (e. g. 'type: "webassembly/async"').
// (Source code omitted for this binary file)
// type: "webassembly/async"

module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: "node-loader",
  },
  {
    test: /\.(m?js|node)$/,
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
