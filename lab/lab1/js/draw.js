/* =====================
Lab 1: Leaflet Draw

Task 1: Try to draw something on the map

Try to use one or two of the drawing tools. They should allow you to draw
without needing any additional configuration. These shapes will not be added to
the map. We'll fix that in the next task.*/

// Check out the turf function
var polygon = turf.circle([40.000, -85.1639], 2, {steps: 10, units: 'kilometers'});
var point = turf.point([-75.3221, 39.529]);
var triangle = turf.polygon([[
  [-75.1221, 39.57],
  [-75.58, 39.18],
  [-75.97, 39.86],
  [-75.1221, 39.57]
]], {
  "a": 11,
  "b": 122,
  "c": 44
});

// FeatureGroup is to store editable layers
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var drawControl = new L.Control.Draw({
         edit: {
             featureGroup: drawnItems
         }
     });
map.addControl(drawControl);


/* Task 2: Add rectangles to map

Add the rectangle layers to the map when they are drawn. Hint: you can use the
addLayer function that we have used in the past. */
var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};
L.geoJSON(triangle,  {style: myStyle}).addTo(map);
L.geoJSON(point,{style: myStyle}).addTo(map);

//map.on(L.Draw.Event.CREATED, function(e){var layer = e.layer; map.addLayer(layer)})


/* Task 3: Limit to one rectangle

For our application, we only want one rectangle to be displayed on the map at
any given time. When a user draws a new rectangle, the old rectangle should be
removed from the map. To remove a previously drawn rectangle, we will need to
store some information about it in a global variable. Use the variable
myRectangle, which is already defined in this document, to store the new Leaflet
layer before adding it to the map.

You will also need to remove the previous layer from the map.

If you get the error: "Cannot read property '_leaflet_id' of undefined", it
may be because you are trying to remove a layer that does not yet exist.
Check to see if myRectangle is defined before trying to remove it. */

/* var layer = [0,0];
map.on(L.Draw.Event.CREATED, function(e){
    map.removeLayer(layer)
    var newlayer = e.layer;
    layer = e.layer;
    map.addLayer(newlayer)}) */

//myrectangle.push(layer)
/* Task 4: Add shape to sidebar

Let's add the shape we've created to the sidebar. In the HTML, there is a
container with ID #shapes. Use jQuery's `append` or `appendTo` function
to add a new div inside the #shapes container. The HTML should look somewhat
like the following:

HINT 1: Templating is probably the best way to build HTML elements. Great news:
javascript (finally) has a fantastic templating system. (If the docs don't
help, bug your professor for an example!)
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

Hint 2: jQuery can help! Once you've built some HTML, jQuery can parse it. At
that point, you should be able to modify it and use it like any other element
jQuery has selected.
https://api.jquery.com/jquery.parsehtml/

Hint 3: We've never seen this "data-leaflet-id" thing. It's just an attribute like
we've used before (think back to checkboxes, which required jQuery's 'attr'
method https://api.jquery.com/attr/). As it turns out, we can stash data on HTML
elements by creating as many attributes as we need!
This is valid HTML: <div my-made-up-attribute='information-stored-in-string'></div>
And it allows us to retrieve "information-stored-in-string" by querying
"my-made-up-attribute"

<div class="shape" data-leaflet-id="[the id]"><h1>Current ID: [the id]</h1></div>

Where [the id] is replaced by the Leaflet ID of the layer.

When a new layer is added, you can use jQuery's empty function to clear
out the #shapes container before appending a new .shape.

jhtml = $.parseHTML('<div ')
$('#shapes').append(jhtml)*/

/* var layer = [0,0];
var obj
map.on(L.Draw.Event.CREATED, function(e){
    map.removeLayer(layer)
    var newlayer = e.layer;
    obj = e;
    layer = e.layer;
    var id = L.stamp(layer);
    var jhtml=$.parseHTML(`<div data-leaflet-id=${id}><h1>Current ID: ${id}</h1></div>`);
    $('#shapes').empty();
    $('#shapes').append(jhtml);
    map.addLayer(newlayer)}) */


/* Task 5: Store multiple shapes

Instead of showing one shape at a time, let's allow multiple shapes to be drawn.
Instead of storing one Leaflet layer in the myRectangle variable, we should use
an array to store multiple layers. There will also be multiple shapes displayed
in the sidebar.

Change the variable myRectangle to myRectangles and set it to equal an empty
array. Change the rest of your code to push new layers into the array.*/


/* 
var layers = [];

map.on(L.Draw.Event.CREATED, function(e){
    var newlayer = e.layer;
    layers.push({"shape": newlayer});
    var id = L.stamp(newlayer);
    var jhtml=$.parseHTML(`<div data-leaflet-id=${id}><h1>Current ID: ${id}</h1></div>`);
    $('#shapes').empty();
    $('#shapes').append(jhtml);
    map.addLayer(newlayer)}) 

*/



/* Task 6: Connect sidebar and map

The HTML in the sidebar and the Leaflet layers on the map and in our Javascript
variable can be linked by using the Leaflet ID. Modify the application so that
clicking on a shape in the sidebar will do one of the following:

- Change the color of the corresponding shape on the map
- Delete the corresponding shape on the map (be sure to remove it from the
sidebar and the myRectanges array)
- Anything else you can think of! */

// This section will be combined with section 7




/* Task 7 (Stretch Goal): Reverse Task 6

Modify the application so moving your mouse over a rectangle on the map will
highlight (change style in some way) the corresponding element in the sidebar.
Moving your mouse outside of the circle should remove the highlighting.

===================== */

// Global Variables
var myRectangle;

// Initialize Leaflet Draw
var drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: false,
    circle: false,
    marker: false,
    circlemarker: false,
    rectangle: true
  }
});

map.addControl(drawControl);

// Event which is run every time Leaflet draw creates a new layer
map.on('draw:created', function (e) {
    var type = e.layerType; // The type of shape
    var layer = e.layer; // The Leaflet layer for the shape
    var id = L.stamp(layer); // The unique Leaflet ID for the layer
});


var layers = [];

map.on(L.Draw.Event.CREATED, function(e){
    var newlayer = e.layer;
    var id = L.stamp(newlayer);
    layers.push({"shape": newlayer,
                 "id":id});
    var jhtml=$.parseHTML(`<div data-leaflet-id=${id}><h1>Current ID: ${id}</h1></div>`);
    $('#shapes').append(jhtml);
    _.map(layers, function(arr){
        map.addLayer(arr.shape);
        arr.shape.on("mouseover", function(e) {
            $(`[data-leaflet-id=${e.target._leaflet_id}]`).css("background-color", "red");
        });
        arr.shape.on("mouseout", function(e) {
            $(`[data-leaflet-id=${e.target._leaflet_id}]`).css("background-color", "transparent");
        });
    })

    _.map(layers, function(layer){
      $(`[data-leaflet-id=${layer['id']}]`).click(function(e) {
        console.log(e);
        map.removeLayer(layer.shape);
        $(`[data-leaflet-id=${layer['id']}]`).remove();
        delete layer;
    });
  })
  });




