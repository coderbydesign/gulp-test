// https://github.com/yeoman/generator-gulp-webapp
// https://www.npmjs.org/package/gulp-rev (no manifest? https://github.com/bustardcelly/gulp-rev-append)
// npm uninstall gulp-rev --save-dev
// http://travismaynard.com/writing/getting-started-with-gulp

var gulp    = require ('gulp'),
    jshint  = require ('gulp-jshint'),
    sass    = require('gulp-sass'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename')
    buster  = require('gulp-rev'),
    distDir = 'dist/assets',
    cssSrc  = 'build/assets/scss/*.scss',
    jsSrc   = 'build/assets/js/*.js';

// Lint
gulp.task('lint', function(){
  return gulp.src(jsSrc)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Sass
gulp.task('sass', function(){
  return gulp.src(cssSrc)
    .pipe(sass())
    .pipe(buster())
    .pipe(gulp.dest(distDir + '/css'));
});

// Concat & min
gulp.task('scripts', function(){
  return gulp.src(jsSrc)
    .pipe(concat('app.js'))
    .pipe(buster())
    .pipe(gulp.dest(distDir + '/js'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(buster())
    .pipe(gulp.dest(distDir + '/js'));
});

// Watcher
gulp.task('watch', function(){
  gulp.watch(jsSrc, ['lint', 'scripts']);
  gulp.watch(cssSrc, ['sass']);
});

// Default task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);