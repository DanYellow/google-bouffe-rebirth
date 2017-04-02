import React, { Component } from 'react';
import './App.css';

import restaurants from '../../constants/restaurants';

import Map from './../Map';
import List from './../List';

class App extends Component {
  render() {
    let restaurantsMapped = restaurants.map((restaurant, index) => {
      restaurant.id = index;
      
      return restaurant;
    }).sort(function(a, b){
      if(a.title < b.title) return -1;
      if(a.title > b.title) return 1;
      
      return 0;
    });

    return (
      <div className='App'>
         <List restaurants={restaurantsMapped} />
          <Map restaurants={restaurantsMapped} />
      </div>
    );
  }
}

export default App;
