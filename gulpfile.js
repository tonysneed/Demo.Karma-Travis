var gulp = require('gulp');
var tslint = require('gulp-tslint');
var del = require('del');
var exec = require('child_process').execSync;

gulp.task('vet', function() {
    return gulp.src(['./src/**/*.ts', 'src/**/*.spec.ts'])
    .pipe(tslint())
    .pipe(tslint.report());
});

gulp.task('clean', function() {
    return del('./dist/');
});

gulp.task('compile', ['vet', 'clean'], function() {
    exec('tsc -p src');
});

gulp.task('compile-watch', ['compile'], function() {
    gulp.watch(['src/**/*.ts', 'src/**/*.spec.ts'], ['compile']);
});

gulp.task('tests-run', ['compile'], function () {
    startTests();
});

function startTests() {

    console.log('Karma started');

    var Server = require('karma').Server;
    var server = new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    });

    server.on('run_complete', function (browser, result) {
        console.log('Karma completed');
    });

    server.start();
}