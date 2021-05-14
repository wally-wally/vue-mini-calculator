const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const vueRegex = /\.vue$/;
const javascriptRegex = /\.js$/;
const cssRegex = /\.css$/;

module.exports = {
  entry: {
    app: path.join(__dirname, 'src', 'main.js'),
  },

  module: {
    rules: [
      {
        test: vueRegex,
        use: 'vue-loader',
      },
      {
        test: javascriptRegex,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: cssRegex,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    
    new VueLoaderPlugin(),
  ],

  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
  },
};