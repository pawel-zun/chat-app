const path = require('path');
const webpack = require('webpack');
const devServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const env = process.env.NODE_ENV || 'development';

let entryArr = ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server', './client/index.js'];

const plugins = [
  new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body'
  }),
];

console.log('NODE_ENV:', env);
if (env.includes('production')) {
  plugins.push(
    new UglifyJSPlugin(),
    new OptimizeJsPlugin({
      sourceMap: false,
    }),
  );
  entryArr = ['./client/index.js'];
}

console.log(entryArr);

module.exports = {
  entry: entryArr,
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: './bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: __dirname + '/node_modules'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins,
};
