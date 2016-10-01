var package = require('./package.json'),
    gulp = require('gulp'),
    bower = require('gulp-bower'),
    mainBowerFiles = require('main-bower-files'),
    browserify = require('browserify'),
    vueify = require('vueify'),
    inject = require('gulp-inject'),
    nodemon = require('gulp-nodemon'),
    del = require('del'),
    source = require('vinyl-source-stream'),
    rename = require('gulp-rename'),
    config = {
        publicDir: './public',
        bowerPath: './build/libs',
        templatesDir: './views/templates',
        viewsDir: './views',
    };

gulp.task('serve', function() {
    nodemon({
            script: './bin/www',
            ext: 'html js',
        })
        .on('restart', function() {
            console.log('restarted!')
        })
});

gulp.task('build', ['inject']);

gulp.task('clean', function(){
	//del.bind(null, [config.publicDir]);
	del([config.publicDir], {dryRun: true}).then(paths => {
    	console.log('Files and folders that would be deleted:', paths.join('\n'));
	});
});

gulp.task('bower', function() {
    return bower({ cmd: 'install' });
});

gulp.task('bowerFiles', ['bower'], function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest(config.publicDir + '/libs'));
});

gulp.task('fetchBowerFiles', ['bowerFiles'], function() {
	console.log('fetch');
    gulp.start('build');
});

gulp.task('deploy', ['clean'], function() {
    console.log('deploy');
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

gulp.task('inject', function() {
    var target = gulp.src(config.templatesDir + '/**/*.*'),
        sources = gulp.src([
            config.publicDir + '/**/*.css',
            config.publicDir + '/**/*.js'
        ], { read: false });

    return target.pipe(inject(sources))
        .pipe(gulp.dest(config.viewsDir));
});

gulp.task('vue', function() {
    // build + vueify and send file to public directory
    gulp.src('./build/js/main.js')
        .pipe(browserify({ transform: 'vueify', debug: true }))
        .pipe(gulp.dest('./public'));
});

gulp.task('test', function() {
    // build + vueify and send file to public directory
    // 1.
    // var b = browserify('./build/js/main.js',{ transform: [vueify], debug: true });
    // 2.
    // var b = browserify({
    // 	entries: './build/js/main.js',
    // 	transform: ["vueify"], 
    // 	debug: true });
    // 3.
    return browserify('./build/js/main.js',{ transform: [vueify], debug: true }).bundle()
        // pass desired output filename to vinyl-source-stream
        .pipe(source('vue_bundle.js'))
        .pipe(gulp.dest('./public/js/'));
});
