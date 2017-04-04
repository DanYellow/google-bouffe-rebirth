import { combineReducers } from 'redux'

import restaurant, { list } from './list';

const reducer = combineReducers({
  restaurant,
  list
});

export default reducer;
