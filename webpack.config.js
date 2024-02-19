const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const { DefinePlugin } = require('webpack')

// for gh-pages to work with BrowserRouter
const repositoryName = 'news-feed'

const publicPath = process.env.NODE_ENV === 'production' ? `/${repositoryName}/` : '/'

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: './src/script.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    publicPath: publicPath,
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
        use: ['style-loader', 'css-loader'],
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
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
    }),
    new StylelintPlugin({
      files: 'src/{**/*,*}.css',
    }),
    new ESLintPlugin({
      files: 'src/{**/*,*}.{tsx,ts}',
    }),
    new DefinePlugin({
      'process.env.REACT_APP_BASENAME': JSON.stringify(process.env.NODE_ENV === 'production' ? repositoryName : ''),
    }),
  ],
  devServer: {
    open: true,
    historyApiFallback: true,
  },
}
