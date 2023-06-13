const MiniCSSExtactPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isProduction = process.env.node_env === 'production';

const config = {
  entry: {
    index: path.resolve(__dirname, '../src/index.ts'),
    popup: path.resolve(__dirname, '../src/popup/index.tsx'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    assetModuleFilename: 'assets/[contenthash:8][ext]',
    publicPath: '/',
  },
  plugins: [
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
      {
        test: /\.css$/i,
        use: [
          MiniCSSExtactPlugin.loader,
          'css-loader',
        ],
        sideEffects: true,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.js'],
  },
  devtool: isProduction ? false : 'source-map',
  optimization: {
    minimize: isProduction,
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 8080,
    watchContentBase: true,
    progress: true,
    historyApiFallback: true,
  },
};

if (!isProduction) {
  config.plugins.push(new HTMLWebpackPlugin({
    template: path.resolve(__dirname, '../public/popup.html'),
  }));
}

module.exports = config;
