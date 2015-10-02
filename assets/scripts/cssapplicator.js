var CSSApp = {
  applyCSS: function(){
    var cssURL = $("input[name=cssURL]").val();
    $("body").append('<link href="' + cssURL + '" type="text/css" rel="stylesheet">');
  }
}
