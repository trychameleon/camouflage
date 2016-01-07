var getFormData = function($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
      indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
  },
  useridentification = {
    localStorageName: 'camouflageuser',
    init: function(){
      var store = {};
      if(store = localStorage.getItem(this.localStorageName)){
        if(JSON.parse(store).loggedin) this.populate(JSON.parse(store));
      }
    },
    save: function(loggedin){
      var formData = getFormData($('#useridentification'));
      formData.loggedin = loggedin;
      localStorage.setItem(this.localStorageName,  JSON.stringify(formData));
    },
    populate: function(localstorageobject){
      for(var index in localstorageobject) {
        if (localstorageobject.hasOwnProperty(index)) {
          var stored = localstorageobject[index];
          $('[name=' + index + ']').val(stored);
          $('.' + index + '-text').text(stored);
        }
      }
      if(localstorageobject.name && localstorageobject.name.length
        && localstorageobject.randomnumber && localstorageobject.randomnumber.length
        && chmln && chmln.identify){

        this.addChmlnIdentity(localstorageobject.name + '-' + localstorageobject.randomnumber, localstorageobject);
      }
    },
    addChmlnIdentity: function(identity, userdata){
      userdata = $.extend({uid: identity} || {}, userdata);
      chmln.identify({uid: userdata.name + '-' + userdata.randomnumber});
      if(window.location.hash == ""){
        window.location.hash = identity;
      }
    },
    generateRandomNumber: function(){
      $('[name=randomnumber]').val(Math.floor(Math.random() * 10000));
      return false;
    }
  };

  turbolinks = {
    localStorageName: 'camouflageturbolinks',
    init: function(){
      if(this.turbolinksEnabled()) {
        $('.turbolinks-enabled').attr('checked','');
      }
      $('.turbolinks-enabled').on('click', function(event){
        this.enableTurbolinks(event.target.checked);
        this.setupEvents();
        if(!this.turbolinksEnabled()) window.location.reload();
      }.bind(this));
      this.setupEvents();
    },
    setupEvents: function(){
      if(this.turbolinksEnabled()){
        $('a:not([href="#"])').on('click', this.linkHandler.bind(this));
      } else {
        $('a:not([href="#"])').off('click', this.linkHandler.bind(this));
      }
    },
    enableTurbolinks: function(on) {
      localStorage.setItem(this.localStorageName,  on);
    },
    turbolinksEnabled: function() {
      return localStorage.getItem(this.localStorageName) === 'true';
    },
    linkHandler: function(event){
      event.preventDefault();
      var address = event.target.getAttribute('href');
      $('body').load(address, function(){
        $(window).trigger('resize');
      });
    }
  };
useridentification.init();
turbolinks.init();
