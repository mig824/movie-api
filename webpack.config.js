const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  const { development, production, api } = env;

  console.log('\nWEBPACK ENV: ', { development, production, api }, '\n');

  let config = {};
  const commonConfig = {
    entry: {
      client: path.resolve(__dirname, 'src/client/main.jsx'),
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: '/node_modules/',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/client/index.html',
        filename: 'index.html',
        inject: true,
      }),
      // new CleanWebpackPlugin(),
    ],
    // puts vendor modules into their own bundles; loads once unless new pkgs were installed
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
          },
        },
      },
    },
  };

  if (development) {
    config = {
      ...commonConfig,
      mode: 'development',
      devtool: 'inline-source-map',
      output: {
        path: path.resolve(__dirname, 'dist/client'),
        chunkFilename: '[name].bundle.js',
        filename: '[name].bundle.js',
        publicPath: '/',
      },
      devServer: {
        publicPath: '/',
        contentBase: 'dist',
        open: true,
        hot: true,
        port: 8888,
        proxy: {
          '/graphql': {
            target: 'http://localhost:4000/',
          },
        },
      },
    };
  }

  if (production) {
    config = {
      ...commonConfig,
      mode: 'production',
      devtool: 'source-map',
      output: {
        path: path.resolve(__dirname, 'dist/client'),
        chunkFilename: '[name].[chunkhash].bundle.js',
        filename: '[name].[chunkhash].bundle.js',
        publicPath: '/',
      },
    };
  }

  if (api) {
    config = {
      ...commonConfig,
      target: 'node',
      mode: 'production',
      devtool: 'source-map',
      entry: {
        api: path.resolve(__dirname, 'src/api/server.js'),
      },
      output: {
        path: path.resolve(__dirname, 'dist/api'),
        chunkFilename: '[name].[chunkhash].bundle.js',
        filename: '[name].[chunkhash].bundle.js',
        publicPath: '/',
      },
      plugins: [],
      optimization: {},
    };
  }

  return config;
};
