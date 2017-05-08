import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
  Link
} from 'react-router-dom';
import { Helmet } from 'react-helmet'; 

import { find, includes } from 'lodash';

import { restaurantsListLoaded } from '../../actions';
import './App.css';

import Map from './../Map';
import List from './../List';
// import Toast from './../Toast';
import NewRestaurantForm from './../NewRestaurantForm';
import Itinerary from './../Itinerary';
import Survey from './../Survey';
import SurveyDisplayContainer from './../Survey/survey';
import SurveyResultsContainer from './../Survey/results';
import Loader from './../Map/loader';

import { addNewRestaurant } from './../../ducks/new-restaurant-form/';


const Locator = ({restaurants, match, location, survey}) => {
  const currentRestaurant = find(restaurants, {id: Number(match.params.id_restaurant)});

  return (
    <section className='wrapper'>
      {currentRestaurant && <Helmet><title>{currentRestaurant.title}</title></Helmet>}
      <List restaurants={restaurants} isHidden={ (includes(location.pathname, 'itinerary')) } />
      {restaurants.length && <Map restaurants={restaurants} />}
      {survey && <Survey /> }
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
    const {match, restaurants, survey} = this.props;
    let restaurantsMapped = restaurants.map((restaurant, index) => {
      restaurant.id = index + 1;
      return restaurant;
    }).sort((a, b) => {
      if(a.title < b.title) return -1;
      if(a.title > b.title) return 1;
      
      return 0;
    });

    // <Toast message='Hello' />
    return (
      <div className='App'>
        <header id='header'>
          <Link to='/' title='La meilleure carte pour savoir où manger à midi'>
            <img src="logo.png" alt="logo" width="75"/>
            <h1>Google bouffe</h1>
          </Link>
        </header>

        {!restaurants.length && <Loader />}

        <Switch>
          <Route exact path={match.url} render={({match, location}) => (
            <Locator restaurants={restaurantsMapped} match={match} location={location} survey={survey} />
          )} />

          <Route exact path={`${match.url}survey/:hash`} render={({match, location}) => (
            <SurveyDisplayContainer match={match} />
          )} />

          <Route exact path={`${match.url}survey/results/:hash`} render={SurveyResultsContainer} />

          <Route exact path={`${match.url}add-new-restaurant`} render={() => (
            <NewRestaurantForm onSubmit={addNewRestaurant} />
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
    survey: state.survey.proposals.length > 0 || state.survey.url
  }
};

const mapDispatchToProps = {
  restaurantsListLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
