'use strict';

var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");

var webpackConfig = require("./webpack.config.js");

gulp.task('default', ['dev']);


gulp.task('dev', function () {
	var devConfig = Object.create(webpackConfig);
	devConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
	devConfig.plugins.push(new webpack.NoErrorsPlugin());
	devConfig.entry.unshift('webpack/hot/only-dev-server');
	devConfig.entry.unshift('webpack-dev-server/client?http://localhost:8081');

	var compiler = webpack(devConfig);
	var server = new WebpackDevServer(compiler, {
		// webpack-dev-server options
		contentBase: "./src/",
		// or: contentBase: "http://localhost/",

		hot: true,
		// Enable special support for Hot Module Replacement
		// Page is no longer updated, but a "webpackHotUpdate" message is send to the content
		// Use "webpack/hot/dev-server" as additional module in your entry point
		// Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

		// webpack-dev-middleware options
		quiet: false,
		noInfo: false,
		lazy: false,
		filename: "bundle.js",
		watchDelay: 300,
		publicPath: "/",
		stats: {
			colors: true,
			chunks: false,
			modules: false

		},

		// Set this as true if you want to access dev server from arbitrary url.
		// This is handy if you are using a html5 router.
//    historyApiFallback: false,

		// Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
		// Use "*" to proxy all paths to the specified server.
		// This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
		// and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
		proxy: {
			"/api/*": "http://localhost:8080/jimix/"
		}
	});
	server.listen(8081, "0.0.0.0", function () {
		console.log("listening on port 8081");
	});
});

gulp.task('build', function (callback) {
	// modify some webpack config options
	var productionConfig = Object.create(webpackConfig);
	productionConfig.plugins = productionConfig.plugins.concat(
		new webpack.DefinePlugin({
			"process.env": {
				// This has effect on the react lib size
				"NODE_ENV": JSON.stringify("production")
			}
		})
		/*,
		 new webpack.optimize.DedupePlugin(),
		 new webpack.optimize.UglifyJsPlugin()*/
	);
	productionConfig.output.path = "target/dist";
	productionConfig.output.publicPath =  "./";
	productionConfig.debug = false;
	productionConfig.devtool = "";
	// run webpack
	webpack(productionConfig, function (err, stats) {
		if (err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
	});
});
