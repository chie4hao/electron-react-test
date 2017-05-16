/* eslint global-require: 0, import/no-dynamic-require: 0 */

import path from 'path';
import fs from 'fs';
import webpack from 'webpack';

export default {
  target: 'electron-renderer',

  entry: [
    path.join(__dirname, 'app/app.global.css')
  ],

  output: {
    path: __dirname + '/app/dist',
    filename: 'hello.js'
  },

  module: {
    rules: [
      {
        test: /\.global\.css$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          }
        ]
      }

    ]
  }
}
