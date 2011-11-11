Presentor = {
  set: function(index, value) {
         jQuery('<div/>', {
           id: "_" + index,
           text: value
         }).addClass("element").appendTo('#demo');
       }
}
