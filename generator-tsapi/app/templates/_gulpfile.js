var    gulp = require('gulp'),
		 ts = require('gulp-typescript'),
		 lr = require('gulp-livereload')
	nodemon = require('gulp-nodemon');

gulp.task('typescript', function() {
	console.log('Typescript Compiling');
	return gulp.src('server/**/*.ts')
		.pipe(ts({module: 'commonjs'})).js
		.pipe(gulp.dest('./deploy/server'))
});

gulp.task('watch', function() {
	gulp.watch('server/**/*.ts', ['typescript']);
});

gulp.task('serve', ['typescript'], function() {
	lr.listen();
	nodemon({
		script: 'deploy/server/index.js',
		ext: 'js'
	}).on('restart', function() {
		setTimeout(function() {
			lr.changed();
		}, 500);
	});
});

gulp.task('deploy', function() {
	return gulp.src(['package.json'])
		.pipe(gulp.dest('./deploy'));
})

gulp.task('default', ['deploy']);
