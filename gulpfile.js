var package = require('./package.json'),
    gulp = require('gulp'),
    bower = require('gulp-bower'),
    del = require('del'),
    config = {
        public: './public',
    };

gulp.task('build', ['bower']);

gulp.task('clean', del.bind(null, [config.public]));

gulp.task('deploy', ['clean'], function() {
    gulp.start('build');
});

gulp.task('default', function() {
    console.log('');
    console.log('');
    console.log('To develop, run "gulp serve"');
    console.log('- Sets up');
    console.log('  - JS/SCSS watch and compile');
    console.log('  - Dust watch');
    console.log('  - LiveReload serve');
    console.log('');
    console.log('To deploy for production, run "gulp deploy"');
    console.log('- Sets up');
    console.log('  - Cleans assets folder');
    console.log('  - Generates final built files');
    console.log('');
    console.log('');
});

gulp.task('bower', function() {
    return bower({ cmd: 'install' });
});
