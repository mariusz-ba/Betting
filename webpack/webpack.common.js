const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill', 
    path.join(__dirname, '../src/client/index.jsx')
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '../src/client'),
        loaders: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}