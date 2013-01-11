module.exports = function(grunt) {

  // Load grunt-contrib, which contains requirejs
  grunt.loadNpmTasks('grunt-contrib');

  // Configuration of the tasks we use
  grunt.initConfig({
    // Clean dist folder
    clean: { dist: ['dist'] }

    // JSHint configuration
    // see here for explanation: http://www.jshint.com/options/
  , jshint: {
      options: { browser: true
               , curly: true
               , devel: true
               , debug: true
               , eqeqeq: true
               , expr: true
               , forin: true
               , immed: true
               , latedef: true
               , laxcomma: true
               , newcap: true
               , noarg: true
               , onevar: true
               , trailing: true
               , undef: true
               }
    , globals: { // Needed for requireJS
                 define: true
               , require: true
               , requirejs: true
               , has: true
               , module: true
               // Needed for accessing env variables in gruntfile
               , process: true
               // Needed for tests
               , describe: true
               , it: true
               }
    }

    // The lint task will run JSHint and report any errors
    // You can change the options for this task, by reading this:
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md
  , lint: { requireConfig: ['src/*.js']
          }


    // Minification
  , min: { clientjs: { src: ['dist/tldrio-api-js-client.js']
                       , dest: 'dist/tldrio-api-js-client.min.js'
                       }
         }


    // requireJS config
    // https://github.com/gruntjs/grunt-contrib
    // pretty much the same as with requireJS without grunt
  , requirejs: { clientjs: { options: { optimize: 'none'
                                      , preserveLicenseComments: false
                                      , inlineText: true
                                      //, mainConfigFile: 'assets/js/config.requirejs.js'
                                      , paths: { jquery: 'vendor/jquery/jquery-1.8.3'
                                               , domReady: 'vendor/require/domReady'
                                               }
                                      , baseUrl: 'src'
                                      , namespace: 'tajc'
                                      , name: 'vendor/require/almond'
                                      , include: ['jsClient']
                                      , out: 'dist/tldrio-api-js-client.js'
                                      }
                           }
               }
  });



  /*
   * Tasks
   */
  grunt.registerTask('js', 'lint requirejs:clientjs');
  grunt.registerTask('all', 'js min');
  grunt.registerTask('default', 'all');

};
