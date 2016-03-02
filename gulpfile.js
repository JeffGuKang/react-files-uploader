var gulp        = require('gulp');
var util       = require('gulp-util'); //for log
var watch   = require('gulp-watch'); //Opserving changes
var uglify      = require('gulp-uglify'); //for minify
var vinyl       = require('vinyl-source-stream'); //Change stream to vinyl stream. (browserify)
var babelify    = require('babelify'); //To use babel.
var browserify  = require('browserify'); //For using node modules on browser.
var browserSync = require('browser-sync').create();

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

gulp.task('example', function() {
  gulp.src(/example/app.js)
    .pipe(browserify({
      insertGlobals : true,
      debug : !gulp.env.production
    }))
    babelify.configure({sourceMapRelative: path.JSX}) .pipe(exorcist(path.DEST_SRC + '/bundle.js.map'))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream({once: true}));
});


/** copy original HTML and style to distribution folder. */
gulp.task('copy', function(){
  gulp.src(path.HTML, {base:path.SOURCE})
    .pipe(gulpwatch(path.SOURCE, {base:path.SOURCE}))
    .pipe(gulp.dest(path.DEST));

  gulp.src(path.STYLE, {base:path.SOURCE_STYLE})
    .pipe(gulpwatch(path.SOURCE_STYLE, {base:path.SOURCE_STYLE}))
    .pipe(gulp.dest(path.DEST_STYLE));
});

/** copy images */
gulp.task('copyImgs', function() {
   gulp.src('./app/img')
   .pipe(gulp.dest('./img'))
});


watchify.args.debug = true;
var bundler = watchify(browserify(path.ENTRY_POINT, watchify.args));

/** Babel transform. JSX to JS */
bundler.transform(babelify.configure({
    sourceMapRelative: path.JSX
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {
    util.log('Compiling JS...');

    return bundler.bundle()
        .on('error', function (err) {
            util.log(err.message);
            browserSync.notify("Browserify Error!");
            this.emit("end");
        })
        .pipe(exorcist(path.DEST_SRC + '/bundle.js.map'))
        .pipe(vinyl(path.OUT))
        .pipe(gulp.dest(path.DEST_SRC))
        .pipe(browserSync.stream({once: true}));
}


gulp.task('bundle', function () {
    gulp.watch([path.HTML, path.STYLE] , ['copy']); // When html any changes, run 'copy' task
    return bundle();
});

/**
 * First bundle, then serve from the ./app directory
 */
gulp.task('default', ['copy', 'bundle'], function () {
    browserSync.init({
        server: path.DEST
    });
});
