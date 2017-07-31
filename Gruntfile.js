/*
 * grunt-pug-usemin
 *
 *
 * Copyright ©2014 Gilad Peleg
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function (grunt) {
    // load all npm grunt tasks
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp', 'test/compiled']
        },
        filerev: {
            pugUsemin: {
                options: {
                    noDest: false
                }
            }
        },
        // Configuration to be run (and then tested).
        pugUsemin: {
            options: {
                replacePath: {
                    '#{baseDir}': 'test' //optional - key value to replace in src path
                }
            },
            basic: {
                options: {
                    tasks: {
                        js: ['concat', 'uglify'],
                        css: ['concat', 'cssmin']
                    }
                },
                files: [{
                    dest: 'test/compiled/basic.pug',
                    src: 'test/fixtures/basic.pug'
                }, {
                    src: 'test/fixtures/{multiple,replacePath}.pug'
                }, {
                    src: 'test/fixtures/production.pug',
                    dest: 'test/compiled/production.pug'
                }, {
                      src: 'test/fixtures/linkPrefetch.pug',
                      dest: 'test/compiled/linkPrefetch.pug'
                }, {
                    src: 'test/fixtures/solvePath.pug',
                    dest: 'test/compiled/solvePath.pug'
                }]
            },
            advanced: {
                options: {
                    tasks: {
                        js: ['concat', 'uglify', 'filerev'],
                        css: ['concat', 'autoprefixer', 'cssmin']
                    },
                    dirTasks: ['filerev']
                },
                files: [{
                    dest: 'test/compiled/autoprefixer.pug',
                    src: 'test/fixtures/autoprefixer.pug'
                }, {
                    dest: 'test/compiled/windowsPaths.pug',
                    src: 'test/fixtures/windowsPaths.pug'
                }, {
                    dest: 'test/compiled/filerev.pug',
                    src: 'test/fixtures/filerev.pug'
                }]
            },
            withPrefix: {
                options: {
                    tasks: {
                        js: ['concat', 'uglify', 'filerev'],
                        css: ['concat', 'cssmin']
                    },
                    dirTasks: ['filerev'],
                    prefix: 'test/',
                    targetPrefix: 'test/'
                },
                files: [{
                    src: 'test/fixtures/layout.pug',
                    dest: 'test/compiled/layout.pug'
                }]
            },
            withPrefixTwoFiles: {
                options: {
                    tasks: {
                        js: ['concat', 'uglify', 'filerev'],
                        css: ['concat', 'cssmin']
                    },
                    dirTasks: ['filerev'],
                    prefix: 'test/',
                    targetPrefix: 'test/'
                },
                files: [{
                    src: 'test/fixtures/layout-advanced.pug',
                    dest: 'test/compiled/layout-advanced.pug'
                }, {
                    src: 'test/fixtures/layout-advanced2.pug',
                    dest: 'test/compiled/layout-advanced2.pug'
                }]
            },
            withPrefixNoSlash: {
                options: {
                    tasks: {
                        js: ['concat', 'uglify', 'filerev'],
                        css: ['concat', 'cssmin']
                    },
                    dirTasks: ['filerev'],
                    prefix: 'test',
                    targetPrefix: 'test'
                },
                files: [{
                    src: 'test/fixtures/withPrefixNoSlash.pug',
                    dest: 'test/compiled/withPrefixNoSlash.pug'
                }]
            },
            alternate: {
                options: {
                    tasks: {
                        js: ['concat', 'uglify'],
                        css: ['concat', 'cssmin']
                    }
                },
                files: [{
                    src: 'test/fixtures/alternate.pug',
                    dest: 'test/compiled/alternate.pug'
                }, ]
            },
            empty: {
                files: [{
                    dest: 'test/compiled/empty.pug',
                    src: 'test/fixtures/empty.pug'
                }]
            }
        },
        copy: {
            test: {
                src: 'test/fixtures/windowsPaths.pug',
                dest: 'test/compiled/windowsPaths.pug'
            }
        },
        devUpdate: {
            main: {
                options: {
                    //should task report already updated dependencies
                    reportUpdated: false,
                    //can be 'force'|'report'|'prompt'
                    updateType: 'prompt',
                    semver: false,
                    packages: {
                        //only devDependencies by default
                        devDependencies: true,
                        dependencies: true
                    }
                }
            }
        },
        // Unit tests.
        nodeunit: {
            tests: ['test/*.js']
        }
    });
    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', [
        'clean',
        'pugUsemin:basic',
        'pugUsemin:advanced',
        'pugUsemin:withPrefix',
        'pugUsemin:withPrefixTwoFiles',
        'pugUsemin:withPrefixNoSlash',
        'pugUsemin:alternate',
        'pugUsemin:empty',
        'copy:test',
        'nodeunit'
    ]);
};
