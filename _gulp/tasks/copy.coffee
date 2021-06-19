gulp = require 'gulp'
browser = require 'browser-sync'
config = require '../config'

name = config.js.serverName

#
# copy:json
#
gulp.task 'copy:json', (done) =>
	return gulp.src(config.copy.json.src, {base: config.copy.json.base})
		.pipe(gulp.dest(config.copy.json.dist))
		.on('end', browser.get(name).reload)


#
# json:watch
#
gulp.task 'json:watch', (done) =>
	return gulp.watch(config.copy.json.src, gulp.series('copy:json'))


#
# copy:plugin:css
#
gulp.task 'copy:plugin:css', (done) =>
	return gulp.src(config.copy.css.src, {base: config.copy.css.base})
		.pipe(gulp.dest(config.copy.css.dist))
		.on('end', browser.get(name).reload)

#
# css:plugin:watch
#
gulp.task 'css:plugin:watch', (done) =>
	return gulp.watch(config.copy.css.src, gulp.series('copy:plugin:css'))


