/*
 * grunt-doh
 * https://github.com/bugbot/grunt-doh
 *
 * Copyright (c) 2013 Giampaolo Bellavite
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {

    "use strict";

    grunt.registerMultiTask("doh", "Run D.O.H.: Dojo Objective Harness", function () {

        var done = this.async();

        var options = this.options({
            dojo: null, // e.g. src/dojo/dojo.js
            tests: [] // e.g. ["src/myapp/tests/module.js", "myapp/othertest.js"]
        });

        grunt.log.subhead("Running tests...\n");

        var args = [];

        // Add arguments
        if (options.dojo) {
            args.push(options.dojo);
        } else {
            grunt.log.error("Please set the dojo.js path using the 'dojo' option.");
            done(false);
        }
        args.push("load=doh");
        if (options.tests && options.tests instanceof Array && options.tests.length > 0) {
            grunt.util._.forEach(options.tests, function (test) {
                args.push("test=" + test);
            });
        } else {
            grunt.fail.warn("Did you specify any test?\n\t");
        }

        var output = "";
        var child = grunt.util.spawn({
            cmd: "node",
            args: args
        }, function (err) {
            if (err) {
                grunt.verbose.or.write(output.toString().substring(output.search(/TEST SUMMARY\:/ig)));
                grunt.log.error("\nTest FAILED");
                return done(false);
            }
            grunt.verbose.or.write(output.toString().substring(output.search(/TEST SUMMARY\:/ig)));
            grunt.log.success("\nTest SUCCESS");
            done();
        });
        child.stdout.on("data", function (data) {
            output += data;
            grunt.verbose.write(data);
        });
        child.stderr.on("data", function (data) {
            grunt.verbose.error(data);
        });
    });
};