/* eslint global-require: 0, import/no-dynamic-require: 0 */

import path from 'path';
import {
  spawn
} from 'child_process';
// import fs from 'fs';
// import webpack from 'webpack';

const port = 12450;
const publicPath = `http://localhost:${port}/dist`;

export default {
  target: 'electron-renderer',

  entry: [
    path.join(__dirname, 'app/app.global.css')
  ],

  output: {
    path: path.join(__dirname, '/app/dist'),
    filename: 'hello.js'
  },

  module: {
    rules: [{
      test: /\.global\.css$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
        }
      ]
    }]
  },

  devServer: {
    port,
    publicPath,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    contentBase: path.join(__dirname, 'dist'),
    watchOptions: {
      aggregateTimeout: 300,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
    setup() {
      spawn(
          'npm', ['run', 'start-hot-renderer'], {
            shell: true,
            env: process.env,
            stdio: 'inherit'
          }
        )
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
    }

  }
};
