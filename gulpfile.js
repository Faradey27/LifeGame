/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
// generated on 2014-06-25 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');
var serve = require('gulp-serve');
var less = require('gulp-less');
var webserver = require('gulp-webserver');
var watch = require('gulp-watch')
 
// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return gulp.src('app/styles/main.css')
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size());
});

gulp.task('html', ['styles'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
        .pipe($.plumber())
        .pipe($.useref.assets({searchPath: '{.tmp,app}'}))
        .pipe(jsFilter)
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe(less())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('views', function() {
    return gulp.src('app/views/**/*.html')
        .pipe(gulp.dest('dist/views'));
});

gulp.task('data', function() {
    return gulp.src('app/data/*.json')
        .pipe(gulp.dest('dist/data'));
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['html', 'views', 'data']);
gulp.task('serve', serve('dist'));

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: {
        enable: true, // need this set to true to enable livereload 
        filter: function(fileName) {
          if (fileName.match(/.map$/)) { // exclude all source maps from livereload 
            return false;
          } else {
            return true;
          }
        }
      }
    }));

    gulp.watch('app/**', function(event) {  
        gulp.run('html');
    });
});



gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
