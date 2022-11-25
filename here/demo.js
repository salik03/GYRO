const bus1 = {};
const bus2 = {};

function calculateRouteFromAtoB(platform) {
  var [lat, long] = window.location.href.split("#")[1].split(":");
  var router = platform.getPublicTransitService();
  console.log(`${lat},${long}`);
  routeRequestParams = {
    origin: "28.6138954,77.2090057",

    destination: `${lat},${long}`,
    return: "polyline,actions,travelSummary",
  };

  router.getRoutes(routeRequestParams, onSuccess, onError);
}
function onError(error) {
  alert("Can't reach the remote server");
}

function onSuccess(result) {
  var route = result.routes[0];
  let duration = 0,
    distance = 0;
  route.sections.forEach((section) => {
    distance += section.travelSummary.length;
    duration += section.travelSummary.duration;
  });
  alert(
    `The duration is ${
      duration / 60
    } minutes   \n and distance is ${distance} Meters`
  );
  /*
   * The styling of the route response on the map is entirely under the developer's control.
   * A representitive styling can be found the full JS + HTML code of this example
   * in the functions below:
   */
  addRouteShapeToMap(route);
  addManueversToMap(route);
  // addManueversToPanel(route);
  // addSummaryToPanel(route);
  // ... etc.
}
function openBubble(position, text) {
  if (!bubble) {
    bubble = new H.ui.InfoBubble(
      position,
      // The FO property holds the province name.
      { content: text }
    );
    ui.addBubble(bubble);
  } else {
    bubble.setPosition(position);
    bubble.setContent(text);
    bubble.open();
  }
}
function rotateDomMarker() {
  var domIconElement = document.createElement("div"),
    interval,
    counter = 0;

  // set the anchor using margin css property depending on the content's (svg element below) size
  // to make sure that the icon's center represents the marker's geo positon
  domIconElement.style.margin = "-20px 0 0 -20px";

  // add content to the element
  domIconElement.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40">
      <path d="m0.812665,23.806608l37.937001,-22.931615l-21.749812,38.749665l1.374988,-17.749847l-17.562177,1.931797z"
        fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#fff"/>
    </svg>`;

  // create dom marker and add it to the map
  marker = map.addObject(
    new H.map.DomMarker(
      { lat: 28.6138954, lng: 77.2090057 },
      {
        icon: new H.map.DomIcon(domIconElement, {
          onAttach: function (clonedElement, domIcon, domMarker) {
            var clonedContent = clonedElement.getElementsByTagName("svg")[0];

            // set last used value for rotation when dom icon is attached (back in map's viewport)
            clonedContent.style.transform = "rotate(" + counter + "deg)";

            // set interval to rotate icon's content by 45 degrees every second.
            interval = setInterval(function () {
              clonedContent.style.transform =
                "rotate(" + (counter += 45) + "deg)";
            }, 1000);
          },
          onDetach: function (clonedElement, domIcon, domMarker) {
            // stop the rotation if dom icon is not in map's viewport
            clearInterval(interval);
          },
        }),
      }
    )
  );
}

/**
 * Boilerplate map initialization code starts below:
 */

// set up containers for the map  + panel
var mapContainer = document.getElementById("map"),
  routeInstructionsContainer = document.getElementById("panel");

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
  apikey: "nCCWHVCLKpcTZ-MW0Ua1rskcf39g3dDu3jMTPYjzRok",
});

var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over Berlin
var map = new H.Map(mapContainer, defaultLayers.vector.normal.map, {
  center: { lat: 28.6138954, lng: 77.2090057 },
  zoom: 15,
  pixelRatio: window.devicePixelRatio && window.devicePixelRatio > 1 ? 2 : 1,
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener("resize", function () {
  map.getViewPort().resize();
});

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

var bubble;

// Now create DOM Marker and rotate it's content
function addRouteShapeToMap(route) {
  var group = new H.map.Group();

  route.sections.forEach(function (section) {
    group.addObject(
      new H.map.Polyline(
        H.geo.LineString.fromFlexiblePolyline(section.polyline),
        {
          style: {
            lineWidth: 4,
            strokeColor: "rgba(0, 128, 255, 0.7)",
          },
        }
      )
    );
  });
  // Add the polyline to the map
  map.addObject(group);
  // And zoom to its bounding rectangle
  map.getViewModel().setLookAtData({
    bounds: group.getBoundingBox(),
  });
}
function addManueversToMap(route) {
  var svgMarkup =
      '<svg width="18" height="18" ' +
      'xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="8" cy="8" r="8" ' +
      'fill="#1b468d" stroke="white" stroke-width="1"  />' +
      "</svg>",
    dotIcon = new H.map.Icon(svgMarkup, { anchor: { x: 8, y: 8 } }),
    group = new H.map.Group(),
    i;

  route.sections.forEach((section) => {
    let poly = H.geo.LineString.fromFlexiblePolyline(
      section.polyline
    ).getLatLngAltArray();

    let actions = section.actions;
    // Add a marker for each maneuver
    if (actions) {
      for (i = 0; i < actions.length; i += 1) {
        let action = actions[i];
        var marker = new H.map.Marker(
          {
            lat: poly[action.offset * 3],
            lng: poly[action.offset * 3 + 1],
          },
          { icon: dotIcon }
        );
        marker.instruction = action.instruction;
        group.addObject(marker);
      }
    }
  });

  group.addEventListener(
    "tap",
    function (evt) {
      map.setCenter(evt.target.getGeometry());
      openBubble(evt.target.getGeometry(), evt.target.instruction);
    },
    false
  );

  // Add the maneuvers group to the map
  map.addObject(group);
}
rotateDomMarker();
function addDomMarkerBus(map) {
  var outerElement = document.createElement("div"),
    innerElement = document.createElement("div");

  outerElement.style.userSelect = "none";
  outerElement.style.webkitUserSelect = "none";
  outerElement.style.msUserSelect = "none";
  outerElement.style.mozUserSelect = "none";
  outerElement.style.cursor = "default";

  innerElement.style.color = "red";
  innerElement.style.backgroundColor = "blue";
  innerElement.style.border = "2px solid black";
  innerElement.style.font = "normal 12px arial";
  innerElement.style.lineHeight = "12px";

  innerElement.style.paddingTop = "2px";
  innerElement.style.paddingLeft = "4px";
  innerElement.style.width = "20px";
  innerElement.style.height = "20px";

  // add negative margin to inner element
  // to move the anchor to center of the div
  innerElement.style.marginTop = "-10px";
  innerElement.style.marginLeft = "-10px";

  outerElement.appendChild(innerElement);

  // Add text to the DOM element
  innerElement.innerHTML = "Bus";

  function changeOpacity(evt) {
    evt.target.style.opacity = 0.6;
  }

  function changeOpacityToOne(evt) {
    evt.target.style.opacity = 1;
  }

  //create dom icon and add/remove opacity listeners
  var domIcon = new H.map.DomIcon(outerElement, {
    // the function is called every time marker enters the viewport
    onAttach: function (clonedElement, domIcon, domMarker) {
      clonedElement.addEventListener("mouseover", changeOpacity);
      clonedElement.addEventListener("mouseout", changeOpacityToOne);
    },
    // the function is called every time marker leaves the viewport
    onDetach: function (clonedElement, domIcon, domMarker) {
      clonedElement.removeEventListener("mouseover", changeOpacity);
      clonedElement.removeEventListener("mouseout", changeOpacityToOne);
    },
  });

  // Marker for Chicago Bears home
  // { lat: 28.6138954, lng: 77.2090057 }
  [
    { lat: 28.6490523, lng: 77.3182836 },
    { lat: 28.6706449, lng: 77.4154736 },
    { lat: 28.6256122, lng: 77.2341966 },
    { lat: 28.64358, lng: 77.2435 },
  ].forEach((coor) => {
    map.addObject(
      new H.map.DomMarker(coor, {
        icon: domIcon,
      })
    );
  });
  var bearsMarker = new H.map.DomMarker(
    { lat: 28.6490523, lng: 77.3182836 },
    {
      icon: domIcon,
    }
  );
  var bearsMarker = new H.map.DomMarker(
    { lat: 28.6706449, lng: 77.4154736 },
    {
      icon: domIcon,
    }
  );
  map.addObject(bearsMarker);
}
function addDomMarkerAuto(map) {
  var outerElement = document.createElement("div"),
    innerElement = document.createElement("div");

  outerElement.style.userSelect = "none";
  outerElement.style.webkitUserSelect = "none";
  outerElement.style.msUserSelect = "none";
  outerElement.style.mozUserSelect = "none";
  outerElement.style.cursor = "default";

  innerElement.style.color = "white";
  innerElement.style.backgroundColor = "black";
  innerElement.style.border = "2px solid black";
  innerElement.style.font = "normal 12px arial";
  innerElement.style.lineHeight = "12px";

  innerElement.style.paddingTop = "2px";
  innerElement.style.paddingLeft = "4px";
  innerElement.style.width = "20px";
  innerElement.style.height = "20px";

  // add negative margin to inner element
  // to move the anchor to center of the div
  innerElement.style.marginTop = "-10px";
  innerElement.style.marginLeft = "-10px";

  outerElement.appendChild(innerElement);

  // Add text to the DOM element
  innerElement.innerHTML = "Auto";

  function changeOpacity(evt) {
    evt.target.style.opacity = 0.6;
  }

  function changeOpacityToOne(evt) {
    evt.target.style.opacity = 1;
  }

  //create dom icon and add/remove opacity listeners
  var domIcon = new H.map.DomIcon(outerElement, {
    // the function is called every time marker enters the viewport
    onAttach: function (clonedElement, domIcon, domMarker) {
      clonedElement.addEventListener("mouseover", changeOpacity);
      clonedElement.addEventListener("mouseout", changeOpacityToOne);
    },
    // the function is called every time marker leaves the viewport
    onDetach: function (clonedElement, domIcon, domMarker) {
      clonedElement.removeEventListener("mouseover", changeOpacity);
      clonedElement.removeEventListener("mouseout", changeOpacityToOne);
    },
  });

  // Marker for Chicago Bears home
  // 77.2341966
  [
    { lat: 28.595374292349952, lng: 77.23045349121095 },
    { lat: 28.591756892502065, lng: 77.2119140625 },
    { lat: 28.60140301544218, lng: 77.18994140625 },
    { lat: 28.628527988682244, lng: 77.17140197753906 },
  ].forEach((coor) => {
    map.addObject(
      new H.map.DomMarker(coor, {
        icon: domIcon,
      })
    );
  });
  var bearsMarker = new H.map.DomMarker(
    { lat: 28.6490523, lng: 77.3182836 },
    {
      icon: domIcon,
    }
  );
  var bearsMarker = new H.map.DomMarker(
    { lat: 28.6706449, lng: 77.4154736 },
    {
      icon: domIcon,
    }
  );
  map.addObject(bearsMarker);
}
function addMarkersToMap(map) {
  var parisMarker = new H.map.Marker({ lat: 48.8567, lng: 2.3508 });
  map.addObject(parisMarker);

  var romeMarker = new H.map.Marker({ lat: 41.9, lng: 12.5 });
  map.addObject(romeMarker);

  var berlinMarker = new H.map.Marker({ lat: 52.5166, lng: 13.3833 });
  map.addObject(berlinMarker);

  var madridMarker = new H.map.Marker({ lat: 40.4, lng: -3.6833 });
  map.addObject(madridMarker);

  var londonMarker = new H.map.Marker({ lat: 51.5008, lng: -0.1224 });
  map.addObject(londonMarker);
}
window.onload = function () {
  addDomMarkerBus(map);
  addDomMarkerAuto(map);

  // addMarkersToMap(map);
};
calculateRouteFromAtoB(platform);

// addPolylineToMap(map);
// function addPolylineToMap(map) {
//   var lineString = new H.geo.LineString();

//   lineString.pushPoint({ lat: 48.8567, lng: 2.3508 });
//   lineString.pushPoint({ lat: 52.5166, lng: 13.3833 });

//   map.addObject(new H.map.Polyline(lineString, { style: { lineWidth: 4 } }));
// }
