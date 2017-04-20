import * as ActionTypes from '../constants/action-types';

import { without } from 'lodash';

const initialState = {
  mapPosition: {lat: 48.857511, lng: 2.373364},
}

const restaurant = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CURRENT_INDEX:
      return { ...state, 
        currentIndex: action.id,
        mapPosition: action.position
      }
    default:
      return state
  }
}

export default restaurant;

const initialStateRestaurants = {
  mapPosition: {lat: 48.857511, lng: 2.373364},
  list: [],
  favs: JSON.parse(window.localStorage.getItem('favs')) || [],
}

export const restaurants = (state = initialStateRestaurants, action) => {
  switch (action.type) {
    case ActionTypes.RESTAURANTS_LOADED: 
      return { ...state, 
        list: action.payload.restaurants
      }
      
    case ActionTypes.TOGGLE_FAV:
      let favs = state.favs;
      let isDeletion = false;
      if (favs.includes(action.id)) {
        favs = without(favs, action.id);
        isDeletion = true;
      } else {
        favs = [...favs, action.id];
      }
      window.localStorage.setItem('favs', JSON.stringify(favs));
      return { ...state,
        favs,
        deletion: isDeletion
      }

    default:
      return state
  }
}
