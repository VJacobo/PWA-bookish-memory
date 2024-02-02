const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
const workboxPlugin = new InjectManifest({
  swSrc: './src/service-worker.js',  // Update with the path to your service worker file
  swDest: 'service-worker.js',
});

// TODO: Add CSS loaders and babel to webpack.
const cssLoader = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
};

const babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  },
};

module.exports = () => {
  return {
    mode: 'production',  
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['main'],
      }),
      new HtmlWebpackPlugin({
        template: './src/install.html',
        filename: 'install.html',
        chunks: ['install'],
      }),
      new WebpackPwaManifest({
        // TODO: Add your manifest configuration
        name: 'PWA-bookish-memory',
        short_name: 'PWA-bookish-memory',
        description: 'module19',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
          src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      workboxPlugin,
    ],

    module: {
      rules: [
        cssLoader,
        babelLoader,
      ],
    },
  };
};
