import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Marker } from 'react-google-maps';

import { selectedRestaurant } from '../../actions';
import markerFav from '../../images/marker-fav.png';
import markerActiveFav from '../../images/marker-active-fav.png';

import marker from '../../images/marker.png';
import markerActive from '../../images/marker-active.png';

import {show as showToast} from '../Toast/actions';

class GBMarker extends Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Handle action on click
   * @return null
   */
  handleClick() {
    const id = this.props.datas.id;

    this.props.selectedRestaurant(id, this.props.position);
    document.getElementById(id).scrollIntoView();
    this.props.showToast(this.props.datas.title);
  }

  render() {
    let { datas, currentIndex, favs} = this.props;
    const markerSize = 60;

    let markerPath = (datas.id === currentIndex) ? markerActive : marker;

    if (favs.includes(datas.id) && datas.id === currentIndex) {
      markerPath = markerActiveFav;
    } else if (favs.includes(datas.id)) {
      markerPath = markerFav;
    }

    const markerIcon = { url: markerPath,
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
  currentIndex: state.restaurant.currentIndex,
  favs: state.restaurant.favs,
});

const mapDispatchToProps = {
  selectedRestaurant,
  showToast
}


export default connect(mapStateToProps, mapDispatchToProps)(GBMarker);
