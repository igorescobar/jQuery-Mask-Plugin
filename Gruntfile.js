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
						'http://localhost:9001/test/test-for-jquery-1.11.1.html',
						'http://localhost:9001/test/test-for-jquery-1.7.2.html',
						'http://localhost:9001/test/test-for-jquery-1.8.3.html',
						'http://localhost:9001/test/test-for-jquery-1.9.1.html',
						'http://localhost:9001/test/test-for-jquery-2.1.1.html',
	        			'http://localhost:9001/test/test-for-zepto.html'
        			]
    			}
    		}
    	},

        uglify: {
                options: {
                	banner: '// jQuery Mask Plugin v1.7.8\r\n// github.com/igorescobar/jQuery-Mask-Plugin\r\n'
                },
                dist: {
                        files: {
                                'jquery.mask.min.js': ['jquery.mask.js']
                        }
                }
        }
	});

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  // A convenient task alias.
  grunt.registerTask('test', ['connect', 'qunit']);
   
};