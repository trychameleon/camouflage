var Metalsmith = require('metalsmith');

/**
 * Build.
 */

var metalsmith = Metalsmith(__dirname)
  .build(function(err){
    if (err) throw err;
  });
