const path = require('path')
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new WasmPackPlugin({
    crateDirectory: path.resolve(__dirname, 'src', 'rs'),
  }),
];
