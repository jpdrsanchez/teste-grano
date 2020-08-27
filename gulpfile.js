// ===========================================================
// Gulpfile - FrontEnd Boilerplate
//
// 1. Modules
// 2. File Paths
// 3. Tasksc
// 4. Exports
//
// ===========================================================


// -----------------------------------------------------------
// 1. Modules - Initialize modules
// -----------------------------------------------------------

// Importing specific gulp API functions
const { src, dest, series, parallel, watch } = require('gulp'); 

// Sass/Css Modules
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cmq = require('postcss-combine-media-query');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// Javascript Modules
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');

// browserSync
const browserSync = require('browser-sync').create();

// -----------------------------------------------------------
// 2. File Paths
// -----------------------------------------------------------
const files = {
  scssPath: './src/scss/**/*.scss',
  jsPath: './src/js/**/*.js',
}

// -----------------------------------------------------------
// 3. Tasks - Create scss, js and watch tasks
// -----------------------------------------------------------
function scss() {
  return src(files.scssPath, { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      cmq(),
      cssnano() 
    ]))
    .pipe(dest('./dist/css', { sourcemaps: '.' }))
    // .pipe(browserSync.stream());
}

function js() {
  return src(files.jsPath, { sourcemaps: true })
    .pipe(webpack( require('./webpack.config.js')))
    .pipe(dest('./dist/js', { sourcemaps: '.' }))
    // .pipe(browserSync.stream());
}

function watchTask() {
  watch([files.scssPath, files.jsPath], parallel(scss, js));
  // watch('./index.html').on('change', browserSync.reload);
}

function live() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}

// -----------------------------------------------------------
// 4. Exports - Exports the tasks
// -----------------------------------------------------------
exports.scss = scss;
exports.js = js;
exports.watch = watchTask;
exports.live = live;
exports.default = parallel(scss, js, watchTask);