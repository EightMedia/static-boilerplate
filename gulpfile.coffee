path = require 'path'

webpack = require "webpack"
webpackConfig = require "./webpack.config.js"
webpackCompiler = webpack(webpackConfig)

gulp = require "gulp"
gutil = require "gulp-util"
plumber = require "gulp-plumber"
changed = require "gulp-changed"
sass = require "gulp-sass"
rename = require "gulp-rename"
imagemin = require "gulp-imagemin"
uglify = require "gulp-uglify"
jade = require "gulp-jade"
connect = require "gulp-connect"
prefix = require "gulp-autoprefixer"
compress = require 'compression'


gulp.task "compile-sass", ->
  gulp.src("src/assets/css/*.scss")
    .pipe plumber()
    .pipe sass(errLogToConsole:true,outputStyle:'compressed')
    .pipe prefix()
    .pipe gulp.dest("httpdocs/assets/css")
    .pipe connect.reload()


gulp.task "compile-js", (cb)->
  webpackCompiler.run (err, stats)->
    if err
      throw new gutil.PluginError("webpack:build-dev", err)
    cb()


gulp.task "compile-jade", ->
  gulp.src(["src/**/*.jade", "!./src/includes/**/*.*"])
    .pipe plumber()
    # jade locals to be used in the templates
    .pipe jade(locals: require './src/context')
    .pipe gulp.dest("httpdocs")
    .pipe connect.reload()


gulp.task "compress-images", ->
  gulp.src("src/assets/img/**/*")
    .pipe plumber()
    .pipe changed("httpdocs/assets/img")
    .pipe imagemin(svgoPlugins:[cleanupIDs:false])
    .pipe gulp.dest("httpdocs/assets/img")


gulp.task "server", ->
  connect.server
    root: "httpdocs"
    host: "0.0.0.0"
    port: 8000
    livereload: true
    middleware: (connect, opt)->
      [compress(level:9)]


gulp.task "watch", ->
  gulp.watch "src/assets/css/**/*", ["compile-sass"]
  gulp.watch "src/assets/img/**/*", ["compress-images"]
  gulp.watch "src/assets/js/**/*", ["compile-js"]
  gulp.watch "src/**/*.jade", ["compile-jade"]


gulp.task "default", ["server", "watch"]
