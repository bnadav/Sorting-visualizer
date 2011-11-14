Presentor = {

  queue: new Array(),

  run: function() {
    var cmd;
    if(Presentor.queue.length > 0) {
      cmd = Presentor.queue.shift();
      cmd.call(cmd);
      setTimeout(Presentor.run, 500);
    }
  },

  set: function(index, value) {
         this.queue.push(function() {
         var id = "_" + index;
         var elem = $("#" + id);
         if (value === null) value = "--"; // Null is no displayed
         if(elem.length > 0) {  // Element with the given id found - update it's text
           elem.text(value);
         } else {  // Create the element
           jQuery('<div/>', {
             id: id,
             text: value
           }).addClass("element").appendTo('#demo');
         }
         });
       },

  fetched: function(index, value) {
       this.queue.push(function() {
         var position = $("#_" + index).position();
         jQuery("<div/>", {
           id: "_fetched",
           text: value + ""
         }).addClass("element fetched")
         .css({top: position.top, left: position.left})
         .animate({top: '-=70'})
         //.css({top: position.top - 70, left: position.left})
         .appendTo('body');
       });
  },

  unfetched: function(to_index) {
       this.queue.push(function() {
         $("#_fetched").remove();
       });
  },

  before_compare: function (index_a, index_b) {
       this.queue.push(function() {
         var id_a = index_a < 0  ? "fetched" : index_a;
         var id_b = index_b < 0  ? "fetched" : index_b;
         $("#_" + id_a + ",#_" + id_b).addClass("compared");
         // $("#_" + id_a + ", #_" + id_b).delay(800).fadeTo(1000, 0.5).fadeTo(1000,1);
       });
  },

  compared: function(index_of_larger) {
       this.queue.push(function() {
         var id = index_of_larger == -1 ? "_fetched" : "_" + index_of_larger;
         //$("#" + id).fadeTo(400, 0.2).fadeTo(400, 1);
         $(".compared").removeClass("compared");
       });
  },

  moved: function(from, to, from_value, to_value) {
       this.queue.push(function() {
         var from_id = (from == -1 ? "_fetched" : "_" + from);
         var to_id = (to == -1 ? "_fetched" : "_" + to);
         from_value = from_value == null ? "--" : from_value;
         to_value = to_value == null ? "--" : to_value;
         $("#" + from_id).text(from_value);
         $("#" + to_id).text(to_value);
       });
    }
}
