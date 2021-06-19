# https://esdoc.org/
# を使用
# $ ./node_modules/.bin/esdoc -c ./_doc/esdoc.json
# で実行


# gulp = require "gulp"
# del = require 'del'
# esdoc = require('gulp-esdoc')
# browserSync = require("browser-sync")
# runSequence = require("run-sequence")

# config = require('../config')

# #
# # codo
# #
# gulp.task 'jsdoc', (done) =>
# 	return gulp.src("./_src/assets/js/**/*.js")
# 		.pipe(esdoc({ destination: "./docs" }))


# #
# # codo:browser
# #
# gulp.task 'codo:browser', (done) =>
# 	browserSync({
# 		server: config.docs.path
# 		index: config.docs.index
# 	})
# 	done()
# 	return


# #
# # codo:watch
# #
# gulp.task 'codo:watch', (done) =>
# 	return gulp.watch("./_src/assets/js/**/*.coffee", gulp.series('codo'))


# # 
# # delete:docs
# # 
# gulp.task 'delete:docs', (done) =>
# 	return del(['./docs'])


# # 
# # docs
# # 
# gulp.task 'docs',
# 	gulp.series(
# 		gulp.parallel(
# 			'delete:docs'
# 		)
# 		gulp.parallel(
# 			'jsdoc'
# 		)
# 		# gulp.parallel(
# 		# 	'codo:browser',
# 		# 	'codo:watch'
# 		# )
# 	)
	