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

const PATH = {
  SOURCE: 'app',
  HTML: 'app/*.html',
  SOURCE_STYLE: 'app/style',
  STYLE: 'app/style/*.css',
  ALL: ['app/js/*.js', 'app/js/**/*.js', 'app/index.html'],
  JS: ['app/js/*.js', 'app/js/**/*.js'],
  MINIFIED_OUT: 'build.min.js',
  OUT: 'bundle.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/scripts',
  DEST_STYLE: 'dist/style',
  ENTRY_POINT: './app/js/main.js',
  JSX: './app/js',
  EXAMPLE: '/example',
};

var getProjectName = function() {
  return require('./package.json').name;
};

var reactifyES6 = function(file) {
  return reactify(file, {'es6': true});
};

gulp.task('example', function() {
   browserify({
     entries: ['example/app.js'],
     transform: [reactifyES6],
     debug: true,
     cache: {}, packageCache: {}, fullPaths: true
   })
    // .transform(babelify.configure({
    //     sourceMapRelative: 'example/*.js'
    // }))
    // .require('example/app.js', { entry: true })
    .bundle()
    .on("error", function (err) { console.log("Error: " + err.message); })
    .pipe(exorcist(PATH.DEST_SRC + '/bundle.js.map'))
    .pipe(vinyl('bundle.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(PATH.DEST_SRC))
    .pipe(browserSync.stream({once: true}));

    browserSync.init({
        server: './'
    });


    // gulp.src("/example/*.html", {base: "/example"})
    //   .pipe(gulp.watch("/example", {base: "/example"}))
    //   .pipe(gulp.dest("dist/example/*.html"));
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
