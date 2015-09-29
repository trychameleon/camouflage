'use strict'
var path = require('path');
var Mode = require('stat-mode');
var fs = require('fs');

/**
 * A Metalsmith plugin to bring multiple separate files to one locaiton.
 *
 * @param {Object} options
 * @param {String|String[]=} options.files - A list of file paths
 * @param {String} options.output - The output directory
 *
 * @return {Function} - The Metalsmith plugin, iterate over each of the
 * `options.files` and try to match in the corresponding `files`
 */
module.exports = function (options) {
  options.files = (
    Array.isArray(options.files) ? options.files :
      typeof options.files === 'string' ? [options.files] :
        ['/buld/']
  );

  if (typeof options.output !== 'string') {
    throw new Error('`options.output` is mandatory and has to be a string')
  }

  var filesDone = 0,
    countFilesDone = function(done) {
      filesDone++;
      if(filesDone == options.files.length){
        done();
      }
    };

  return function (files, metalsmith, done) {
    var output = {};
    options.files.forEach(function (filepattern, fileindex) {
      var name = path.join(options.output, path.basename(filepattern));
      fs.stat(filepattern, function (err, stats) {
        if (err) return done(err);
        fs.readFile(filepattern, function (err, buffer) {
          if (err) return done(err);
          var file = {};

          file.contents = buffer;

          file.mode = Mode(stats).toOctal();

          files[name] = file;
          countFilesDone(done);
        });
      });
    });
  }
};
