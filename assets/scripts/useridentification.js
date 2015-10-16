var getFormData = function($form){
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function(n, i){
    indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
},
useridentification = {
  init: function(){
    var store = {};
    if(store = localStorage.getItem("camouflageuser")){
      if(JSON.parse(store).loggedin) this.populate(JSON.parse(store));
    }
  },
  save: function(loggedin){
    var formData = getFormData($("#useridentification"));
    formData.loggedin = loggedin;
    localStorage.setItem("camouflageuser",  JSON.stringify(formData));
  },
  populate: function(localstorageobject){
    for(var index in localstorageobject) {
      if (localstorageobject.hasOwnProperty(index)) {
        var stored = localstorageobject[index];
        $('[name=' + index + ']').val(stored);
        $("." + index + '-text').text(stored);
      }
    }
  },
  generateRandomNumber: function(){
    $('[name=randomnumber]').val(Math.floor(Math.random() * 10000));
    return false;
  }
};
useridentification.init();
