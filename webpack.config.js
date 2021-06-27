const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: "./src/index.jsx",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  devtool: "source-map",
  resolve: {
    extensions: [".go", ".jsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["source-map-loader", "babel-loader"]
      },
      {
        test: /\.go/,
        use: [
          {
            loader: path.join(__dirname, "..", "..", "dist", "index.js")
          }
        ]
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      }
    ]
  },
  node: {
    fs: "empty"
  },
  plugins: [htmlPlugin]
};
