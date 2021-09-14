module.exports = {
  entry: "app.js",
  output: {
    filename: "bundle.js",
  },
  modules: {
    rules: [{ test: /\.json$/, use: "json-loader" }],
  },
};
