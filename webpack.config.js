const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const { DefinePlugin } = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlInlinePlugin = require('html-inline-script-webpack-plugin')

const pathForGhPages = process.env.NODE_ENV === 'production' ? '/news-feed' : '/'

const mode = process.env.NODE_ENV || 'production'

module.exports = {
  mode: mode,
  entry: {
    main: './src/script.tsx',
    initColorScheme: './src/initColorScheme.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: pathForGhPages,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: { '@components': path.resolve('./src/components') },
  },
  optimization: {
    runTimeChunk: mode === 'production' ? false : 'single',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.[contenthash].css',
    }),
    new htmlWebpackPlugin({
      template: './src/index.html',
    }),
    new HtmlInlinePlugin({ scriptMatchPattern: [/initColorScheme\..+\.js$/] }),
    new StylelintPlugin({
      files: 'src/{**/*,*}.css',
    }),
    new ESLintPlugin({
      files: 'src/{**/*,*}.{tsx,ts}',
    }),
    new DefinePlugin({
      'process.env.FOR_GH_PAGES': JSON.stringify(process.env.NODE_ENV === 'production' ? 'true' : 'false'),
    }),
    new CopyPlugin({
      patterns: [{ from: './public', to: '' }],
    }),
  ],
  devServer: {
    open: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
}
