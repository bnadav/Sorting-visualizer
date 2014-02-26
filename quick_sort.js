function quick_sort(demo_arr)
{
    $("#title").html("Quick Sort");
    do_sort(demo_arr);

    function do_sort(demo_arr)
    {
        sort(demo_arr, 0, demo_arr.length-1);
    }

    function sort(arr, lo, hi) {
        if (hi <= lo) return;
        var j = partition(arr, lo, hi);
        sort(arr, lo, j-1);
        sort(arr, j+1, hi);
    }

    function partition(arr, lo, hi) {
        var i = lo;
        var j = hi+1;
        while (true) {
            //while (arr.compare(++i, lo) == lo)
            while (arr.at(++i) < arr.at(lo))
                if (i == hi) break;
            //while (arr.compare(--j, lo) == j)
            while (arr.at(lo) < arr.at(--j))
                if (j == lo) break;
            if (i >= j) break;
            arr.swap(i, j);
        }
        arr.swap(lo, j);
        return j;
    }

}
