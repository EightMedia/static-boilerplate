var path = require('path');

var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var webpackCompiler = webpack(webpackConfig);

var gulp = require("gulp");
var gutil = require("gulp-util");
var plumber = require("gulp-plumber");
var changed = require("gulp-changed");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var jade = require("gulp-jade");
var connect = require("gulp-connect");
var prefix = require("gulp-autoprefixer");
var compress = require('compression');


gulp.task("compile-sass", function () {
    gulp.src("src/assets/css/*.scss")
        .pipe(plumber())
        .pipe(sass({errLogToConsole: true, outputStyle: 'compressed'}))
        .pipe(prefix())
        .pipe(gulp.dest("httpdocs/assets/css"))
        .pipe(connect.reload());
});

gulp.task("webpack", function (cb) {
    webpackCompiler.run(function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build-dev", err);
        }
        cb();
    });
});

gulp.task("compile-jade", function () {
    gulp.src(["src/**/*.jade", "!./src/includes/**/*.*"])
        .pipe(plumber())
        .pipe(jade({locals: require('./src/context')}))
        .pipe(gulp.dest("httpdocs"))
        .pipe(connect.reload());
});

gulp.task("compress-images", function () {
    gulp.src("src/assets/img/**/*")
        .pipe(plumber())
        .pipe(changed("httpdocs/assets/img"))
        .pipe(imagemin({svgoPlugins: [{ cleanupIDs: false }]}))
        .pipe(gulp.dest("httpdocs/assets/img"));
});

gulp.task("server", function () {
    connect.server({
        root: "httpdocs",
        host: "0.0.0.0",
        port: 8000,
        livereload: true,
        middleware: function () {
            return [ compress({ level: 9}) ];
        }
    });
});

gulp.task("watch", function () {
    gulp.watch("src/assets/css/**/*", ["compile-sass"]);
    gulp.watch("src/assets/img/**/*", ["compress-images"]);
    gulp.watch("src/assets/js/**/*", ["webpack"]);
    gulp.watch("src/**/*.jade", ["compile-jade"]);
});

gulp.task("default", ["server", "watch"]);
gulp.task("build", ["compile-sass", "compile-js", "compile-jade", "compress-images"]);
