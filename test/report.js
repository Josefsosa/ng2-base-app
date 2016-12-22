'use strict';

const fs = require('fs'),
  path = require('path'),
  clc = require('cli-color'),
  present = require('present'),
  shell = require('gulp-shell'),
  istanbul = require('istanbul');


module.exports = (callback) => {
  let startTime = present();
  console.log(clc.green('info: ') + 'Remapping coverage report to TypeScript...');

  fs.rename(path.join(__dirname, 'test.js.map'), path.join(__dirname, '..', 'report', 'coverage', 'lcov', 'test.js.map'), () => {
    shell.task([
      'remap-istanbul -i report/coverage/lcov/coverage-final.json -o report/coverage/lcov/coverage-remapped.json -t json'
    ], {})(() => {
      let remappedJson = require('../report/coverage/lcov/coverage-remapped.json'),
        collector = new istanbul.Collector(),
        reporter = new istanbul.Reporter(null, './report/coverage'),
        remapDuration = Math.round((present() - startTime) / 10) / 100,
        htmlReportStartTime = present();

      console.log(clc.green('info: ') + 'Remapping finished in ' + remapDuration + ' seconds');
      console.log(clc.green('info: ') + 'Generating coverage HTML report...');

      collector.add(Object.keys(remappedJson).reduce((result, source) => {
        // only keep Typescript files under src/
        if (source.match(/^src\/.*\.ts$/) && !source.match(/\.spec\.ts$/)) {
          result[source] = remappedJson[source];
        }
        return result;
      }, {}));

      reporter.add('html');
      reporter.write(collector, false, () => {
        let htmlReportDuration = Math.round((present() - htmlReportStartTime) / 10) / 100;
        console.log(clc.green('info: ') + 'Coverage HTML report generated in ' + htmlReportDuration + ' seconds');
        callback();
      });
    });
  });
};
