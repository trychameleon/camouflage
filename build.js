var concat = require('./plugins/concat.js')
var MetalsmithLayouts = require('metalsmith-layouts');
var MetalsmithInPlace = require('metalsmith-in-place');
var Metalsmith = require('metalsmith');

/**
 * Build.
 */

var metalsmith = Metalsmith(__dirname)
  .metadata({
    "title": "Camouflage Test App",
    "description": "A testing platform at the intersection of JS snippets and JS frameworks"
  })
  .use(concat)
  .use(MetalsmithLayouts({
    "engine": "handlebars",
    "directory": "./src/layouts/"
  }))
  .use(MetalsmithInPlace({
    "engine": "handlebars",
    "partials": "./src/views/"
  }))
  .build(function(err){
    if (err) throw err;
  });

