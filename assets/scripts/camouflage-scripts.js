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
      var formData = getFormData($('#identification'));
      formData.loggedin = loggedin;
      localStorage.setItem(this.localStorageName,  JSON.stringify(formData));
    },
    populate: function(localstorageobject){
      var data = localstorageobject, userdata = {}, groupdata = {}, groupuid;

      data.segmentgroup = data.segmentgroup || 'disabled';
      for(var index in data) {
        if (data.hasOwnProperty(index)) {
          var stored = data[index];
          stored == 'on' && !!$('[name=' + index + ']').prop('checked', true) && (data[index] = true);
          $('[name=' + index + ']').is('[type=radio]') ? $('[name=' + index + ']').filter('[value='+stored+']').prop('checked', true) : $('[name=' + index + ']').val(stored);
          $('.' + index + '-text').text(stored);
          if(/group\_/.test(index)){
            groupdata[index.replace('group_','')] = stored;
          } else if(/user\_/.test(index)){
            userdata[index.replace('user_','')] = stored;
          }
        }
      }
      userdata.disabled = userdata.disabled || false;
      groupdata.important = groupdata.important || false;
      groupuid = groupdata.name + '-' + groupdata.randomnumber;

      if(userdata.name && userdata.name.length && userdata.randomnumber && userdata.randomnumber.length) {
        if(groupdata.name && groupdata.plan && groupdata.randomnumber && groupdata.created) {
          if(data.segmentgroup == 'enabled') {
            window.analytics && window.analytics.group(groupuid, groupdata);
          } else {
            groupdata.uid = groupuid;
            userdata.company = groupdata;
          }
        }
        this.identify(userdata.name + '-' + userdata.randomnumber, userdata);
      }
    },
    identify: function(identity, userdata) {
      userdata = $.extend({ uid: identity }, userdata);
      window.chmln && chmln.identify(userdata);
      window.analytics && analytics.identify(identity, userdata);

      if(window.location.hash == ""){
        window.location.hash = identity;
      }
    },
    generateRandomNumber: function(name){
      $('[name=' + name + 'randomnumber]').val(Math.floor(Math.random() * 10000));
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
