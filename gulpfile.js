var package = require('./package.json'),
    gulp = require('gulp'),
    bower = require('gulp-bower'),
    mainBowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    del = require('del'),
    config = {
        publicDir: './public',
        bowerPath: './build/libs' ,
        templatesDir: './views/templates',
        viewsDir: './views',
    };

gulp.task('build', ['inject']);

gulp.task('clean', del.bind(null, [config.publicDir]));

gulp.task('fetchBowerFiles', ['bowerFiles'], function() {
    gulp.start('build');
});

gulp.task('deploy', ['clean'], function() {
    gulp.start('fetchBowerFiles');
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

gulp.task('bowerFiles', ['bower'], function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest(config.publicDir + '/libs'));

});

gulp.task('inject', function() {
    var target = gulp.src(config.templatesDir + '/**/*.*'),
        sources = gulp.src([
            config.publicDir + '/**/*.css',
            config.publicDir + '/**/*.js'
        ], { read: false });

    return target.pipe(inject(sources))
        .pipe(gulp.dest(config.viewsDir));
});
