const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // add HtmlWebpackPlugin to bundle project files
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'PWA Text Editor'
      }),
      // add InjectManifest to generate service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }), 
      // add WebpackPwaManifest to generate manifest.json
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Andrii PWA Editor",
        short_name: "PWAEditor",
        description: "This is a PWA Editor",
        background_color: "#34deeb",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),

    ],

    module: {
      rules: [
        // options for *.css files
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // options for any kind of *js files
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
