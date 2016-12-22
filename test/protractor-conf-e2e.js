const HtmlReporter = require('protractor-html-screenshot-reporter'),
    selenium = require('selenium-server-standalone-jar');

exports.config = {
    specs: ['test-specs/test-cases/home-page/TC_Web_HeaderFooterValidate.spec.js'],
    seleniumServerJar: selenium.path,
    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path': require('phantomjs').path,
        'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
    },

    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: true,
        showColors: true,
        includeStackTrace: false
    },

    onPrepare: function() {
        jasmine.getEnv().addReporter(
            new HtmlReporter({
                baseDirectory: 'test/test-specs/screenshots',
                docTitle: 'Test Case Report',
                takeScreenshotsOnlyOnFailures: true,
                cssOverrideFile: '../../test-specs/style/protractorReport.css',
            })
        );
    }
};