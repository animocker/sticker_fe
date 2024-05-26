module.exports = function (api) {
  api.cache(true);
  return {
    env: {
      production: {
        plugins: ["transform-remove-console"],
      },
      test: {
        plugins: [["module:react-native-dotenv", { path: "__tests__/.env.test" }]],
      },
    },
    presets: ["babel-preset-expo"],
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }], ["module:react-native-dotenv"]],
  };
};
