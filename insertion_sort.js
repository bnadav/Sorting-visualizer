function insertion_sort(demo_arr)
{
  var j;
  var fetched;
  do_sort(demo_arr, j, fetched);
}

function do_sort(demo_arr, j, fetched)
{
  for(var i=1; i < demo_arr.length; i++) {
    fetched = demo_arr.fetch(i);
    j = i-1;
    while(j >=0 && (demo_arr.compare(j, -1) == j)) {
      demo_arr.move(j, j+1);
      j--;
    }
    demo_arr.unfetch(j+1);
  }
}
