gulp = require 'gulp'
browser = require 'browser-sync'
plumber = require 'gulp-plumber'
notify = require 'gulp-notify'
wait = require 'gulp-wait'
config = require '../config'

name = config.js.serverName

# 
# images:copy
# 画像コピー
# 
gulp.task 'images:copy', (done) =>
	return gulp.src(config.images.src, {base: config.images.base})
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(wait(300))
		.pipe(gulp.dest(config.images.dist))
		.on('end', browser.get(name).reload)


#  
# images:watch
# 画像フォルダー監視
#  
gulp.task 'images:watch', (done) =>
	return gulp.watch(config.images.src, gulp.series('images:copy'))

