var gulp = require("gulp"),
	sass = require("gulp-sass"),
	cleanCSS = require("gulp-clean-css");

gulp.task("sass", function(){
  return gulp.src("./src/scss/style.scss", {style: "compressed"})
	  .pipe(sass())
	  .pipe(gulp.dest("./build/css"))
	  .pipe(cleanCSS({
		    keepSpecialComments: 0
	  }))
	  .pipe(gulp.dest("./build/css"));
});

gulp.task('watch', function(){
	gulp.watch(["src/scss/**/*.scss"], ["sass"]);
});
