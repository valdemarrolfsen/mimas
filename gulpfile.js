var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
let cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var rename = require("gulp-rename");
var del = require('del');
 
var paths = {
  scripts: ['src/static/js/**/*.js'],
  scss: ['src/static/scss/**/*.scss'],
  images: 'src/static/img/**/*',
  index: 'src/index.html'
};
 
// Not all tasks need to use streams 
// A gulpfile is just another node program and you can use any package available on npm 
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src` 
  return del(['dist']);
});
 
gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts) 
  // with sourcemaps all the way down 
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});
 
// Copy all static images 
gulp.task('images', function() {
  return gulp.src(paths.images)
    // Pass in options to the task 
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('style', function() {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('index', function() {
  return gulp.src(paths.index)
    .pipe(gulp.dest('dist/'));
});
 
// Rerun the task when a file changes 
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.scss, ['style']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.index, ['index']);
});
 
// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['clean', 'watch', 'index', 'scripts', 'images', 'style']);
