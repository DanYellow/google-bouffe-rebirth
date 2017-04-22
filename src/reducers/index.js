import { combineReducers } from 'redux'

import { list, map, itinerary } from './list';
import restaurant, { restaurants } from './restaurant';
import survey from './survey';
import toastReducer from './../components/Toast/reducers'

import { REQUEST_PENDING } from '../constants/action-types';



export const isRequestPending = (state = false, action) => {
  switch (action.type) {
    case REQUEST_PENDING:
      return action.isRequestPending
    default:
      return state
  }
}


const reducer = combineReducers({
  restaurant,
  list,
  map,
  itinerary,
  restaurants,
  survey,
  toast: toastReducer,
  isRequestPending
});

export default reducer;
