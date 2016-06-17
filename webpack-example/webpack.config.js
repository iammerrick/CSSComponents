module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      present: 'babel?presets=es2015,react!../loader/index.js'
    }
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['es2015', 'react']
      }
    }
    ]
  }
};
