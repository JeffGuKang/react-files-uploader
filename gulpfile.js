var gulp        = require('gulp');
var util        = require('gulp-util'); //for log
var watch       = require('gulp-watch'); //Opserving changes
var uglify      = require('gulp-uglify'); //for minify
var vinyl       = require('vinyl-source-stream'); //Change stream to vinyl stream. (browserify)
var babelify    = require('babelify'); //To use babel.
var browserify  = require('browserify'); //For using node modules on browser.
var browserSync = require('browser-sync').create();
var exorcist    = require('exorcist'); //Externalizes the source map
var reactify    = require('reactify');

var getProjectName = function() {
  return require('./package.json').name;
};

var getProjectMainFileName = function() {
  return require('./package.json').main;
};

var reactifyES6 = function(file) {
  return reactify(file, {'es6': true});
};

gulp.task('build-dist-js', function() {
  browserify({
    entries: ['/src/index.js'],
    transform: [reactifyES6],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  })
  .bundle()
  .on("error", function (err) { console.log("Error: " + err.message); })
  .pipe(vinyl('ReactFileUpload.js'))
  .pipe(gulp.dest('dist/build'))
  .pipe(browserSync.stream({once: true}));
});

gulp.task('build-example-js', function() {
  browserify({
    entries: ['example/index.js'],
    transform: [reactifyES6],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  })
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
  gulp.watch("example/*.js", ['build-example-js']).on('change', browserSync.reload);
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("example/*.html").on('change', browserSync.reload);
  gulp.watch("example/*.js", ['example']).on('change', browserSync.reload);
});

gulp.task('example', ['build-example-js', 'example-server']);
