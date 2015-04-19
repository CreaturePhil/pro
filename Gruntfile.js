module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    jshint: {
      files: ['bin/pro', '*.js']
    },

    jscs: {
      src: ['bin/pro', '*.js'],
      options: {
        config: '.jscsrc'
      }
    }

  });

  grunt.registerTask('default', ['jshint', 'jscs']);

};
