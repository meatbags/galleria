var path = require('path');
var webpack = require('webpack');
var MiniCssExtract = require("mini-css-extract-plugin");
var UglifyJs = require("uglifyjs-webpack-plugin");
var TerserJs = require("terser-webpack-plugin");
var OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");
var appName = 'CLM';
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
        new TerserJs({
          test: /\.js(\?.*)?$/i,
          terserOptions: {
            mangle: true,
          },
        }),
      ],
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
          MiniCssExtract.loader, {
            loader: 'css-loader',
            options: {importLoaders: 2, sourceMap: true}
          }, {
            loader: 'sass-loader',
            options: {sourceMap: true}
          }
        ]
      }]
    },
    optimization: {
      minimizer: [
        new UglifyJs({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCSSAssets({})
      ]
    },
    plugins: [new MiniCssExtract({filename: './style.min.css', allChunks: true})]
  }
];
