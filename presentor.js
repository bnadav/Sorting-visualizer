Presentor = {

  EMPTY_SIGN: "--",

  queue: new Array(),

  run: function() {
    var cmd;
    if(Presentor.queue.length > 0) {
      cmd = Presentor.queue.shift();
      cmd.call(this);
      setTimeout(Presentor.run, 500);
    }
  },

  set: function(index, value) {
         this.queue.push(function() {
         var id = "_" + index;
         var elem = $("#" + id);
         if (value === null) value = Presentor.EMPTY_SIGN; // Null is no displayed
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
         var element_a =  Presentor.Util.element(index_a);
         var element_b =  Presentor.Util.element(index_b);
         element_a.add(element_b).addClass("compared");
       });
  },

  compared: function(index_of_larger) {
       this.queue.push(function() {
         $(".compared").removeClass("compared");
       });
  },

  moved: function(from, to, from_value, to_value) {
       this.queue.push(function() {
         var from_elem = Presentor.Util.element(from);
         var to_elem = Presentor.Util.element(to);

         from_value = (from_value == null ? Presentor.EMPTY_SIGN : from_value);
         to_value = (to_value == null ? Presentor.EMPTY_SIGN : to_value);

         from_elem.text(from_value);
         to_elem.text(to_value);
       });
    },

  // Utility
  Util: {
    element: function(index) {
        return(index < 0 ? $("#_fetched") : $("#_" + index));
    }
  }

}
