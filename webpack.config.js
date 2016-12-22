const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const path = require('path');
const argv = require('yargs').argv;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const dest = path.join(__dirname, 'dist');
const plugins = [];

// Build Setup
if (argv.dev) {
  plugins.push(new WebpackShellPlugin({
    onBuildEnd: ['node gulp/node/open.js'],
    dev: true
  }));
  plugins.push(new webpack.HotModuleReplacementPlugin());

} else if (argv.prod) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    warnings: false
  }));
}

if (argv.prod && !argv.serve) {
  var err = function (err) {
    if (err) throw console.error(err);
  };
  var fs = require('fs-extra');
  var minify = require('html-minifier').minify;

  fs.emptyDir('./dist', function (err) {
    if (err) throw console.error(err);
    fs.readFile('./src/index.html', 'utf8', function (err, data) {
      if (err) throw console.error(err);
      var result = minify(data, {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeOptionalTags: true
      });
      fs.writeFile('./dist/index.html', result, err);
    });
  });
}

plugins.push(new ProgressBarPlugin());

module.exports = {
  devtool: 'source-map',
  context: __dirname,
  devServer: {
    inline: true,
    colors: true,
    historyApiFallback: true,
    port: 9000,
    contentBase: './src'
  },
  entry: {
    app: path.join(__dirname, '/src/index.ts'),
    head: path.join(__dirname, './src/head.ts')
  },
  output: {
    path: dest,
    filename: '[name].js'
  },
  resolve: {
    alias: {
      styles: path.join(__dirname, '/src/styles'),
      images: path.join(__dirname, '/src/images'),
      common: path.join(__dirname, '/src/styles/common'),
      fonts: path.join(__dirname, '/src/styles/fonts'),
      sinon: 'sinon/pkg/sinon'
    },
    extensions: ['', '.webpack.js', '.web.js', '.js', '.ts'],
    root: [
      path.resolve('./src')
    ]
  },
  module: {
    preLoaders:[
      {test: /\.ts$/, loader: 'tslint'}
    ],
    loaders: [
      {test: /\.ts(x?)$/, loader: 'ts-loader'},
      {test: /\.js$/, exclude: /(node_modules)/, loader: 'babel'}, // babel loader
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.html$/, loader: 'html?attrs=img:src'},
      {test: /\.txt$/, loader: 'file'},
      {test: /\.json$/, loader: 'json'},
      {test: /\.(woff|woff2|ttf|eot|svg|png|gif|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000'}
    ],
    noParse: [/sinon/]
  },
  plugins: plugins
};
