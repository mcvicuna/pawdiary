var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('browserify', function() {
  return gulp.
    src('./public/javascripts/index.js').
    pipe(browserify()).
    pipe(gulp.dest('./public/bin'));
});

gulp.task('watch', function() {
  gulp.watch(['./public/**/*.js','./public/**/*.html', '!./public/bin/**/*', '!./public/typings/**/*'], ['browserify']);
});
