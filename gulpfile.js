var gulp        = require('gulp');
var util        = require('gulp-util'); //for log
var watch       = require('gulp-watch'); //Opserving changes
// var uglify      = require('gulp-uglify'); //for minify
var vinyl       = require('vinyl-source-stream'); //Change stream to vinyl stream. (browserify)
var babelify    = require('babelify'); //To use babel.
var browserify  = require('browserify'); //For using node modules on browser.
var browserSync = require('browser-sync').create();

var getProjectName = function() {
  return require('./package.json').name;
};

var getProjectMainFileName = function() {
  return require('./package.json').main;
};

gulp.task('build-dist', function() {
  browserify({
    entries: ['./src/index.js'],
    debug: false
})
  .transform("babelify", {presets: ["react"]})
  .bundle()
  .on("error", function (err) { console.log("Build Error: " + err.message); })
  .pipe(vinyl('ReactFileUpload.js'))
  .pipe(gulp.dest('dist'))
});

gulp.task('copy-css', function() {

});

gulp.task('build-example-js', function() {
  browserify({
    entries: ['example/index.js'],
    debug: true,
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    fullPaths: true // required to be true only for watchify
  })
  .transform("babelify", {presets: ["es2015", "react"]})
  .bundle()
  .on("error", function (err) { console.log("Error: " + err.message); })
  .pipe(vinyl('build.js'))
  .pipe(gulp.dest('example/build'))
  .pipe(browserSync.stream({once: true}));
});

gulp.task('example-server', function() {
  browserSync.init({
    server: './example',
  });
  gulp.watch("example/*.html").on('change', browserSync.reload);
  gulp.watch("example/*.css").on('change', browserSync.reload);
  gulp.watch("example/*.js", ['build-example-js']);
  gulp.watch("src/*.js", ['build-example-js']);
});

gulp.task('develop', ['build-example-js', 'example-server']);
gulp.task('default', ['build-dist']);
