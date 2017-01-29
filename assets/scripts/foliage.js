var getFormData = function($form){
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function(n, i){
    indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}, foliageStyleHide = {
  localStorageName: 'foliage',
  hide: function() {
    $('body').addClass('foliage');
  },
  show: function() {
    $('body').removeClass('foliage');
  },
  init: function() {
    var store = {};
    if (store = localStorage.getItem(this.localStorageName)) {
      if (JSON.parse(store).foliagehide) this.populate(JSON.parse(store));
    }
  },
  save: function() {
    var formData = getFormData($("#foliagecontrols form"));
    localStorage.setItem(this.localStorageName, JSON.stringify(formData));
    $("#foliagecontrols form input").is(':checked') ? foliageStyleHide.hide() : foliageStyleHide.show();
  },
  populate: function(localstorageobject) {
    for (var index in localstorageobject) {
      if (localstorageobject.hasOwnProperty(index)) {
        var stored = localstorageobject[index];
        $('[name=' + index + ']').attr('checked', !!stored);
        if (stored) {
          foliageStyleHide.hide();
        }
      }
    }
  }
};
