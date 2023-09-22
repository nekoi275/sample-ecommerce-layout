const gulp = require('gulp');
const sass = require('gulp-sass');
const path = require('path');
const clean = require('gulp-clean');
const webpack = require('webpack-stream');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = (require('yargs').argv.prod == undefined) ? false : true;
sass.compiler = require('sass');

const output = path.resolve(__dirname, 'dist');
const htmlConfig = {
    meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
    title: 'Nice store',
    favicon: 'src/img/logo_icon.png'
};
const webpackConfig = {
    output: {
        filename: 'main.js',
    },
    mode: isProduction ? 'production' : 'development',
    plugins: [
        new HtmlWebpackPlugin(htmlConfig)
    ],
    module: {
        rules: [{
            test: /\.ejs$/,
            use: ['ejs-loader']
        }]
    }
};

let cleanTask = function () {
    return gulp.src(output, { read: false, allowEmpty: true }).pipe(clean());
};
let buildCSS = function () {
    return gulp.src('./src/scss/style.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(path.resolve(output, 'css')));
};
let copyWebfonts = function () {
    return gulp.src([
        'node_modules/\@fortawesome/fontawesome-free/webfonts/*',
    ]).pipe(gulp.dest(path.resolve(output, 'webfonts')));
};
let copySlickfonts = function () {
    return gulp.src([
        'node_modules/slick-carousel/slick/fonts/*'
    ]).pipe(gulp.dest(path.resolve(output, 'css/fonts')));
};
let copyImg = function () {
    return gulp.src([
        'src/img/*',
        'node_modules/slick-carousel/slick/ajax-loader.gif'])
        .pipe(gulp.dest(path.resolve(output, 'img')));
};
let copyJSON = function () {
    return gulp.src(['src/json/*'])
        .pipe(gulp.dest(path.resolve(output, 'api')));
};
let buildJS = function () {
    return gulp.src('src/js/index.js').pipe(webpack(webpackConfig))
        .pipe(gulp.dest(output));
};
let copyAll = gulp.series(copyWebfonts, copySlickfonts, copyImg, copyJSON);
let build = gulp.parallel(buildCSS, copyAll, buildJS);
gulp.task('clean', cleanTask);
gulp.task('build', build);
gulp.task('copy', copyAll);
exports.default = gulp.series(cleanTask, build);