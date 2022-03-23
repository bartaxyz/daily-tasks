module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "styled-components",
        { ssr: true, displayName: true, preprocess: false },
      ],
    ],
  };
};
