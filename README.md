# grunt-doh

Run D.O.H.: Dojo Objective Harness inside a Grunt task.

## Getting Started
Install the module with:

```bash
npm install grunt-doh --save-dev
```

Then add this line to your `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-doh');
```

Run this task with the `grunt doh` command.

## Documentation

The task take two options: `dojo` (the path to dojo.js) and `tests` (an array of tests script): 

```javascript
grunt.initConfig({
    doh: {
        dist: {
            options: {
                // Set your dojo source
                dojo: "src/dojo/dojo.js",
                // Add the D.O.H. scripts to run
                tests: ["src/myapp/tests/module.js", "src/myapp/tests/other.js"]  
            }
        }
    }
});
```

As for the example above, grunt will run:

```bash
node src/dojo/dojo.js test=src/myapp/tests/module.js test=src/myapp/tests/other.js
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Lint your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2013 Giampaolo Bellavite  
Licensed under the MIT license.
