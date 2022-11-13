const path = require("path");

module.exports = {
  components: "src/client/components/**/*.js",
  require: [path.join(__dirname, "assets/css/style.css")],
  styleguideComponents: {
    Wrapper: path.join(__dirname, "src/client/styleguide/Wrapper"),
  },
  webpackConfig: require("./webpack.client.config"),
};
