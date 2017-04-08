import { combineReducers } from 'redux'

import restaurant, { list, map, itinerary } from './list';
import toastReducer from './../components/Toast/reducers'

const reducer = combineReducers({
  restaurant,
  list,
  map,
  itinerary,
  toast: toastReducer
});

export default reducer;
