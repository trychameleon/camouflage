var notes = {
  notes: [],
  noteTemplate: '<div class="note col-lg-4"><div class="panel panel-default"><div class="panel-heading">Default Panel<button type="button" class="close" data-dismiss="modal" onclick="notes.deleteNote(this)" aria-hidden="true">×</button></div><div class="panel-body"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.</p> </div> <div class="panel-footer">Panel Footer </div></div></div>',
  rowTemplate: '<div class="row"></div>',
  addNote: function(){
    if(($(".note").length % 3) == 0){
      $(".notes").append(this.rowTemplate);
    }
    $("#page-wrapper .row:last-child").append(this.noteTemplate);
  },
  deleteNote: function(target){
    $(target).parents(".note")[0].remove();
    if(($(".note").length % 3) == 0){
      $(".notes .row:last-child").remove();
    }
  }
};

