Sorting-visualizer
==================

This is a tiny javascript kind of framework made out of boredom.
It's purpose is to visualize the way sorting algorithms work.

The project is built from these files:

  * _demo_array.js_ - An array wrapper, which expose a small api.
    It's constructor gets the array size, and a Presenter object.

  * _presentor.js_ - Presentation manager object. The object
    implements callbacks,being called by DemoArray at certain
    points.
    The Presenter object does not run the callbacks immediately, but
    rather pushes them to a queue, and executes them only when the
    run() function is being invoked. This is so, in order to be able to
    use timeouts.

  * _insertion_sort.js_ - An implementation of the insertion sort
    algorithm, using DemoArray as it's data structure wrapper.
    This is currently the only algorithm, being visualized.
    More will be added.

  * _demo.html_ - The hml page that runs the js program.

  * _demo_array.css_ - some extra simple css.

  * _jqery.js_

This is the first version, and by no means complete, but it works :-)

