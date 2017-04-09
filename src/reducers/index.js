import { combineReducers } from 'redux'

import { list, map, itinerary } from './list';
import restaurant, { restaurants } from './restaurant';
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
