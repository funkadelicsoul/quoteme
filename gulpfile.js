var gulp 	= require('gulp'),
	clean 	= require('gulp-clean'),
    concat 	= require('gulp-concat'),
    uglify 	= require('gulp-uglify'),
    rename 	= require('gulp-rename'),
    header 	= require('gulp-header'),
    pkg 	= require('./package.json')
    
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

var dest 	= './dist',
	app 	= 'jquery.'+pkg.name,
	src 	= [
		'./src/intro.js',
		'./src/QuoteMe.js',
		'./src/outro.js'
	]

gulp.task('clean', function() {
	return gulp.src(dest).pipe(clean())
})

gulp.task('concat', function() {
	gulp.src(src)
		.pipe(concat(app+'.js'))
		// uncompressed
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(gulp.dest(dest))
		// compressed
		.pipe(uglify())
    	.pipe(rename({ extname: '.min.js' }))
    	.pipe(header(banner, { pkg : pkg } ))
		.pipe(gulp.dest(dest))
})

gulp.task('default', ['clean','concat'])