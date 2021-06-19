path = require "path"
BrowserSyncPlugin = require "browser-sync-webpack-plugin"
TerserPlugin = require('terser-webpack-plugin')
config = require "./config"

DIST = path.join(config.absolutePath, config.dist)


module.exports =
	mode: if config.isPrd then "production" else "development"
	devtool: if config.isPrd then "none" else "inline-source-map"
	entry: 
		"assets/js/app": "./_src/assets/js/app.js"
	output:
		filename: "[name].js"
	resolve:
		extensions: ['.js', '.json']
	plugins: [
		new BrowserSyncPlugin({
			host: "localhost"
			port: 3000
			proxy: "http://localhost:3100/"
			ghostMode: false
		}, {
			reload: true
			name: config.js.serverName
		})
	]
	module:
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						'@babel/preset-env',
					]
				}
			}
			{test: /\.json/, loader: 'json-loader', type: "javascript/auto"}
			{test: /\.(vert|frag|glsl)/, loaders:['raw-loader', 'glslify-loader']}
			{test: /\.pug/, loaders:['raw-loader', 'pug-html-loader']}
			{test: /\.html/, loader: 'html-loader'}
		]
		
	devServer:
		contentBase: DIST
		disableHostCheck: true
		stats: 'errors-only' #normal , errors-only , minimal
	optimization:
		minimizer: []

if config.isPrd
	module.exports.optimization.minimizer.push(
		new TerserPlugin({
			terserOptions: {
				compress: {drop_console: true}
			}
		})
	)
