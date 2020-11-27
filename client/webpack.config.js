const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = ({ development, production }) => {
  console.log('\nWEBPACK ENV: ', { development, production }, '\n');

  let config = {};
  const commonConfig = {
    entry: {
      client: path.resolve(__dirname, 'src/main.jsx'),
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: '/node_modules/',
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              env: {
                development: {
                  compact: false,
                },
              },
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
        inject: true,
      }),
      new CleanWebpackPlugin(),
    ],
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
        path: path.resolve(__dirname, 'dist'),
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
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].[chunkhash].bundle.js',
        filename: '[name].[chunkhash].bundle.js',
        publicPath: '/',
      },
    };
  }

  return config;
};
