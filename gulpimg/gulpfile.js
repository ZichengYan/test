var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
// const uglify = require('gulp-uglify');
// const babel = require("gulp-babel");


gulp.task('default', function () {
    /*return gulp.src('images/!*')
        .pipe(smushit({
            verbose: true
        }))
        .pipe(gulp.dest('smushit-dist'));*/
    return gulp.src('images/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant({quality:1})]
        }))
        .pipe(gulp.dest('imagemin-dist'));
    /*return gulp.src('./src/components/!**',{base:'./src'})
        .pipe(babel({
            presets: ['es2015']
        }))
        // .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'))*/
})