var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    watch = require('gulp-watch'),
    //cssnano = require('gulp-cssnano'),
    cssnano = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    bourbon = require('bourbon').includePaths,
    jade = require('gulp-jade');


gulp.task('jade', function() {
  return gulp.src(['src/**/*.jade', '!src/**/_*.jade'])
  .pipe(
    jade({
      pretty: true
    })
  )
  .pipe(gulp.dest('dist/'));
});

gulp.task('images', function() {
  gulp.src('src/images/**/*')
  .pipe(plumber())
  //.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
  .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
  .pipe(gulp.dest('dist/images/'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("src/styles/*.scss")
    .pipe(plumber())
    .pipe(sass({
        includePaths: ["styles"].concat(bourbon)
    }))
    .pipe(autoprefixer('last 10 versions', 'ie 9'))
    .pipe(cssnano())                // сжимаем
    //.pipe(rename({suffix: '.min'})) // суффикс добавляем
    .pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(gulp.dest("dist/styles"))
    .pipe(browserSync.stream());
});

gulp.task('cssmin', function () {
  return gulp.src("dist/styles/*.css")
  .pipe(plumber())
  .pipe(cssnano())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest("dist/styles"))
  .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', function() {

  browserSync.init({
      server: "./dist"
  });

  // gulp.watch('src/images/**/*',gulp.series('images'));
  watch('src/images/**/*',gulp.series('images'));
  watch(["src/styles/*.scss", "src/includes/**/_*.scss"], gulp.series('sass'));
  //watch("dist/styles/*.css", gulp.series('cssmin'));
  watch(["src/*.jade", "src/**/_*.jade"], gulp.series('jade'));
  watch("dist/**/*.html").on('change', browserSync.reload);
});

gulp.task('default', gulp.series('serve'));