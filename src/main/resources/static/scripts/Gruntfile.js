module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      buildServices: {
        src: 'services/*.js',
        dest: 'build/allServices.min.js'
      },  
       buildControllers:{
        src: 'controllers/**/*.js',
        dest: 'build/allControllers.min.js'
      },  
       buildDirectives:{
        src: 'customDirectives/*.js',
        dest: 'build/allCustomDirectives.min.js'
      },  
      buildNodeModules:{
          src: ["node_modules/angular/angular.min.js",
        	  "node_modules/jquery/dist/jquery.min.js",
        	  "node_modules/angular-ui-grid/ui-grid.min.js",
        	  "bower_components/angular-route/angular-route.js",
        	  "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
        	  "bower_components/angular-resource/angular-resource.js",
        	  "node_modules/angular-ui-router/release/angular-ui-router.js",
        	  "bower_components/pdfmake/build/pdfmake.min.js",
        	  "bower_components/pdfmake/build/vfs_fonts.js",
        	  "bower_components/pdfmake/build/csv.js",
        	  "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
        	  "bower_components/angular-dragdrop/src/angular-dragdrop.min.js",
        	  "bower_components/angularjs-datepicker/dist/angular-datepicker.js",
        	  "bower_components/angular-file-upload/dist/angular-file-upload.min.js"],
          dest: 'build/angular-packages.min.js'
        },  
        buildMetronics:{
            src: ["../metronic/global/plugins/jquery-1.11.0.min.js",
          	  "../metronic/global/plugins/jquery-migrate-1.2.1.min.js",
          	  "../metronic/global/plugins/jquery-ui/jquery-ui-1.10.3.custom.min.js",
          	  "../metronic/global/plugins/bootstrap/js/bootstrap.min.js",
          	  "../metronic/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js",
          	  "../metronic/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js",
          	  "../metronic/global/plugins/jquery.blockui.min.js",
          	  "../metronic/global/plugins/jquery.cokie.min.js",
          	  "../metronic/global/plugins/uniform/jquery.uniform.min.js",
          	  "../metronic/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js",
          	  "../metronic/global/plugins/select2/select2.min.js",
          	  "../metronic/global/plugins/datatables/media/js/jquery.dataTables.min.js",
          	  "../metronic/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js",
          	  "../metronic/admin/pages/scripts/table-editable.js",
          	  "../metronic/global/scripts/metronic.js",
          	  "../metronic/admin/layout/scripts/layout.js"],
            dest: 'build/metronics.min.js'
          }
 
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};