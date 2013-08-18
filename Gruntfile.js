module.exports = function(grunt) {
    grunt.initConfig({

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
						'http://localhost:9001/test/test-for-jquery.html',
	        			'http://localhost:9001/test/test-for-zepto.html'
        			]
    			}
    		}
    	}
	});

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');
  
  // A convenient task alias.
  grunt.registerTask('test', ['connect', 'qunit']);
   
};