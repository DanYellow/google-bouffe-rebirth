import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
  Link
} from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { getRestaurants } from './modules';
import './App.css';

import SurveyDisplayContainer from 'components/Survey/survey';
import SurveyResultsContainer from 'components/Survey/results';
import Loader from 'components/Loader';
import Locator from 'components/Locator';

class App extends Component {
  componentDidMount() {
    this.props.actions.getRestaurants();
  }
  
  render() {
    const {match, restaurants, survey} = this.props;
    let restaurantsSorted = restaurants.map((restaurant, index) => {
      restaurant.id = index + 1;
      return restaurant;
    }).sort((a, b) => {
      if(a.title < b.title) return -1;
      if(a.title > b.title) return 1;
      
      return 0;
    });

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
            <Locator restaurants={restaurantsSorted} match={match} location={location} survey={survey} />
          )} />

          <Route path={`${match.url}:id_restaurant`} render={({match, location}) => (
            <Locator restaurants={restaurantsSorted} match={match} location={location} survey={survey} />
          )} />

          {/*<Route exact path={`${match.url}survey/:hash`} render={({match, location}) => (
            <SurveyDisplayContainer match={match} />
          )} />

          <Route exact path={`${match.url}survey/results/:hash`} render={SurveyResultsContainer} />*/}

          
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    restaurants: state.restaurants.list || [],
    // survey: state.survey.proposals.length > 0 || state.survey.url
  }
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({getRestaurants}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
