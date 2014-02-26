function merge_sort(demo_arr)
{
    $("#title").html("Merge Sort");
    do_sort(demo_arr);


    function do_sort(demo_arr) {

        var aux = new Array(demo_arr.length);

        srt(demo_arr, aux, 0, demo_arr.length - 1);


        function srt(arr, aux, lo, hi) {
            if (hi <= lo) {return;}
            var mid = lo + Math.floor((hi - lo) / 2);
            srt(arr, aux, lo, mid);
            srt(arr, aux, mid+1, hi);
            merge(arr, aux, lo, mid, hi);
        }


        function merge(arr, aux, lo, mid, hi) {
            // copy to aux array
            for (var k = lo; k <= hi; k++) {
                aux[k] = arr.at(k);
            }
            var i = lo;
            var j = mid+1;
            for (var k = lo; k <= hi; k++) {
                if (i > mid) arr.set(k, aux[j++]);
                else if (j > hi) arr.set(k, aux[i++]);
                else if (aux[j] <= aux[i]) arr.set(k, aux[j++]);
                else arr.set(k, aux[i++]);
            }
        }
    }
}

