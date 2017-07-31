'use strict';
var grunt = require('grunt');
var path = require('path');
var lib = require('../tasks/lib/pug_usemin').task(grunt);

var fileCmp = function (test, origin, target) {
    target = target || origin;
    var actual = grunt.file.read('./test/compiled/' + origin);
    var expected = grunt.file.read('./test/expected/' + target);
    test.equal(actual.trim(), expected.trim(), 'files should be equal');
};

exports.pugUsemin = {
    basic: function (test) {
        test.expect(2);
        fileCmp(test, 'basic.min.js');
        fileCmp(test, 'basic.pug');
        test.done();
    },
    multiple: function (test) {
        test.expect(2);
        fileCmp(test, 'multiple.min.js');
        fileCmp(test, 'multiple.min.css');
        test.done();
    },
    replacePath: function (test) {
        test.expect(1);
        fileCmp(test, 'replacePath.min.js');
        test.done();
    },
    linkPrefetch: function (test) {
        test.expect(1);
        fileCmp(test, 'linkPrefetch.pug');
        test.done();
    },
    production: function (test) {
        test.expect(1);
        fileCmp(test, 'production.pug');
        test.done();
    },
    solvePath: function (test) {
        test.expect(1);
        fileCmp(test, 'solvePath.pug');
        test.done();
    },
    autoprefixer: function (test) {
        test.expect(1);
        fileCmp(test, 'autoprefixer.min.css');
        test.done();
    },
    filerev: function (test) {
        test.expect(3);
        var filename = grunt.file.expand('test/compiled/filerev.min.*.js')[0];
        filename = path.basename(filename);
        fileCmp(test, filename, 'filerev.min.js');

        var compiledPug = 'test/compiled/autoprefixer.pug';
        var filerev = grunt.file.read(compiledPug);
        // script(src='test/compiled/filerev.min.da5bd415.js')
        test.ok(/test\/compiled\/filerev\.min\.(\w+)\.js/.test(filerev),
            'Make sure ' + compiledPug + ' contains the revved asset');

        compiledPug = 'test/compiled/filerev.pug';
        var filerev2 = grunt.file.read(compiledPug);
        test.ok(/test\/compiled\/filerev.min.(\w+).js/.test(filerev2),
            'Make sure ' + compiledPug + ' contains the revved asset');

        test.done();
    },
    withPrefix: function (test) {
        test.expect(2);
        var compiledPug = 'test/compiled/layout.pug';
        var layout = grunt.file.read(compiledPug);
        test.ok(/compiled\/jquery\.min\.(\w+)\.js/.test(layout),
            'Make sure ' + compiledPug + ' has the revved asset');

        var filename = grunt.file.expand('test/compiled/jquery.min.*.js')[0];
        filename = path.basename(filename);
        test.ok(/jquery.min.(\w+).js/.test(filename),
            'Make sure the minified script is revved');

        test.done();
    },
    withPrefixTwoFiles: function (test) {
        test.expect(3);
        var compiledPug = 'test/compiled/layout-advanced.pug';
        var layout = grunt.file.read(compiledPug);
        test.ok(/compiled\/jquery\.min\.(\w+)\.js/.test(layout),
            'Make sure ' + compiledPug + ' contains the revved asset');

        compiledPug = 'test/compiled/layout-advanced2.pug';
        var layout2 = grunt.file.read(compiledPug);
        test.ok(/compiled\/jquery\.min\.(\w+)\.js/.test(layout2),
            'Make sure ' + compiledPug + ' contains the revved asset');

        var filename = grunt.file.expand('test/compiled/jquery.min.*.js')[0];
        filename = path.basename(filename);
        test.ok(/jquery.min.(\w+).js/.test(filename));

        test.done();
    },
    withPrefixNoSlash: function (test) {
        test.expect(2);
        var layout = grunt.file.read('test/compiled/withPrefixNoSlash.pug');
        test.ok(/compiled\/jquery\.min\.(\w+)\.js/.test(layout));

        var filename = grunt.file.expand('test/compiled/jquery.min.*.js')[0];
        filename = path.basename(filename);
        test.ok(/jquery.min.(\w+).js/.test(filename));

        test.done();
    },
    windowsPaths: function (test) {
        test.expect(1);

        var summary = {
            'test\\compiled\\basic.min.js': 'test\\compiled\\basic.min.da5bd415.js'
        };

        var filerev = [{
            output: 'test/compiled/windowsPaths.pug',
            dest: 'test\\compiled\\basic.min.js'
        }];

        //rewrite with new paths
        lib.rewriteRevs(summary, filerev);
        //read the generated file
        var file = grunt.file.read('test/compiled/windowsPaths.pug');
        //make sure path is re-written correctly
        test.ok(/test\/compiled\/basic\.min\.da5bd415\.js/.test(file));

        test.done();
    },
    altPath: function (test) {
        test.expect(3);
        fileCmp(test, 'alternate.pug');
        fileCmp(test, 'alternate.min.css');
        fileCmp(test, 'alternate.min.js');
        test.done();
    }
};
