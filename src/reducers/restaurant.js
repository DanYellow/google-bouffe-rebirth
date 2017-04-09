import * as ActionTypes from '../constants/action-types';

import without from 'lodash/without'

const initialState = {
  mapPosition: {lat: 48.857511, lng: 2.373364},
  restaurants: [],
  survey:[],
  favs: JSON.parse(window.localStorage.getItem('favs')) || [],
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

export const restaurants = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RESTAURANTS_LOADED: 
      return { ...state, 
        restaurants: action.payload.restaurants
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
        favs: favs,
        deletion: isDeletion
      }

    case ActionTypes.TOGGLE_SURVEY:
      let survey = state.survey;
      return { ...state,
        survey: [...survey, action.id]
      }
      
    default:
      return state
  }
}
