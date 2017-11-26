var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// Ativa o servidor e assiste alterações no sass e html
gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: {
            baseDir: './',
            files: ['./ativos/css/**', './paginas/**'],
            index: './index.html'
        },
        watchOptions: {
            ignoreInitial: true,
            ignored: '*.scss'
        }
    });

    gulp.watch("./ativos/sass/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compila o sass e injeta no browserSync

gulp.task('sass', function () {
    return gulp.src('./ativos/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./ativos/css'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);