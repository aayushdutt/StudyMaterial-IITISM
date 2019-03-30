const gulp = require('gulp');
var purify = require('gulp-purifycss');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
 
gulp.task('css', function() {
  return gulp.src('./assets/bulma.unpurified.min.css')
    .pipe(purify(['./assets/*.js', 'index.html']))
    .pipe(minify({keepBreaks: true}))
    .pipe(rename('bulma.pure.min.css'))
    .pipe(gulp.dest('./assets'));
});

gulp.task('default', gulp.series('css', function(done){
    done()
}));