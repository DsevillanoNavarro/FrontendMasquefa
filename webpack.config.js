const path = require('path');

module.exports = {
  entry: './src/index.js', // archivo principal de React
  output: {
    path: path.resolve(__dirname, 'static'), // Carpeta donde se guardarán los archivos generados
    filename: 'bundle.js', // Nombre del archivo generado
  },
  mode: 'development',
  devtool: 'source-map', // útil para desarrollo
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};