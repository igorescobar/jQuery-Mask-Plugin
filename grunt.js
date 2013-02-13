module.exports = function(grunt) {
    grunt.initConfig({
        qunit: {
            files: ['test/index.html']
        }
    });

    // Task to run tests
    grunt.registerTask('test', 'qunit');
};