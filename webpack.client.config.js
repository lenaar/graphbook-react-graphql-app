const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const buildDirectory = "dist";

const outputDirectory = buildDirectory + "/client";

module.exports = {
  mode: "development",

  entry: "./src/client/index.js",

  output: {
    path: path.join(__dirname, buildDirectory),

    filename: "bundle.js",

    publicPath: "/", // prefix the bundle URL to an absolute path, instead of a relative path
  },

  module: {
    rules: [
      {
        test: /\.js$/,

        exclude: /node_modules/,

        use: {
          loader: "babel-loader",
        },
      },

      {
        test: /\.css$/,

        use: ["style-loader", "css-loader"],
      },
    ],
  },

  devServer: {
    port: 3000,

    open: true,

    historyApiFallback: true, // serve the index.html file, not only for the root path, but for 404 too
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.join(
          __dirname,

          buildDirectory
        ),
      ],
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
