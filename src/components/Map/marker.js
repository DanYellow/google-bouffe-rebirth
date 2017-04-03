import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Marker } from 'react-google-maps';

import { selectedRestaurant } from '../../actions';
import marker from '../../images/marker-google-bouffe.png';
import activeMarker from '../../images/marker-google-bouffe-active.png';

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

    this.props.selectedRestaurant(id);
    document.getElementById(id).scrollIntoView();
  }

  render() {
    let { datas, currentIndex} = this.props;
    const markerSize = 50;

    const markerIcon = { url: (datas.id === currentIndex) ? activeMarker : marker,
                         scaledSize: new window.google.maps.Size(markerSize, markerSize) };
    
    return (
      <Marker {...this.props} 
        icon={markerIcon}
        onClick={this.handleClick}>
      </Marker>
    );
  }
}

const mapStateToProps = state => ({
  currentIndex: state.list.currentIndex
});

const mapDispatchToProps = {
  selectedRestaurant
}

export default connect(mapStateToProps, mapDispatchToProps)(GBMarker);
