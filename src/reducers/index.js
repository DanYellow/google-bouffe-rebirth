import { combineReducers } from 'redux'

import restaurant, { list, map, itinerary, restaurants } from './list';
import toastReducer from './../components/Toast/reducers'

const reducer = combineReducers({
  restaurant,
  list,
  map,
  itinerary,
  restaurants,
  toast: toastReducer
});

export default reducer;
