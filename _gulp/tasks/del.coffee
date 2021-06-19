gulp = require 'gulp'
del = require 'del'
config = require '../config'

# 
# delete:dist
# 
gulp.task 'delete:dist', (done) =>
	return del(config.delete.dist)
