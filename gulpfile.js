var gulp = require('gulp');

var jshint = require('gulp-jshint');
var browserify = require('browserify');
var rename = require('gulp-rename');
var vinylSourceStream = require('vinyl-source-stream');

gulp.task('lint', function() {
  return gulp.src('client/src/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  var file = './client/src/index.js';
  var b = browserify({
    entries: [file],
    debug: true
  });
  return b.bundle()
      .pipe(vinylSourceStream(file))
      .pipe(rename('bundle.js'))
      .pipe(gulp.dest('./client/public/js'));
});

gulp.task('watch', function() {
  gulp.watch('./client/src/**/*.js', ['default']);
})

gulp.task('default', ['lint', 'scripts']);
