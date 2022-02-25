const { src, dest, series } = require("gulp");
const sass = require("gulp-dart-sass");
const fs = require('fs');
const path = require('path');
const rename = require('gulp-rename');
const concat = require('gulp-concat');


// function compileStationSass(cb) {
//     src("projects/workstation-shared/resources/workstation-shared.scss").pipe(sass())
//         .on('error', cb)
//         .pipe(rename('workstation-shared.css'))
//         .pipe(dest("dist/workstation-shared/resources")).on('end', cb);
// }

// function copyZorrorTheme(cb) {
//     src("projects/workstation-shared/resources/zorror-theme.less")
//         .on('error', cb)
//         .pipe(dest("dist/workstation-shared/resources")).on('end', cb);
// }

// exports.compileCommonResources = series(compileStationSass, copyZorrorTheme);