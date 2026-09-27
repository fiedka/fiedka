import { WebpackPlugin } from "@electron-forge/plugin-webpack";

import { rules, cssRule } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

const extensions = [".js", ".ts", ".jsx", ".tsx", ".css", ".json"];

export default new WebpackPlugin({
  port: 3377,
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  mainConfig: {
    entry: "./src/index.ts",
    module: {
      rules,
    },
    plugins,
    resolve: {
      extensions,
    },
  },
  renderer: {
    config: {
      module: {
        rules: [
          ...rules,
          cssRule,
        ],
      },
      // causes EPIPE errors
      // plugins: webpackPlugins,
      resolve: {
        extensions,
        fallback: {
          "crypto": false,
          "fs": false,
          "os": false,
          "util": false,
        },
      },
    },
    entryPoints: [
      {
        name: "main_window",
        html: "./src/index.html",
        js: "./src/renderer.ts",
        preload: {
          js: "./src/preload.ts",
        },
      },
    ],
  },
});
