var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var premailer   = require('gulp-premailer');

gulp.task('browser-sync', ['sass'], function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
});



gulp.task('sass', function () {
  return gulp.src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('src'));
});

gulp.task('build', function () {
	gulp.src('src/*.html')
		.pipe(premailer())
    .pipe(browserSync.reload({stream:true}))
		.pipe(gulp.dest('app'));
});

gulp.task('watch', function () {
  gulp.watch('src/*.scss', ['sass', 'build']);
  gulp.watch('src/*.html', ['build']);
});

gulp.task('default', ['browser-sync', 'watch', 'build']);
