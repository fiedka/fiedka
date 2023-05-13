import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mdx|ts|tsx)"],
  addons: ["@storybook/addon-actions"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  core: {
    builder: 'webpack5',
    disableTelemetry: true,
  },
  docs: {
    autodocs: true
  }
};

export default config;
