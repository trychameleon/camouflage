var arguments = process.argv,
    assets = require('metalsmith-assets'),
    concat = require('./plugins/concat.js'),
    congregate = require('@trychameleon/metalsmith-congregate'),
    content = require('./content.json'),
    MetalsmithLayouts = require('metalsmith-layouts'),
    MetalsmithInPlace = require('metalsmith-in-place'),
    Metalsmith = require('metalsmith'),
    serve = require('metalsmith-serve'),
    serveAssets = arguments.indexOf('-s') >= 0  || arguments.indexOf('--serve') >= 0  ? true : false;

/**
 * Build.
 */

var metalsmith = Metalsmith(__dirname)
  .source("./assets")
  .metadata(content)
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
    "source": "./node_modules/bootstrap/dist/fonts/",
    "destination": "./fonts/"
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

  if(serveAssets){
    metalsmith.use(serve({
      port: 6890,
      verbose: true,
      http_error_files: {
        404: "/pages/404.html"
      }
    }));
  };

  metalsmith.build(function(err){
    if (err) throw err;
  });


