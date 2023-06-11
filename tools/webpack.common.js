// const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtactPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

const isProduction = process.env.node_env === 'production';

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/index.ts'),
    // 'service-worker': path.resolve(__dirname, '../src/service-worker.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    assetModuleFilename: 'assets/[contenthash:8][ext]',
    publicPath: '/',
  },
  plugins: [
    // new HTMLWebpackPlugin({
    //   template: path.resolve(__dirname, '../public/index.html'),
    //   // favicon: path.resolve(__dirname, '../public/favicon.ico'),
    // }),
    new CleanWebpackPlugin(),
    new MiniCSSExtactPlugin({
      filename: '[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public',
          to: './',
        },
      ],
    })
  ],
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'].filter(Boolean),
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCSSExtactPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer']],
              },
            },
          },
        ],
        sideEffects: true,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.json'],
  },
  devtool: isProduction ? false : 'source-map',
  optimization: {
    minimize: isProduction,
  },
};
