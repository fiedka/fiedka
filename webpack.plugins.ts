import path from "path";
import WasmPackPlugin from "@wasm-tool/wasm-pack-plugin";
import type IForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure",
  }),
  new WasmPackPlugin({
    crateDirectory: path.resolve(__dirname, 'src', 'rs'),
  }),
];
