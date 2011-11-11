function DemoArray(size)
{
  this.array = new Array(size);
};

DemoArray.prototype = {
  randomize: function(max_value) {
    $.each(this.array, function(index) {
      this.array[index] = javascript random()*max_value;
    })
  }

  fetch: function(index, replacement) {
     var value = (arguments.length == 2 ? replacement : null);
     return this.array.splice(index, 1, value);
  }

  []: function(index) {
    return this.array[index];
  }
}
