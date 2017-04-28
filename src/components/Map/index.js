import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { includes } from 'lodash';

import { GoogleMap, DirectionsRenderer, Marker } from 'react-google-maps';
import { default as ScriptLoader } from 'react-google-maps/lib/async/ScriptjsLoader';

import GBMarker from './marker';
import Loader from './loader';
import { mapIsLoaded } from '../../actions';

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
    
    this.defaultMapProps = {
      zoom: 16,
      options: {
        minZoom: 15,
        fullscreenControl: false,
        streetViewControl: false,
        scaleControl: true,
        clickableIcons: false,
        scrollwheel: false,
        mapTypeControl: false,
        zoomControlOptions: {
          style: 2
        },
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
    const {mapPosition, itinerary, restaurants, homePosition} = this.props;
    
    this.defaultMapProps = Object.assign(this.defaultMapProps, {center: homePosition.position})

    let markers = restaurants.map((restaurant, key) => {
      const {title, description, address, id} = restaurant;
      const datas = { title, description, address, id };
      datas.isActive = (id === this.props.currentIndex);
      const opts = { key, position: restaurant.position, datas };

      return <GBMarker {...opts} />
    }).filter((restaurant) => {
      if (this.props.type === 'all') { return true; }
      return this.props.type === 'my' && includes(this.props.favs, restaurant.props.datas.id);
    })

    if (window.google) {
      const homeIconSize = 50;
      const homeIcon = {
              url: homePosition.icon,
              scaledSize: new window.google.maps.Size(homeIconSize, homeIconSize)
            };
      markers.push(
        <Marker key={Math.random()} {...homePosition} icon={homeIcon} />
      );
    }

    let extraGMProps = {};
    if (this.map) {
      extraGMProps = (Object.keys(itinerary).length <= 0) ? {zoom: this.map.props.map.zoom} : {};
    }
    const mapHeight = window.innerHeight - document.getElementById('header').offsetHeight;

    this.defaultMapProps = {...this.defaultMapProps, ...{center: homePosition.position}}

    scriptLoaderOptions.loadingElement = <Loader />;
    scriptLoaderOptions.containerElement = (<div style={{ minHeight: `${mapHeight}px` }} />);
    scriptLoaderOptions.googleMapElement = (
      <GoogleMap
          ref={(map) => { 
                this.map = map;
                this.map && map.panTo(mapPosition);
                if (!this.props.isLoaded) {
                  this._mapLoaded();
                }
              }
            }
          center={this.defaultMapProps.center}
          {...extraGMProps}
          defaultOptions={this.defaultMapProps.options}
          onDragStart={this._mapLoaded}
          defaultZoom={this.defaultMapProps.zoom}>
          {markers}
          { Object.keys(itinerary).length > 0 && <DirectionsRenderer defaultOptions={{ suppressMarkers: true }} directions={itinerary} /> }
      </GoogleMap>
    );

    return (
      <ScriptLoader {...scriptLoaderOptions} />
    )
  }

  _mapLoaded() {
    this.props.mapIsLoaded();
  }
}

const mapStateToProps = (state, ownProps) => {
  let {
    restaurant: {currentIndex}, 
    restaurant:{mapPosition}
  } = state;
  const homePosition = state.restaurants.list.home_position || {};

  return {
    currentIndex: currentIndex,
    mapPosition: mapPosition,
    type: state.list.type,
    favs: state.restaurants.favs,
    isLoaded: state.map.isLoaded,
    itinerary: state.itinerary.steps,
    homePosition,
  }
};

const mapDispatchToProps = {
  mapIsLoaded
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Map));
