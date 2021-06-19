gulp = require "gulp"
pug = require "gulp-pug"
plumber = require "gulp-plumber"
notify = require "gulp-notify"
browser = require "browser-sync"
changed = require 'gulp-changed'
config = require "../config"
replace = require('gulp-replace');

name = config.js.serverName

#
# pug:watch
#
gulp.task 'pug:build', (done) =>
	return gulp.src(config.pug.src)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		# .pipe(changed(config.pug.dist, {extension: '.html'}))
		.pipe(pug(config.pug.options))
		# ----- ソニーの変なエラーチェックに無理やり対応 -----
		.pipe(replace('\t',''))
		.pipe(replace('><!--','>\n<!--'))
		.pipe(replace('<title>\n','<title>'))
		# -----------
		.pipe(gulp.dest(config.pug.dist))
		.on('end', browser.get(name).reload)


#
# pug:watch
#
gulp.task 'pug:watch', (done) =>
	return gulp.watch(config.pug.watch_src, gulp.series('pug:build'))
