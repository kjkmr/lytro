minimist = require 'minimist'
path = require "path"

CURRENT				= process.cwd()
RELATIVE_PATH	= "./"
DIST					= "public/"
SRC						= "_src/"
DOCS					= "docs/"

envOption =
	string: 'env',
	default: { env: process.env.NODE_ENV || 'dev' }

options = minimist(process.argv.slice(2), envOption);

module.exports =
	# 
	# common
	# 
	absolutePath: CURRENT
	relativePath: RELATIVE_PATH
	dist: DIST
	src: SRC

	# 
	# production or develop
	# 
	isPrd: if options.env == 'prd' then true else false

	# 
	# js Settings
	# 
	js:
		dist: DIST
		serverName: "bs"

	#
	# plugin
	#
	plugin:
		js:
			dev: "#{SRC}assets/plugin/**/*.js"
			release: [ # リリース用 場外ファイルを「!」で定義
				"!#{SRC}assets/plugin/stats.min.js"
				# "!#{SRC}assets/plugin/dat.gui.min.js"
				"#{SRC}assets/plugin/**/*.js"
			]
			dist: "#{RELATIVE_PATH}#{DIST}assets/js/"

	#
	# stylus settings
	#
	styl:
		src: [
			"#{SRC}assets/**/*.styl"
			"!#{SRC}assets/**/_*.styl"
		]
		watch_src: ["#{SRC}assets/**/*.styl"]
		dist: "#{RELATIVE_PATH}#{DIST}assets/"

	#
	# pug settings
	#
	pug:
		src: [
			"#{RELATIVE_PATH}#{SRC}**/*.pug"
			"!#{RELATIVE_PATH}#{SRC}**/_*.pug"
		]
		watch_src: ["#{RELATIVE_PATH}#{SRC}**/*.pug"]
		dist: DIST
		options:
			pretty: '\t'
	#
	# images settings
	#
	images:
		base: "#{SRC}assets/images"
		src: [
			# "#{RELATIVE_PATH}#{SRC}assets/images/**/*.+(jpg|jpeg|png|gif|svg|ico|json)"
			"#{RELATIVE_PATH}#{SRC}assets/images/**/*"
		]
		dist: "#{RELATIVE_PATH}#{DIST}assets/images/"

	#
	# copy settings
	#
	copy:
		json:
			base: "#{SRC}order/assets/json"
			src: "#{RELATIVE_PATH}#{SRC}order/assets/json/**"
			dist: "#{RELATIVE_PATH}#{DIST}order/assets/js/"
		css:
			base: "#{SRC}assets/plugin/css"
			src: "#{RELATIVE_PATH}#{SRC}assets/plugin/css/**/*.css"
			dist: "#{RELATIVE_PATH}#{DIST}assets/css/"

	#
	# delete settings
	#
	delete:
		dist: "#{RELATIVE_PATH}#{DIST}"
	
	# 
	# docs
	# 
	docs:
		path: "#{RELATIVE_PATH}#{DOCS}"
		index: 'index.html'
