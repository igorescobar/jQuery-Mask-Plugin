module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: ['src/{,*/}*.js']
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: './'
        }
      }
    },
    qunit: {
      all: {
        options: {
          urls: [
            'http://localhost:9001/test/test-for-jquery-1.11.1.html',
            'http://localhost:9001/test/test-for-jquery-1.7.2.html',
            'http://localhost:9001/test/test-for-jquery-1.8.3.html',
            'http://localhost:9001/test/test-for-jquery-1.9.1.html',
            'http://localhost:9001/test/test-for-jquery-2.1.1.html',
            // 'http://localhost:9001/test/test-for-zepto.html'
          ]
        }
      }
    }
  });

  // A convenient task alias.
  grunt.registerTask('test', ['jshint', 'connect', 'qunit']);
  grunt.registerTask('default', ['test']);

};