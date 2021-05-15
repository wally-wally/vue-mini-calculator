const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const vueRegex = /\.vue$/;
const javascriptRegex = /\.js$/;
const sassRegex = /\.s[ac]ss$/;

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
        test: sassRegex,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
                @import './src/assets/scss/style.scss';
              `
            },
          },
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

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
};