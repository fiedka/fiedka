import path from "path";
import type { StorybookConfig } from "@storybook/react-webpack5";
import { rendererConfig } from "../webpack.renderer.config.ts";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-essentials",
    "@storybook/addon-webpack5-compiler-swc"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      fastRefresh: true,
      builder: {
        useSWC: true
      }
    },
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic'
        }
      }
    }
  }),
  core: {
    disableTelemetry: true,
    builder: {
      name: '@storybook/builder-webpack5',
      options: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },
  webpackFinal: async (config, { configType }) => {
    return {
      ...config,
      module: rendererConfig.module,
    };
  },
  docs: {
    autodocs: "tag",
  }
};

export default config;
