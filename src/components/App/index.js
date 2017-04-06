import React, { Component } from 'react';

import {
  Route
} from 'react-router-dom'



import './App.css';

import restaurants from '../../constants/restaurants';

import Map from './../Map';
import List from './../List';
import Toast from './../Toast';

const Locator = ({restaurants}) => {
  return (
    <section className='wrapper'>
      <List restaurants={restaurants} />
      <Map restaurants={restaurants} />
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
        console.log(match.url)

    return (
      <div className='App'>
        <Toast message='Hello' />
        
        <Route exact path={match.url} render={() => (
          <Locator restaurants={restaurantsMapped} />
        )}/>

        <Route exact path={`${match.url}:id_restaurant`} render={({match}) => (
          <Locator restaurants={restaurantsMapped} />
        )}/>
        
      </div>
    );
  }
}

export default App;


