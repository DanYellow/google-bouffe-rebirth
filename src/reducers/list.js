import * as ActionTypes from '../constants/action-types';

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
    case ActionTypes.ITINERARY_CLEARED:
      return {
        ...state,
        steps: []
      }
    default:
      return state
  }
}
