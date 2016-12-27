'use strict'; // eslint-disable-line strict

// Import modules
const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');

// Import production webpack configuration
const webpackProdConfig = require('./webpack.client');

// Import config
const config = require('./config');

// Make sure we don't clobber our other configuration.
const webpackConfig = _.cloneDeep(webpackProdConfig);

webpackConfig.debug = true;
webpackConfig.devtool = 'eval-source-map';
webpackConfig.babel = config.build.babel.client.dev;

webpackConfig.plugins = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('development') },
    __CLIENT__: true,
    __SERVER__: false,
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
];

webpackConfig.devServer = {
  publicPath: `http://localhost:${config.ports.webpack}/${config.files.client.out}/`,
  contentBase: path.join(__dirname, config.files.staticAssets),
  hot: true,
  inline: true,
  silent: true,
  noInfo: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
};

// Update output information
webpackConfig.output.publicPath =
  `http://localhost:${config.ports.webpack}/${config.files.client.out}/`;
webpackConfig.output.hotUpdateMainFilename = 'update/[hash]/update.json';
webpackConfig.output.hotUpdateChunkFilename = 'update/[hash]/[id].update.js';

// Add entry points
webpackConfig.entry.unshift(
  `webpack-dev-server/client?http://localhost:${config.ports.webpack}`,
  'webpack/hot/only-dev-server'
);

module.exports = webpackConfig;
