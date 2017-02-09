import webpack from 'webpack';
import path from 'path';

const { NODE_ENV } = process.env;

const config = {
  context: path.resolve(__dirname),
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, 'dist', 'public'),
    filename: 'c.min.js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
    ],
  },
  target: 'web',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${NODE_ENV}"`,
    }),
    ...(NODE_ENV ? [new webpack.optimize.UglifyJsPlugin()] : []),
  ],
};

export default config;
