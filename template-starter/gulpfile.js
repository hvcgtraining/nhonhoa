const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');

const sassTask = function () {
    return src('project/src/sass/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 99 version'],
            cascade: false
        }))
        .pipe(dest('project/dist/css'))
};

const jsTask = function () {
    return src('project/src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest('project/dist/js'))
};

const pugTaskPages = function () {
    return src('project/src/view/pages/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(dest('project/dist/html/pages'))
};

const pugTaskComponents = function () {
    return src('project/src/view/components/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(dest('project/dist/html/components'))
};

function watchTask() {
    watch(['project/src/js/**/*.js', 'project/src/sass/**/*.scss', 'project/src/view/**/*.pug'],
        parallel(sassTask, jsTask, pugTaskPages, pugTaskComponents))
};

exports.sassTask = sassTask;
exports.jsTask = jsTask;
exports.pugTaskPages = pugTaskPages;
exports.pugTaskComponents = pugTaskComponents;
exports.watchTask = watchTask;
exports.default = series(parallel(jsTask, sassTask, pugTaskPages, pugTaskComponents),watchTask);