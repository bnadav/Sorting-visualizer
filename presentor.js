function Presentor(line) {
  this.line = line;
  this.wrapper = jQuery("<div>",{id: "wrapper_" + line, class: "wrapper"}).appendTo("#demo");
  this.queue = new Array();
}

Presentor.prototype = {

  EMPTY_SIGN: "--",

  run: function() {
    var cmd;
    var _this = this;
    if(this.queue.length > 0) {
      cmd = this.queue.shift();
      cmd.call(this);
      setTimeout(function(){_this.run()}, 100);
    }
  },

  set: function(index, value) {
         this.queue.push(function() {
         var id = "_" + this.line + "_" + index;
         var elem = $("#" + id);
         if (value === null) value = this.EMPTY_SIGN; // Null is no displayed
         if(elem.length > 0) {  // Element with the given id found - update it's text
           elem.css({'height': value});
           //elem.text(value);
         } else {  // Create the element
           jQuery('<div/>', {
             id: id,
             height: value,
             //text: value
           }).addClass("element").appendTo(this.wrapper);
         }
         });
       },

  fetched: function(index, value) {
       this.queue.push(function() {
         var position = $("#_" + this.line + "_" + index).position();
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
         var element_a = this.Util.element(this.line, index_a);
         var element_b = this.Util.element(this.line, index_b);
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
         var from_elem = this.Util.element(this.line, from);
         var to_elem = this.Util.element(this.line, to);

         from_value = (from_value == null ? this.EMPTY_SIGN : from_value);
         to_value = (to_value == null ? this.EMPTY_SIGN : to_value);

         from_elem.text(from_value);
         to_elem.text(to_value);
       });
    },

  // Utility
  Util: {
    element: function(line, index) {
        return(index < 0 ? $("#_fetched") : $("#_" + line + "_" + index));
    }
  }

}
