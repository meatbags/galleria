var gulp = require("gulp"),
	sass = require("gulp-sass"),
	cleanCSS = require("gulp-clean-css");

gulp.task("sass", function(){
  return gulp.src("./scss/style.scss", {style: "compressed"})
	  .pipe(sass({
			includePaths: require('node-normalize-scss').includePaths
		}))
	  .pipe(gulp.dest("./build/css"))
	  .pipe(cleanCSS({
		    keepSpecialComments: 0
	  }))
	  .pipe(gulp.dest("./build/css"));
});

gulp.task('watch', function(){
	gulp.watch(['scss/**/*.scss'], ['sass']);
});
