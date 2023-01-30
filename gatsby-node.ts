const path = require("path"); // Setup Import Alias
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const output = getConfig().output || {};
  actions.setWebpackConfig({
    output,
    resolve: {
      alias: {
        components: path.resolve(__dirname, "src/components"),
        pages: path.resolve(__dirname, "src/pages"),
        hooks: path.resolve(__dirname, "src/hooks"),
        libs: path.resolve(__dirname, "src/libs"),
        assets: path.resolve(__dirname, "/static/assets"),
      },
    },
  });
};
