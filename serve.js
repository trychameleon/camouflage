var metalsmith = require('metalsmith');
var serve = require('metalsmith-serve');

metalsmith(__dirname)
  .clean(false)
  .ignore("**/*")
  .source("./assets")
  .use(serve({
    port: 6890,
    verbose: true,
    http_error_files: {
      404: "/pages/404.html"
    }
  }))
  .build(function(err) {
    if (err) { throw err; }
  });
