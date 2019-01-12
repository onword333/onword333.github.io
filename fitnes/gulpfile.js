var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var watch = require('gulp-watch');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var bourbon = require('bourbon').includePaths;


gulp.task('images', function() {
  gulp.src('src/images/**/*')
  .pipe(plumber())
  //.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
  .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
  .pipe(gulp.dest('dist/images/'));
});

// Static Server + watching scss/html files
gulp.task('serve', function() {

  browserSync.init({
      server: "./dist"
  });

  // gulp.watch('src/images/**/*',gulp.series('images'));
  watch('src/images/**/*',gulp.series('images'));
  gulp.watch("src/styles/*.scss", gulp.series('sass'));
  gulp.watch("dist/**/*.html").on('change', browserSync.reload);
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("src/styles/*.scss")
    .pipe(plumber())
    .pipe(sass({
        includePaths: ["styles"].concat(bourbon)
    }))
    .pipe(autoprefixer('last 10 versions'))
    .pipe(gulp.dest("dist/styles"))
    .pipe(browserSync.stream())

    //.pipe(sourcemaps.init())
    .pipe(cssnano()) // Сжимаем
    //.pipe(sourcemaps.write('.'))
    .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
    .pipe(gulp.dest("dist/styles"))
    //.pipe(browserSync.stream());
});

gulp.task('default', gulp.series('serve'));