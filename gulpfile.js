/*
常用：
gulp
browserSync
gulp-htmlmin
gulp-less
gulp-uglify
gulp-babel
babel-preset-es2015 
*/
var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var less = require('gulp-less');

// 监视文件改动并重新载入
gulp.task('reload',['jscompress','html','less'],function(){
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
    gulp.watch(['scripts/*.js'],{cwd: 'app'},['jscompress']);
    gulp.watch(['*.html'],{cwd: 'app'},['html']);
    gulp.watch(['styles/*.less'],{cwd: 'app'},['less']);
    // gulp.watch(['*.html','styles/**/*.css','scripts/**/*.js'],{cwd: 'app'},reload);
});
// 压缩文件
gulp.task('jscompress',function(){
    return gulp.src('app/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({stream:true}));
});
gulp.task('html',function(){
    var options = {
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值
        removeComments: true, //清除html注释
        removeEmptyAttributes: true, //删除所有空格做属性的值
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true,   //压缩页面JS
        minifyCSS: true    //压缩页面CSS
    };
    return gulp.src('app/*.html')
               .pipe(htmlmin(options))
               .pipe(gulp.dest('dist/'))
               .pipe(reload({stream:true}));
});
gulp.task('less', function () {
    return gulp.src('app/styles/*.less')
                .pipe(less())
                .pipe(gulp.dest('dist/css'))
                .pipe(reload({stream:true}));
});
