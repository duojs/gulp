/**
 * Module dependencies
 */

var multimatch = require('multimatch');
var filepipe = require('file-pipe');
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

      // initialize the file-pipe
      filepipe(file.path)
        .pipe(instance)
        .run(function(err, src, vinyl) {
          if (err) return done(err);
          file.type = extension(vinyl.path);
          file.src = src;
          done();
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
