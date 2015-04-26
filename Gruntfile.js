module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    jshint: {
      files: ['*.js', 'lib/*.js', 'test/*.js']
    },

    jscs: {
      src: ['*.js', 'lib/*.js', 'test/*.js'],
      options: {
        config: '.jscsrc'
      }
    }

  });

  grunt.registerTask('default', ['jshint', 'jscs']);

};
