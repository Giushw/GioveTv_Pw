/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp');
var sass = require('gulp-sass');

// create a default task and just log a message
gulp.task('sass', function () {
  gulp.src('./style/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets/'));
});
 
gulp.task('default', function () {
  gulp.watch('./style/*.scss', ['sass']);
});