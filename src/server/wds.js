import express from 'express';

/**
 * webpack dev server
 * @param {express.Application} app express
 */

export function wds (app) {
  // Cheack whether server is running in development or production mode
  const env = (process.env.NODE_ENV || 'development').trim();
  const suffix = env === 'production' ? 'prod' : 'dev';

  const webpackConfig = require('../../webpack/webpack.' + suffix);
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler));
}

export default wds;