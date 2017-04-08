import * as ActionTypes from '../constants/action-types';

export const selectedRestaurant = (id, position = {}) => ({
  type: ActionTypes.CURRENT_INDEX,
  id,
  position
});

export const listType = (listType) => ({
  type: ActionTypes.LIST_TYPE,
  listType
})

export const toggleFav = (id) => ({
  type: ActionTypes.TOGGLE_FAV,
  id
});


export const mapIsLoaded = () => ({
  type: ActionTypes.MAP_LOADED,
  payload: {
    isLoaded: true
  }
})


export const itinerarySteps = (itinerary) => ({
  type: ActionTypes.ITINERARY_LOADED,
  payload: {
    itinerary
  }
});
