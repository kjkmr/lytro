gulp = require 'gulp'
autoprefixer = require 'gulp-autoprefixer'
sourcemaps = require 'gulp-sourcemaps'
plumber = require 'gulp-plumber'
browser = require 'browser-sync'
notify = require 'gulp-notify'
stylus = require 'gulp-stylus'
wait = require 'gulp-wait'
config = require '../config'


name = config.js.serverName

#
# styl:build
#
gulp.task 'styl:build', (done) =>
	return gulp.src(config.styl.src)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(sourcemaps.init())
		.pipe(stylus())
		# .pipe(autoprefixer({browsers: ['last 4 versions']}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.styl.dist))
		.pipe(browser.get(name).reload({stream:true}))


#
# styl:watch
#
gulp.task 'styl:watch', (done) =>
	return gulp.watch(config.styl.watch_src, gulp.series('styl:build'))


#
# styl:build:prd
#
gulp.task 'styl:build:prd', (done) =>
	return gulp.src(config.styl.src)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(stylus({compress: true}))
		.pipe(autoprefixer())
		.pipe(gulp.dest(config.styl.dist))

