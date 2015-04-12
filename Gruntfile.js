module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      files: ['bin/pro', '*.js']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);

};
