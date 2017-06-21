import React from 'react';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { find, includes } from 'lodash';

import Map from './../Map';
import List from './../List';
import Itinerary from './../Itinerary';

import Survey from 'components/Survey';

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

export default Locator;
