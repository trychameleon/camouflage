var getFormData = function($form){
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function(n, i){
    indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
},
  appintegration = {
  localStorageName: 'appintegration',
  init: function() {
    var store = {};
    if (store = localStorage.getItem(this.localStorageName)) {
      if (JSON.parse(store).loggedin) this.populate(JSON.parse(store));
    }
  },
  save: function(loggedin) {
    var formData = getFormData($("#appintegrationsnippets"));
    formData.loggedin = loggedin;
    localStorage.setItem(this.localStorageName, JSON.stringify(formData));
  },
  populate: function(localstorageobject) {
    for (var index in localstorageobject) {
      if (localstorageobject.hasOwnProperty(index)) {
        var stored = localstorageobject[index];
        if (stored) {
          $('[name=' + index + ']').val(stored);
          switch (index) {
            case "headsnippets":
              $(stored).appendTo(document.head);
              break;
            case "bodystartsnippets":
              $(stored).prependTo(document.body);
              break;
            case "bodyendsnippets":
              $(stored).appendTo(document.body);
              break;
          }
        }
      }
    }
  }
};

$(function() {
  appintegration.init();
});
