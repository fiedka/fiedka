/*
 * https://jestjs.io/docs/configuration
 */
module.exports = {
  clearMocks: true,
  transform: {
    "\\.[jt]sx?$": ["babel-jest", { configFile: "./jest/babel.config.js" }],
  },
};
