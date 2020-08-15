import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
 
class Map extends Component {
 
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 15.335,
      longitude: 76.46,
      zoom: 7
    }
  };
 
  render() {
    return (
      < ReactMapGL
            {...this.state.viewport}
            mapStyle="mapbox://styles/cvvkshcv/ckdvb4do61z4i19pgebuoybtv"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={(viewport) => this.setState({viewport})}
        >
            <Marker latitude={15.335} longitude={76.46} offsetLeft={-20} offsetTop={-10}>
                <div>You are here</div>
            </Marker>
        </ReactMapGL>
    );
  }
}

export default Map;