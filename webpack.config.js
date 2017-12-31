const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 8080,
    host: '0.0.0.0',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.scss'],
  },
  entry: {
    main: './assets/js/main.js',
  },
  output: {
    path: path.join(__dirname, 'assets', 'js'),
    filename: '[name].bundle.js',
    publicPath: '/assets/js/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'assets', 'js'),
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'assets', 'css'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader?sourceMap=true',
          use: [
            'css-loader?sourceMap=true',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({
                    browsers: ['last 2 versions', 'ie >= 10'],
                  }),
                  cssnano(),
                ],
                sourceMap: true
              }
            },
            'sass-loader?sourceMap=true',
          ]
        })
      }
    ],
  },
  plugins: [
    process.env.NODE_ENV === 'production' ? new webpack.optimize.UglifyJsPlugin({ compress: true }): undefined,
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
      allChunks: true,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin({
      mutiStep: true
    }),
  ]
};
