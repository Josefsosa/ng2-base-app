'use strict';

const webpackConfig = require('../webpack.config.js');
webpackConfig.entry = {};
webpackConfig.plugins = [];
webpackConfig.devtool = 'inline-source-map';
webpackConfig.watch = false;

module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      'test/test.js'
    ],

    exclude: [
      'test/unit/*{,*/*}.js'
    ],

    webpack: webpackConfig,

    //pre-processor for collecting code coverage
    preprocessors: {
      'test/test.js': ['webpack', 'sourcemap', 'sourcemap-writer', 'coverage']
    },

    // test results reporter to use
    // report on progress, collect coverage reports
    reporters: ['progress', 'coverage'],

    //use coverage report for jenkins integration
    coverageReporter: {
      type: 'json',
      subdir: 'lcov',
      dir: 'report/coverage'
    },

    // enable / disable colors in the output (reporters and logs)
    colors: process.env['KARMA_COLORS'] || true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari
    // - PhantomJS
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    // increased timeout, waits for webpack to compile
    browserNoActivityTimeout: 60000
  });
};
