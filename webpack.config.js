const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.join(__dirname, './src/index.js'),
  output: {
    filename: 'main.js',
    path: path.join(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|pdf|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};