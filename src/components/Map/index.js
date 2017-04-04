import React, { Component } from 'react';
import { connect } from 'react-redux';


import { GoogleMap, Polygon } from 'react-google-maps';
import { default as ScriptLoader } from 'react-google-maps/lib/async/ScriptjsLoader';

import GBMarker from './marker';
import restaurants from '../../constants/restaurants';
import texts from '../../constants/texts';

let scriptLoaderOptions = {
  hostname: 'maps.googleapis.com',
  pathname: '/maps/api/js',
  query: { 
    v: 3.0, libraries: 'geometry,places', 
    key:'AIzaSyAT2woXaVUit32ya7B4vyWRyZXAoYhZX4s' 
  }
};

class Map extends Component {
  constructor(props) {
    super(props);
    
    this.defaultCenter = {lat: 48.857511, lng: 2.373364};
    this.defaultMapProps = {
      center: {lat: 48.857511, lng: 2.373364},
      zoom: 16,
      options: {
        minZoom: 15,
        fullscreenControl: false,
        streetViewControl: false,
        scaleControl: true,
        clickableIcons: false,
        mapTypeControl: false,

        // zoomControlOptions: {
        //   style: window.google.maps.ZoomControlStyle.LARGE
        // },
        styles: [{
          featureType: 'all',
          stylers: [
            { saturation: -80 }
          ]
        }, {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [
            { hue: '#ff0000' },
            { saturation: 50 }
          ]
        }, {
          featureType: 'poi.business',
          elementType: 'labels',
          stylers: [
            { visibility: 'off' }
          ]
        }]
      }
    }

  }

  render() {
    const digitasPolygon = <Polygon options={{
            paths: [{lat: 48.858347, lng: 2.372747}, {lat: 48.858516, lng: 2.373284},
            {lat: 48.857719, lng: 2.373949}, {lat: 48.857468, lng: 2.373364}],
            strokeColor: '#FFFFFF',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#FF0000',
            fillOpacity: 0.35
          }} />
    const {mapPosition} = this.props;

    this.defaultMapProps = Object.assign(this.defaultMapProps, {center: mapPosition});

    const markers = restaurants.map((restaurant, key) => {
      const {title, description, address, id} = restaurant;
      const datas = { title, description, address, id };
      const opts = { key, position: restaurant.position, datas };

      return <GBMarker {...opts} />
    }).filter((restaurant) => {
      if (this.props.type === 'all') { return true; }
      return this.props.type === 'my' && this.props.favs.includes(restaurant.props.datas.id);
    });

    scriptLoaderOptions.loadingElement = <p>{texts.loading}</p>;
    // scriptLoaderOptions.loadingElement = <Loader loaded={false} lines={10} length={10} width={4} />;
    scriptLoaderOptions.containerElement = <div {...this.props} style={{ height: '680px' }} />;
    scriptLoaderOptions.googleMapElement =
      <GoogleMap 
          ref={(map) => { this.map = map; }}
   
          center={this.defaultMapProps.center}
          defaultOptions={this.defaultMapProps.options}
          defaultZoom={this.defaultMapProps.zoom}>
          {digitasPolygon}
          {markers}
      </GoogleMap>
    ;

    return (
     <ScriptLoader {...scriptLoaderOptions} />
    );
  }
}

const mapStateToProps = state => ({
  currentIndex: state.restaurant.currentIndex,
  mapPosition: state.restaurant.mapPosition,
  type: state.list.type,
  favs: state.restaurant.favs,
});

export default connect(mapStateToProps)(Map);

