const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-class-properties'],
    },
  }];

  if (isDev) {
    loaders.push({
      loader: 'eslint-loader',
      options: {
        fix: true,
      },
    });
  }

  return loaders;
};

const getFileName = (ext) => {
  return isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;
};

module.exports = {
  context: path.resolve(__dirname, 'src'), // контекст в папке src
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'], // входная точка
  output: {
    filename: getFileName('js'),
    path: path.resolve(__dirname, 'dist'), // куда поместить скрипт
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: isDev,
    hot: isDev,
    port: 3000,
  },
  module: {
    rules: [{
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev,
            reloadAll: true,
          },
        },
        'css-loader',
        'sass-loader',
      ],
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: jsLoaders(),
    }],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({ // автоматически добавляет bundle.js в index.html
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [{ // копируем файлы в определенную папку
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist'),
      }],
    }),
    new MiniCssExtractPlugin({ // сжимаем CSS
      filename: getFileName('css'),
    }),
  ],
};
