gulp = require 'gulp'
plumber = require 'gulp-plumber'
notify = require 'gulp-notify'
concat = require 'gulp-concat'
config = require '../config'

# -----------------
# js plugin
# -----------------

#
# plugin:js:build
# プラグイン結合: 開発用
#
gulp.task 'plugin:js:build', (done) =>
	return gulp.src(config.plugin.js.dev)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(concat('plugin.js'))
		.pipe(gulp.dest(config.plugin.js.dist))


#
# plugin:js:watch
# プラグイン監視
#
gulp.task 'plugin:js:watch', (done) =>
	return gulp.watch(config.plugin.js.dev, gulp.series('plugin:js:build'))


#
# plugin:js:build:release
# プラグイン結合: リリース用
#
gulp.task 'plugin:js:build:release', (done) =>
	return gulp.src(config.plugin.js.release)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(concat('plugin.js'))
		.pipe(gulp.dest(config.plugin.js.dist))

