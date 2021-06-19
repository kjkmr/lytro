gulp = require "gulp"
webpackStream = require "webpack-stream"
webpackDevServer = require "webpack-dev-server"
webpack = require "webpack"
gulpif = require 'gulp-if'

webpackConfig = require "../webpack.config"
config = require "../config"

# 
# webpack:build
# 
gulp.task 'webpack:build', (done) =>
	webpackStream(webpackConfig, webpack)
		.pipe(gulp.dest( config.js.dist ))
	done()
	return 


# 
# webpack:devServer
#
gulp.task 'webpack:devServer', (done) =>
	compiler = webpack(webpackConfig)
	server = new webpackDevServer(compiler, webpackConfig.devServer)
	server.listen(3100, "localhost", (err)=>
		if err then throw new util.PluginError("webpack-dev-server", err)
	)
	done()
	return
