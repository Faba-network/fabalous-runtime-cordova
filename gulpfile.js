var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('clean', function() {
    return gulp.src('lib/')
        .pipe(clean());
});

gulp.task('copy_src_to_lib', function() {
    return gulp.src('lib/src/**')
        .pipe(gulp.dest('lib/'));
});

gulp.task('remove_src_folder', function() {
    return gulp.src('lib/src', {read: false})
        .pipe(clean());
});

gulp.task('remove_node_modules_folder', function() {
    return gulp.src('lib/node_modules', {read: false})
        .pipe(clean());
});

gulp.task('copy_config_folder', function() {
    return gulp.src('config/**')
        .pipe(gulp.dest('lib/config/'));
});

gulp.task('copy_package_json', function() {
    return gulp.src('package.json')
        .pipe(gulp.dest('lib/'));
});