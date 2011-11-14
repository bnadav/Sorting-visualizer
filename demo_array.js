function DemoArray(size, presentor)
{
  this.array = new Array(size);
  this.length = size;
  this.fetched = null;
  this.fetched_index = null;
  presentor = presentor || {};
  var default_presentor = {
      set: function(index, value){},
      fetched: function(from_index, value){},
      unfetched: function(to_index) {},
      before_compare: function(index_a, index_b){},
      compared: function(index){},
      moved: function(from, to, from_value, to_value) {}
    };
  this.presentor = jQuery.extend(default_presentor, presentor);
};

DemoArray.prototype = {
  randomize: function(max_value) {
    for(var j=0; j< this.array.length; j++) {
      this.array[j] = Math.floor(Math.random()*(max_value + 1));
      this.presentor.set(j, this.array[j]);
    }
  },

  fetch: function(index, replacement) {
     if(this.fetched) {
      throw "There is already a fetched element"
     }
     var replacement_value = (arguments.length == 2 ? replacement : null);
     // insert replacement value in index
     this.fetched =  this.array.splice(index, 1, replacement_value)[0];
     this.fetched_index = index;
     this.presentor.fetched(index, this.fetched);
     this.presentor.set(index, this.array[index]);
     return(this.fetched);
  },

  at: function(index) {
    return (this.array[index]);
  },

  move: function(from, to) {
     var previous_to = this.array[to];
     // If from is -1, use fetched value
     this.array[to] = from >=0 ? this.array[from] : this.fetched;
     this.array[from] = null;
     this.presentor.moved(from, to, this.array[from], this.array[to]);
     return (previous_to);
  },

  unfetch: function(to) {
    if(this.fetched == null) {
      throw "No fetched element, can not unfetch"
    }
    var previous_to = this.move(-1, to);
    this.fetched = this.fetched_index = null; // reset
    this.presentor.unfetched(to);
    return(previous_to);
  },

  compare: function(a, b) {
    var val_a = this.array[a];
    //var val_b = (b instanceof Object ? b.val: this.array[b]);
    var val_b = (b == -1 ? this.fetched : this.array[b]);
    this.presentor.before_compare(a, b);
    var index_of_larger;
    if(val_a < val_b)
      index_of_larger = b;
    if(val_a == val_b)
      index_of_larger = null;
    if(val_a > val_b)
      index_of_larger = a;
    this.presentor.compared(index_of_larger);
    return(index_of_larger);
  }

}
