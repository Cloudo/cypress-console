const path = require('path')

let output = {
  filename: 'cypress-console.js',
  library: 'CypressConsole',
}
const libTarget = process.env.LIB_TARGET
if (libTarget === 'UMD') {
  Object.assign(output, {
    path: path.resolve(__dirname, 'umd'),
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
  })
} else if (libTarget === 'COMMONJS') {
  Object.assign(output, {
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'commonjs2',
  })
}

module.exports = {
  entry: './src/index.js',
  output,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
