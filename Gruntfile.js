module.exports = function(grunt) {
    grunt.initConfig({
       qunit: {
          files: ['test/*.html']
        }
    });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  
  // A convenient task alias.
  grunt.registerTask('test', 'qunit');
   
};