import {without} from 'lodash';

export * from './restaurant';

const FETCH_SUCCESS = 'google-bouffe/restaurants/FETCH_SUCCESS';
const FETCH_FAILED = 'google-bouffe/restaurants/FETCH_FAILED';
const TOGGLE_FAV = 'google-bouffe/restaurants/TOGGLE_FAV';


const initialStateRestaurants = {
  mapPosition: {lat: 48.857511, lng: 2.373364},
  list: [],
  favs: [],
  home: {}
}

export default (state = initialStateRestaurants, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return { ...state, 
        list: action.payload.restaurants,
        home: action.payload.home_position
      }
      
    case TOGGLE_FAV:
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

export const toggleFav = (id) => ({
  type: TOGGLE_FAV,
  id
});

const getRestaurantsSuccess = (response) => ({
  type: FETCH_SUCCESS,
  payload: response
});

const getRestaurantsFailed = () => ({
  type: FETCH_FAILED,
  payload: {error: true}
})

export const getRestaurants = () => {
  return (dispatch) => {
    return fetch('./restaurants.json')
      .then(response => response.json())
      .then((response) => {
        dispatch(getRestaurantsSuccess(response))
      })
      .then((response) => {
        dispatch(getRestaurantsFailed(response))
      });
  }
}
