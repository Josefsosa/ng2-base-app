'use strict';

const gulp = require('gulp'),
  del = require('del');

gulp.task('clean', function () {
  return del([
    './dist'
  ]);
});

gulp.task('clean:all', function () {
  return del([
    './dist',
    './report',
    './out',
    './.tmp'
  ]);
});

gulp.task('clean:temp', function () {
  return del([
    './.tmp'
  ]);
});
