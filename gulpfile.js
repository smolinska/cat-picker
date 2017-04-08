'use strict';
const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
const rename = require("gulp-rename");
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const gulpBowerFiles = require('gulp-bower-files');

function swallowError(error) {
    console.error(error.toString());
    this.emit('end')
}

const src = {
    scss: 'src/css/**/*.scss',
    js: 'src/js/**/*.js',
    angularTemplates: 'src/js/**/*.html',
    templates_all: ['src/templates/**/*', 'src/index.html'],
    templates_start: 'src/index.html',
};
const out = {
    scss: 'build/css',
    js: 'build/js',
    angularTemplates: 'build/js/',
    templates: 'build',
    lib:'build/lib',
};


gulp.task('default', ['compile', 'scss', 'js', 'ng-templates'], () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "./build/"
        },
    });
    gulp.watch(src.templates_all, ['templates']);
    gulp.watch(src.scss, ['scss']);
    gulp.watch(src.js, ['js-watch']);
    gulp.watch(src.angularTemplates, ['ng-templates-watch']);
});

gulp.task('templates', ['compile'], function (done) {
    browserSync.reload();
    done();
});
gulp.task('compile', () => {
    return gulp.src(src.templates_start)
        .pipe(nunjucks.compile()).on('error', swallowError)
        .pipe(gulp.dest(out.templates));
});

gulp.task('scss', () => {
    return gulp.src(src.scss)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(out.scss))
        .pipe(browserSync.stream());
});

gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});
gulp.task('js', () => {
    return gulp.src(src.js)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(out.js));
});

gulp.task('ng-templates-watch', ['ng-templates'], function (done) {
    browserSync.reload();
    done();
});
gulp.task('ng-templates', ()=> {
    return gulp.src(src.angularTemplates)
        .pipe(gulp.dest(out.angularTemplates))
});

gulp.task("bower-files", function(){
    gulpBowerFiles().pipe(gulp.dest(out.lib));
});

