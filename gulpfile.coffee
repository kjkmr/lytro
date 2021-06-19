gulp = require "gulp"
childProcess = require "child_process"
spawn = childProcess.spawn
config = require "./_gulp/config"
requireDir = require 'require-dir'
requireDir("./_gulp/tasks/")


# 
# デフォルトタスク
#
_default = (done)=>
	if !config.isPrd
		# watch中 taskファイル内を編集した時タスクを再起動させる
		process = undefined
		restart = ()->
			if (typeof process != "undefined")
				process.kill()
			process = spawn("gulp", ["_dev"], {stdio: "inherit"})

		gulp.watch(['gulpfile.coffee','./_gulp/**/*.coffee'], restart)

		restart()
	else
		process = spawn("gulp", ["_prd", "--env", "prd"], {stdio: "inherit"})

	done()
	return

exports.default = _default


# 
# 開発用
# 
gulp.task '_dev',
	gulp.series(
		gulp.parallel(
			'delete:dist'
		)
		gulp.parallel(
			'images:copy'
			'copy:json'
		)
		gulp.parallel(
			'webpack:build'
			'styl:build'
			'pug:build'
			'plugin:js:build'
		)
		gulp.parallel(
			'webpack:devServer'
			'styl:watch'
			'pug:watch'
			'plugin:js:watch'
			'images:watch'
			'json:watch'
			# 'css:plugin:watch'
		)
	)


#
# 本番用
#
gulp.task '_prd',
	gulp.series(
		gulp.parallel(
			'delete:dist'
		)
		gulp.parallel(
			'images:copy'
			'copy:json'
		)
		gulp.parallel(
			'webpack:build'
			'styl:build:prd'
			'pug:build'
			'plugin:js:build:release'
		)
	)
