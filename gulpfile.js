var gulp = require('gulp');

var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

gulp.task('lint', function() {
  return gulp.src('src/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  return gulp.src('src/index.js')
      .pipe(browserify({
        insertGlobals: true,
        debug: true
      }))
      .pipe(rename('bundle.js'))
      .pipe(gulp.dest('./public/js'));
})

gulp.task('watch', function() {
  gulp.watch('./src/*', function() {
    gulp.run('default');
  });
})

gulp.task('default', ['lint', 'scripts']);
