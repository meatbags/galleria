var path = require('path');
var webpack = require('webpack');
var Uglify = require('uglifyjs-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var appName = 'IOTD';
var pathJS = './js/main.js';
var pathSCSS = './scss/main.js';
var pathOutput = 'build';

module.exports = [{
    entry: {'app.min': pathJS},
    output: {
      library: appName,
      libraryTarget: 'var',
      path: path.resolve(__dirname, pathOutput),
      filename: '[name].js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {loader: "babel-loader"}
      }]
    },
    optimization: {
      minimizer: [
        new Uglify({
          cache: true,
          parallel: true,
          uglifyOptions: {compress: false, ecma: 6, mangle: true},
          sourceMap: true
        })
      ]
    },
    stats: {colors: true, warnings: false}
  },{
    entry: {'style.webpack': pathSCSS},
    output: {
      path: path.resolve(__dirname, pathOutput),
      filename: '[name].js'
    },
    module: {
      rules: [{
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {importLoaders: 2, sourceMap: true}
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')],
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {sourceMap: true}
          }
        ]
      }]
    },
    plugins: [new MiniCssExtractPlugin({filename: "./style.css", allChunks: true})]
  }
];
