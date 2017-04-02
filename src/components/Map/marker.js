import React, { Component, PropTypes } from 'react';

import { Marker } from 'react-google-maps';

import marker from '../../images/marker-google-bouffe.png'

class GBMarker extends Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Action on click map
   * @return {[type]} [description]
   */
  handleClick() {
    const id = this.props.datas.id;
    console.log(this.props.datas.title);
    document.getElementById(id).scrollIntoView();
  }

  render() {
    const markerSize = 50;
    const markerIcon = { url: marker, scaledSize: new window.google.maps.Size(markerSize, markerSize) };
    // console.log('marker', window.google);
    return (
      <Marker {...this.props} 
        icon={markerIcon}
        onClick={this.handleClick}>
      </Marker>
    );
  }
}

export default GBMarker;
