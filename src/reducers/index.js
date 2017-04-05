import { combineReducers } from 'redux'

import restaurant, { list } from './list';
import toastReducer from './../components/Toast/reducers'

const reducer = combineReducers({
  restaurant,
  list,
  toast: toastReducer
});

export default reducer;
