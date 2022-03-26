const path = require("path");
const { withExpoWebpack } = require("@expo/electron-adapter");

module.exports = function (config) {
  return withExpoWebpack({
    ...config,
    devServer: {
      port: 3000,
      /* historyApiFallback: {
        index: "index.html",
      }, */
      historyApiFallback: true,
    },
  });
};
