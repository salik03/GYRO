// @ts-nocheck
import React from "react";
import { APIKEY } from "../data";

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
        center,
        zoom: 4,
        pixelRatio: 4,
      }
    );

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    // This variable is unused and is present for explanatory purposes
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(map, defaultLayers);

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
