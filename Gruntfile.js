module.exports = function(grunt) {

  // Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Concatinate files
    concat: {
      dist: {
        src: [
          'assets/js/global/*.js',
        ],
        dest: 'assets/js/scripts.js',
      }
    },

    // Minify files
    uglify: {
      build: {
        src: 'assets/js/scripts.js',
        dest: 'assets/js/scripts.min.js'
      }
    },

    // Compile SASS with Compass
    compass: {
      dist: {
        options: {
          sassDir: 'assets/sass',
          cssDir: 'assets/css',
          outputStyle: 'expanded',
        }
      }
    },

    // Watch files
    watch: {
      compass: {
        files: ['assets/sass/**/*.scss'],
        tasks: ['compass'],
      },
      scripts: {
        files: ['assets/js/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['concat', 'uglify', 'watch']);

};