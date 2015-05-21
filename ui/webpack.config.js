var path = require('path');
var webpack = require("webpack");

module.exports = {
  // This is the main file that should include all other JS files
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    "./src/main.js"],
  target: "web",
  debug: true,
  devtool: 'eval',
  output: {
    path: __dirname + "/dist/assets",
    publicPath: "/",
    // If you want to generate a filename with a hash of the content (for cache-busting)
    // filename: "main-[hash].js",
    filename: "bundle.js",
    chunkFilename: "[chunkhash].js"
  },
  resolve: {
    modulesDirectories: ['bower_components', 'node_modules']
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: "style!css"},
      {test: /\.js$/, loaders: ['react-hot',"babel"], include: path.join(__dirname, 'src')}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};