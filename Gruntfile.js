module.exports = function(grunt) {

  //project config
  grunt.initConfig({
    svgstore: {
      options: {
        prefix : 'svg-', // This will prefix each ID
        svg: { // will be added as attributes to the resulting SVG
          viewBox : '0 0 100 100',
          class : 'svg-sprite hide'
        }
      },
      default : {
        files: {
          'build/assets/svg/svg-defs.svg': ['dev/assets/svg/*.svg']
        },
      },
    },
  });

  //
  grunt.loadNpmTasks('grunt-svgstore');

  // Default Task is basically a rebuild
  grunt.registerTask('default', ['svgstore']);
};
