var extname = require('path').extname;
var myth = require('myth')
/**
 * Concat plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */

function concat(files, metalsmith, done){
  var css = '';

  for (var file in files) {
    if ('.css' != extname(file)) continue;
    css += files[file].contents.toString();
    delete files[file];
  }
  css = myth(css);
  files['styles/index.css'] = {
    contents: new Buffer(css)
  };

  done();
}

module.exports = concat;
