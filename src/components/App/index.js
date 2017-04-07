import React, { Component } from 'react';

import {
  Route
} from 'react-router-dom'



import './App.css';

import restaurants from '../../constants/restaurants';

import Map from './../Map';
import List from './../List';
import Toast from './../Toast';

const Locator = ({restaurants, match}) => {
  console.log(match.url)
  return (
    <section className='wrapper'>
      <List restaurants={restaurants} />
      <Map restaurants={restaurants} />

      <Route path={`${match.url}/itinerary`} render={() => (
          <div>
          reggerger
          </div>
        )}/>
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

    return (
      <div className='App'>
        <Toast message='Hello' />
        
        <Route exact path={match.url} render={() => (
          <Locator restaurants={restaurantsMapped} />
        )}/>

        <Route path={`${match.url}:id_restaurant`} render={({match}) => (
          <Locator restaurants={restaurantsMapped} match={match} />
        )}/>
        
      </div>
    );
  }
}

export default App;


