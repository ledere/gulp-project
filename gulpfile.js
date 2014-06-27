/*

gulpfile.js - Use Gulp to control your local development environment
Main commands:

gulp setup - set up once. Runs first build, copies over dependencies, etc. 
    Run this again when new third party libraries have been added or updated
gulp build - run build and create package
gulp - run server


*/


var path = require('path'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    connect = require('gulp-connect');


/* Build tasks */

gulp.task('html', function () {
    gulp.src('src/app/**/*.html')
       .pipe(gulp.dest('build/app/'))
});

gulp.task('js', function () {
    gulp.src('src/app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        //.pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build/app/js/'))
});

gulp.task('css', function () {
    gulp.src('src/app/**/*.less')
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest('build/app/css/'))
});

gulp.task('libs', function () {
    gulp.src([
        'node_modules/angular/lib/angular.js'])
        .pipe(uglify())
        .pipe(gulp.dest('build/app/js/libs/'))
    gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css'])
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest('build/app/css/libs/'))
});


/* setup */
gulp.task('setup', ['libs', 'build']);


/* test */
gulp.task('test', function() {
    // run tests here
});

/* build */
gulp.task('build', ['test', 'html', 'js', 'css']);


/* gulp-connect server with live reload */
gulp.task('connect', function() {
  connect.server({
    root: 'build/app/',
    livereload: true
  });
});
gulp.task('watch', function () {
  gulp.watch(['src/app/**/*'], ['build', 'liveReload']); // always build 
});
gulp.task('liveReload', function () {
  gulp.src(['src/app/**/*']).pipe(connect.reload());
});

// set default gulp command --> server
gulp.task('server', ['build', 'connect', 'watch']);
gulp.task('default', ['server']);

