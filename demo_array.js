function DemoArray(size, presentor)
{
  this.array = new Array(size);
  this.length = size;
  this.presentor = presentor;
  if(!this.presentor) {
    this.presentor = {
      set: function(index, value){},
      fetched: function(index, value){}
    };
  }
};

DemoArray.prototype = {
  randomize: function(max_value) {
    for(var j=0; j< this.array.length; j++) {
      this.array[j] = Math.floor(Math.random()*(max_value + 1));
      this.presentor.set(j, this.array[j]);
    }
  },

  fetch: function(index, replacement) {
     var replacement_value = (arguments.length == 2 ? replacement : null);
     // insert replacement value in index
     var fetched_value =  this.array.splice(index, 1, replacement_value);
     this.presentor.fetched(index, fetched_value);
     this.presentor.set(index, this.array[index]);
     return(fetched_value);
  },

  at: function(index) {
    return (this.array[index]);
  },

  move: function(from, to) {
     var previous_to = this.array[to];
     this.array[to] = this.array[from];
     this.array[from] = null;
     return (previous_to);
  },

  compare: function(a, b) {
    var val_a = this.array[a];
    var val_b = (b instanceof Object ? b.val: this.array[b]);
    console.log("++ " + val_a + " " + val_b);
    if(val_a < val_b)
      return(1);
    if(val_a == val_b)
      return(0);
    if(val_a > val_b)
      return(-1);
  }

}
