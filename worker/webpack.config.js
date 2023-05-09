// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.ya?ml$/,
        use: 'yaml-loader',
        type: 'json',
      }
    ]
  }
}
