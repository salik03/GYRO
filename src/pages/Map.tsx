// @ts-nocheck
import React from "react";
import { APIKEY } from "../data";
function calculateRouteFromAtoB(platform) {
  var router = platform.getRoutingService(null, 8),
    routeRequestParams = {
      routingMode: "fast",
      transportMode: "car",
      origin: "52.5160,13.3779", // Brandenburg Gate
      destination: "52.5206,13.3862", // Friedrichstraße Railway Station
      return: "polyline,turnByTurnActions,actions,instructions,travelSummary",
    };

  router.calculateRoute(routeRequestParams, onSuccess, onError);
}
function onSuccess(result) {
  var route = result.routes[0];

  /*
   * The styling of the route response on the map is entirely under the developer's control.
   * A representative styling can be found the full JS + HTML code of this example
   * in the functions below:
   */
  //   addRouteShapeToMap(route);
  //   addManueversToMap(route);
  addWaypointsToPanel(route);
  //   addManueversToPanel(route);
  //   addSummaryToPanel(route);
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
function addRouteShapeToMap(route) {
  route.sections.forEach((section) => {
    // decode LineString from the flexible polyline
    let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

    // Create a polyline to display the route:
    let polyline = new H.map.Polyline(linestring, {
      style: {
        lineWidth: 4,
        strokeColor: "rgba(0, 128, 255, 0.7)",
      },
    });

    // Add the polyline to the map
    map.addObject(polyline);
    // And zoom to its bounding rectangle
    map.getViewModel().setLookAtData({
      bounds: polyline.getBoundingBox(),
    });
  });
}
function addManueversToMap(route) {
  var svgMarkup =
      '<svg width="18" height="18" ' +
      'xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="8" cy="8" r="8" ' +
      'fill="#1b468d" stroke="white" stroke-width="1" />' +
      "</svg>",
    dotIcon = new H.map.Icon(svgMarkup, { anchor: { x: 8, y: 8 } }),
    group = new H.map.Group(),
    i,
    j;

  route.sections.forEach((section) => {
    let poly = H.geo.LineString.fromFlexiblePolyline(
      section.polyline
    ).getLatLngAltArray();

    let actions = section.actions;
    // Add a marker for each maneuver
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
  });
}
function addWaypointsToPanel(route) {
  var nodeH3 = document.createElement("h3"),
    labels = [];

  route.sections.forEach((section) => {
    labels.push(section.turnByTurnActions[0].nextRoad.name[0].value);
    labels.push(
      section.turnByTurnActions[section.turnByTurnActions.length - 1]
        .currentRoad.name[0].value
    );
  });

  nodeH3.textContent = labels.join(" - ");
  routeInstructionsContainer.innerHTML = "";
  routeInstructionsContainer.appendChild(nodeH3);
}
function addSummaryToPanel(route) {
  let duration = 0,
    distance = 0;

  route.sections.forEach((section) => {
    distance += section.travelSummary.length;
    duration += section.travelSummary.duration;
  });

  var summaryDiv = document.createElement("div"),
    content =
      "<b>Total distance</b>: " +
      distance +
      "m. <br />" +
      "<b>Travel Time</b>: " +
      toMMSS(duration) +
      " (in current traffic)";

  summaryDiv.style.fontSize = "small";
  summaryDiv.style.marginLeft = "5%";
  summaryDiv.style.marginRight = "5%";
  summaryDiv.innerHTML = content;
  routeInstructionsContainer.appendChild(summaryDiv);
}
function addManueversToPanel(route) {
  var nodeOL = document.createElement("ol");

  nodeOL.style.fontSize = "small";
  nodeOL.style.marginLeft = "5%";
  nodeOL.style.marginRight = "5%";
  nodeOL.className = "directions";

  route.sections.forEach((section) => {
    section.actions.forEach((action, idx) => {
      var li = document.createElement("li"),
        spanArrow = document.createElement("span"),
        spanInstruction = document.createElement("span");

      spanArrow.className = "arrow " + (action.direction || "") + action.action;
      spanInstruction.innerHTML = section.actions[idx].instruction;
      li.appendChild(spanArrow);
      li.appendChild(spanInstruction);

      nodeOL.appendChild(li);
    });
  });

  routeInstructionsContainer.appendChild(nodeOL);
}
function toMMSS(duration) {
  return (
    Math.floor(duration / 60) + " minutes " + (duration % 60) + " seconds."
  );
}
function onError(error) {
  alert("Can't reach the remote server");
}
export default class DisplayMapClass extends React.Component {
  mapRef = React.createRef();
  state = {
    map: null,
  };

  componentDidMount() {
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: APIKEY,
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: 52.516, lng: 13.3779 },
        zoom: 13,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );
    // var berlinMarker = new H.map.Marker({
    //   lat: 52.5192,
    //   lng: 13.4061,
    // });
    // map.addObject(berlinMarker);
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    // This variable is unused and is present for explanatory purposes
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(map, defaultLayers);
    let bubble;
    // calculateRouteFromAtoB(platform);
    this.setState({ map });
  }

  componentWillUnmount() {
    if (this.state.map) {
      this.state.map.dispose();
    }
  }

  render() {
    return (
      <div
        ref={this.mapRef}
        style={{
          marginInline: "auto",

          height: "50vh",
          width: "100%",
        }}
        className=""
      />
    );
  }
}
