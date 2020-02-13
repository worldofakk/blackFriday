const gulp = require('gulp'),
      sass = require('gulp-sass'),
      concat = require('gulp-concat'),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCSS = require('gulp-clean-css'),
      uglyfi = require('gulp-uglify'),
      babel = require('gulp-babel'),
      del = require('del'),
      browserSync = require('browser-sync'),
      rename = require('gulp-rename'),
      critical = require('critical');

const scssFiles = [
    './src/scss/main.scss'
]

const jsFiles = [
    './src/js/libs/countDown.js',
    './src/js/libs/dotdotdot.js',
    './src/js/index.js'
]

const img = [
    './src/img/**/*.*'
]

function styles(){
    return gulp.src(scssFiles)
        .pipe(sass())
        // .pipe(autoprefixer({
        //     overrideBrowserslist: ['last 2 versions'],
        //     cascade: false
        // }))
        // .pipe(cleanCSS({
        //     level: 2
        // }))
        .pipe(rename("./style.css"))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.reload({stream: true}))
}

function scripts() {
    return gulp.src(jsFiles)
        .pipe(concat('index.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        // .pipe(uglyfi({
        //     toplevel: true
        // }))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.reload({stream: true}))
}
function image() {
    return gulp.src(img)
    .pipe(gulp.dest('./build/img'))
}


function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
    gulp.watch('./src/scss/**/*.scss', styles)
    gulp.watch('./src/js/**/*.js', scripts)
    gulp.watch("./*.html").on('change', browserSync.reload);
}

function clean() {
   return del(['build/*'])
}

function criticalCss() {
    return critical.generate({
        inline: true,
        base: './',
        src: 'index.html',
        dest: 'index.html',
        width: 1300,
        height: 900
    });
}

// gulp.task('styles', styles)
// gulp.task('scripts', scripts)
gulp.task('watch', watch);
gulp.task('clean', clean);
gulp.task('critical-css', criticalCss);
gulp.task('build', gulp.series(clean,
                                  gulp.parallel(styles, scripts, image)))
gulp.task('dev', gulp.series('build', 'watch'))