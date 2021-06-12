const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Nodemon = require('nodemon-webpack-plugin');

const {
  NODE_ENV = 'production',
} = process.env;
module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: [
        'ts-loader',
      ]
    }]
  },
  plugins: [new Nodemon()],
  externals: [nodeExternals()],
}