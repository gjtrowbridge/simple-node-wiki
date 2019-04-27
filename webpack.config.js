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
  devServer: {
    contentBase: path.join(__dirname, 'client/public'),
    publicPath: '/_public/assets/js/',
    port: 9000,
  },
  mode: 'development',
  target: 'web',
};
