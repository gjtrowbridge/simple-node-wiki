const path = require('path');

module.exports = {
  context: __dirname,
  entry: {
    main: './client/src/main2.jsx',
  },
  output: {
    path: path.join(__dirname, 'client/public/assets/js'),
    filename: 'bundle2.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: ['@babel/plugin-transform-runtime'],
          }
        },
      }
    ]
  },
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      'Root': __dirname,
      'Src': path.join(__dirname, './client/src'),
      'Components': path.join(__dirname, './client/src/components'),
      'Stores': path.join(__dirname, './client/src/stores'),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'client/public'),
    historyApiFallback: true,
    proxy: [
      {
        context: ['/_api', '/_auth', '/_public'],
        target: 'http://localhost:8090',
      },
    ],
    port: 9000,
    publicPath: '/_public/assets/js/',
  },
  mode: 'development',
  target: 'web',
};
