const path = require('path');

module.exports = {
  entry: './pages/index.tsx',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    { 
        test: /\.css$/,
         use: [ 
            { loader: "css-loader", options: { modules: true, importLoaders: 1 } }, 
            "style-loader",
        ] 
    },
    {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', ".css"],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};