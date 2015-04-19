module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    jshint: {
      files: ['bin/pro', '*.js']
    }

  });

  grunt.registerTask('default', ['jshint']);

};
