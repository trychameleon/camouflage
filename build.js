var concat = require('./plugins/concat.js'),
    congregate = require('./plugins/congregate.js'),
    assets = require('metalsmith-assets'),
    MetalsmithLayouts = require('metalsmith-layouts'),
    MetalsmithInPlace = require('metalsmith-in-place'),
    Metalsmith = require('metalsmith');

/**
 * Build.
 */

var metalsmith = Metalsmith(__dirname)
  .source("./assets")
  .metadata({
    "title": "Camouflage Test App",
    "description": "A testing platform at the intersection of JS snippets and JS frameworks"
  })
  .use(concat)
  .use(congregate({
    "files": ["./node_modules/jquery/dist/jquery.js",
              "./node_modules/bootstrap/dist/js/bootstrap.js",
              "./node_modules/metismenu/dist/metisMenu.js"],
    "output": "./scripts/"
  }))
  .use(congregate({
    "files": ["./node_modules/font-awesome/css/font-awesome.css"],
    "output": "./styles/"
  }))
  .use(assets({
    "source": "./node_modules/font-awesome/fonts/",
    "destination": "./fonts/"
  }))
  .use(MetalsmithLayouts({
    "engine": "handlebars",
    "directory": "./assets/layouts/"
  }))
  .use(MetalsmithInPlace({
    "engine": "handlebars",
    "partials": "./assets/partials/"
  }))
  .build(function(err){
    if (err) throw err;
  });
