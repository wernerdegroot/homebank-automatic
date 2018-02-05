var webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    mime: { 'text/x-typescript': ['ts', 'tsx'] },
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      '**/*.tests.ts'
    ],
    preprocessors: {
      '**/*.tests.ts': ['webpack']
    },
    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-chrome-launcher'
    ],
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true
  });
};