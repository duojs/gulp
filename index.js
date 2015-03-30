/**
 * Module dependencies
 */

var multimatch = require('multimatch');
var fakefs = require('vinyl-fs-fake');
var through = require('through2');
var extname = require('path').extname;
var slice = [].slice;

/**
 * Export `Gulp`
 */

module.exports = Gulp;

/**
 * Initialize `Gulp`
 *
 * @param {String|Function} glob
 * @param {Function} fn (optional)
 */

function Gulp(glob, fn) {
  if ('function' == typeof glob) {
    fn = glob;
    glob = false;
  }

  // gulp option function
  return function() {
    var args = slice.call(arguments);

    // duo plugin function
    return function gulp(file, entry, done) {
      if (glob && !multimatch(file.id, glob).length) return done();
      var instance = fn.apply(fn, args);

      // initialize the stream
      fakefs.src({
        path: "file." + file.type,
        contents: file.src
      })
        .pipe(instance)
        .pipe(through.obj(function(vinyl, enc, callback) {
          file.type = extension(vinyl.path);
          file.src = vinyl.contents.toString();
          done();
          callback();
        }))
        .on("error", function(err) {
          done(err);
        });
    }
  }
}

/**
 * Get the extension
 *
 * @param {String} path
 * @return {String}
 * @api private
 */

function extension(path) {
  return extname(path).slice(1);
}
