import * as ActionTypes from '../constants/action-types';

import without  from 'lodash/without'

const initialState = {
  currentIndex: -1,
  mapPosition: {lat: 48.857511, lng: 2.373364},
  type: 'all',
  favs: JSON.parse(window.localStorage.getItem('favs')) || [],
}

const restaurant = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CURRENT_INDEX:
      return { ...state, 
        currentIndex: action.id,
        mapPosition: action.position
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
    default:
      return state
  }
}

export default restaurant;

export const list = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LIST_TYPE: 
      return { ...state, 
        type: action.listType
      }
    default:
      return state
  }
}

export const map = (state = {isLoaded: false}, action) => {
  switch (action.type) {
    case ActionTypes.MAP_LOADED: 
      return { ...state, 
        isLoaded: action.payload.isLoaded
      }
    default:
      return state
  }
}

export const itinerary = (state = {steps: []}, action) => {
  switch (action.type) {
    case ActionTypes.ITINERARY_LOADED: 
      return { ...state, 
        steps: action.payload.itinerary
      }
    default:
      return state
  }
}
