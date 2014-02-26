function insertion_sort(demo_arr)
{
    $("#title").html("Insertion Sort");
    do_sort(demo_arr);


    function do_sort(demo_arr)
    {
        for(var i=1; i < demo_arr.length; i++) {
            for(var j = i-1; demo_arr.at(j+1) < demo_arr.at(j); j--) {
            //for(var j = i-1; demo_arr.compare(j+1, j) == j; j--) {
                demo_arr.swap(j+1, j);
            }
        }
    }
}
