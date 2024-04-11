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
    main: './src/components/script.tsx',
    initColorScheme: './src/features/colorScheme/initColorScheme.ts',
    serviceWorker: './src/features/serviceWorker/service.worker.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: pathForGhPages,
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(svg|jpg|png)$/,
        type: 'asset/resource',
      },
      {
        test: /service\.worker\.ts$/,
        use: 'ts-loader',
        type: 'asset/resource',
        generator: {
          filename: 'serviceWorker.js',
        },
      },
      {
        test: /\.(ts|tsx)$/i,
        use: 'ts-loader',
        exclude: [/node_modules/, /worker\.ts/],
      },
      {
        test: /\.webmanifest$/i,
        use: 'webpack-webmanifest-loader',
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: { '@components': path.resolve('./src/components'), '@features': path.resolve('./src/features') },
  },
  optimization: {
    runtimeChunk: mode === 'production' ? false : 'single',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.[contenthash].css',
    }),
    new htmlWebpackPlugin({
      favicon: './src/images/favicon.ico',
      template: './src/index.html',
      excludeChunks: ['serviceWorker'],
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
    client: {
      overlay: false,
    },
    open: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
}
