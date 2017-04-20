import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch
} from 'react-router-dom';
import { Helmet } from "react-helmet";

import { find } from 'lodash';

import { restaurantsListLoaded } from '../../actions';
import './App.css';

import Map from './../Map';
import List from './../List';
import Toast from './../Toast';
import Itinerary from './../Itinerary';
import Survey from './../Survey';
import Loader from './../Map/loader';

const Locator = ({restaurants, match, location, survey}) => {
  const currentRestaurant = find(restaurants, {id: Number(match.params.id_restaurant)});

  return (
    <section className='wrapper'>
      {currentRestaurant && <Helmet><title>{currentRestaurant.title}</title></Helmet>}
      <List restaurants={restaurants} isHidden={ (location.pathname.includes('itinerary')) } />
      {restaurants.length && <Map restaurants={restaurants} />}
      {(survey.length > 0) && <Survey /> }
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
  componentDidMount() {
    fetch('./restaurants.json')
      .then(response => response.json())
      .then((response) => {
        this.props.restaurantsListLoaded(response)
      });
  }
  render() {
    const {match, restaurants, survey} = this.props

    let restaurantsMapped = restaurants.map((restaurant, index) => {
      restaurant.id = index + 1;
      return restaurant;
    }).sort(function(a, b){
      if(a.title < b.title) return -1;
      if(a.title > b.title) return 1;
      
      return 0;
    });

    // <Toast message='Hello' />
    return (
      <div className='App'>

        {!restaurants.length && <Loader />}

        <Switch>
          <Route exact path={match.url} render={({match, location}) => (
            <Locator restaurants={restaurantsMapped} match={match} location={location} survey={survey} />
          )} />

          <Route path={`${match.url}:id_restaurant`} render={({match, location}) => (
            <Locator restaurants={restaurantsMapped} match={match} location={location} survey={survey} />
          )} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    restaurants: state.restaurants.list.restaurants || [],
    survey: state.survey.proposals
  }
};

const mapDispatchToProps = {
  restaurantsListLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
