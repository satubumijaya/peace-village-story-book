const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const fileinclude = require('gulp-file-include');
const server = require('browser-sync').create();
const { watch, series } = require('gulp');

const paths = {
    scripts: {
        src: './app/',
        dest: './',
    },
};

// Reload Server
// async function reload() {
    // server.reload();
// }

// Copy assets after build
async function copyAssets() {
    gulp.src(['assets/**/*']).pipe(gulp.dest(paths.scripts.dest));
}

// Build files html and reload server
async function buildAndReload() {
    await includeHTML();
    await buildStyles();
    // await copyAssets();
    // reload();
}

async function includeHTML() {
    return gulp
        .src([
            './app/index.html',
        ])
        .pipe(
            fileinclude({
                prefix: '@@',
                basepath: '@file',
            })
        )
        .pipe(gulp.dest(paths.scripts.dest));
}
exports.includeHTML = includeHTML;

async function buildStyles() {
    return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
};
exports.buildStyles = buildStyles;


exports.default = async function () {
    // Init serve files from the build folder
    server.init({
        server: {
            baseDir: paths.scripts.dest,
        },
    });
    // Build and reload at the first time
    buildAndReload();
    // Watch task
    watch([
        './app/**/*',
        './scss/**/*.scss'
    ], series(buildAndReload));
};
