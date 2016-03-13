function heap_sort(demo_arr) {

  $("#title").html("Heap Sort");
  do_sort(demo_arr);

  function do_sort(demo_arr) {
    var length = demo_arr.length;
    heapify(length);
    sortdown(length);
  }

  function heapify(length) {
    for(var index=Math.floor(length/2); index >= 0; index--) {
      sink(index, length) 
    }
  }

  function sortdown(length) {
    while(length > 0) {
      demo_arr.swap(0, --length);
      sink(0, length);
    }
  }

  function sink(index, length) {
    var c_index = index*2+1;
    if(c_index >= length) { return };
    if((c_index+1 < length) && (demo_arr.at(c_index) < demo_arr.at(c_index+1))) {
      c_index = c_index+1;
    }
    if(demo_arr.at(index) < demo_arr.at(c_index)) {
      demo_arr.swap(c_index, index);
      sink(c_index, length);
    }
  }
}
