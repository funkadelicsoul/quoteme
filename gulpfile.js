var gulp 	= require('gulp'),
	clean 	= require('gulp-clean'),
    concat 	= require('gulp-concat'),
    pkg 	= require('./package.json')

var dest 	= './dist',
	app 	= 'jquery.'+pkg.name+'-'+pkg.version,
	src 	= [
		'./src/intro.js',
		'./src/QuoteMe.js',
		'./src/outro.js'
	]

gulp.task('clean', function() {
	return gulp.src(dest).pipe(clean())
})

gulp.task('concat', function() {
	gulp.src(src).pipe(concat(app+'.js')).pipe(gulp.dest(dest))
})

gulp.task('default', ['clean','concat'])