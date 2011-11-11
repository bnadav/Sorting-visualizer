Presentor = {
  set: function(index, value) {
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
       },

  fetched: function(index, value) {
     var position = $("#_" + index).position();
     var id = "fetched_" + index;
     jQuery("<div/>", {
       id: id,
       text: value + ""
     }).addClass("element fetched")
     .css({top: position.top - 70, left: position.left})
     .appendTo('body');
  }
}
