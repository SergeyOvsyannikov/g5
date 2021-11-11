const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rigger = require('gulp-rigger');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');

const isProd = process.env.NODE_ENV === 'production';

async function buildSCSS() {
    gulp.src('src/styles/common.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));
}

async function buildHTML() {
    gulp.src('src/index.html')
        .pipe(rigger())
        .pipe(gulp.dest('dist/html'));
}

async function buildJS() {
    gulp.src([
        'node_modules/lory.js/dist/lory.js',
        'src/js/**/*.js'
    ])
        .pipe(concat('index.js'))
        .pipe(gulp.dest('dist/js'));
}

async function minifyImages() {
    gulp.src('src/images/**/*')
        .pipe(imagemin([
            // imagemin.optipng({optimizationLevel: 3, errorRecovery: false})
        ]))
        .pipe(gulp.dest('dist/images'));
}

async function watch() {
    //watch html
    gulp.watch(['src/index.html', 'src/html/*.html'], buildHTML);

    //watch scss
    gulp.watch('src/styles/**/*.scss', buildSCSS)

    //watch js
    gulp.watch('src/js/**/*.js', buildJS)
}

exports.default = gulp.series(gulp.parallel(buildHTML, buildSCSS, buildJS, minifyImages), watch);
exports.minifyImages = minifyImages;