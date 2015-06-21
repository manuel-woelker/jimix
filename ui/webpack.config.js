var path = require('path');
var webpack = require("webpack");

module.exports = {
  // This is the main file that should include all other JS files
  entry: [
//    'webpack-dev-server/client?http://localhost:8081', // WebpackDevServer host and port
//    'webpack/hot/only-dev-server',
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
      {test: /\.js$/, loaders: ['react-hot',"babel"], include: path.join(__dirname, 'src')},
      {test: /\.css$/, loader: "style!css"},
      { test: /\.woff$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" }
    ]
  },
  plugins: [
//    new webpack.HotModuleReplacementPlugin(),
//    new webpack.NoErrorsPlugin()
  ]
};
