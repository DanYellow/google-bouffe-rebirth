import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Marker } from 'react-google-maps';
import { withRouter } from 'react-router-dom';

import { selectedRestaurant, itineraryStepsCleared } from '../../actions';
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

    if (!id) { return; }
    this.props.history.push(`/${id}`);

    this.props.itineraryStepsCleared()
    this.props.selectedRestaurant(id, this.props.position);
    document.getElementById(id).scrollIntoView();
    this.props.showToast(this.props.datas.title);
  }

  render() {
    let { datas, currentIndex, favs, datas: {isActive}} = this.props;
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
        zIndex={(isActive) ? 9999 : 0}
        onClick={this.handleClick}>
      </Marker>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let {restaurant: {currentIndex}} = state;
  currentIndex = (currentIndex === -1) ? Number(ownProps.match.params.id_restaurant) : currentIndex;

  return {
    currentIndex: currentIndex,
    favs: state.restaurant.favs,
  }
}


const mapDispatchToProps = {
  selectedRestaurant,
  showToast,
  itineraryStepsCleared
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GBMarker));
