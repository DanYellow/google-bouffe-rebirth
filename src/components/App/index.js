import React, { Component } from 'react';

import {
  Route
} from 'react-router-dom'

import {find} from 'lodash';


import './App.css';
// import DirectionsExample from './foo.js';

import restaurants from '../../constants/restaurants';

import Map from './../Map';
import List from './../List';
import Toast from './../Toast';
import Itinerary from './../Itinerary';



const Locator = ({restaurants, match, location}) => {
  const currentRestaurant = find(restaurants, {id: Number(match.params.id_restaurant)});

  return (
    <section className='wrapper'>
      <List restaurants={restaurants} isHidden={ (location.pathname.includes('itinerary')) } />
      <Map restaurants={restaurants} />

      <Route path={`${match.url}/itinerary`} exact render={
        () => {
          if (currentRestaurant) {
            return ( <Itinerary {...currentRestaurant} /> )
          } else {
            return null;
          }
        }
      }/>
    
    </section>
  )
}

class App extends Component {
  render() {
    const {match} = this.props;
    let restaurantsMapped = restaurants.map((restaurant, index) => {
      restaurant.id = index + 1;
      return restaurant;
    }).sort(function(a, b){
      if(a.title < b.title) return -1;
      if(a.title > b.title) return 1;
      
      return 0;
    });

    // return ( <DirectionsExample />)

    return (
      <div className='App'>
        <Toast message='Hello' />
        
        <Route exact path={match.url} render={({match, location}) => (
          <Locator restaurants={restaurantsMapped} match={match} location={location} />
        )} />

        <Route path={`${match.url}:id_restaurant`} render={({match, location}) => (
          <Locator restaurants={restaurantsMapped} match={match} location={location} />
        )} />
        
      </div>
    );
  }
}

export default App;
