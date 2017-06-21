import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';


import {default as restaurants, restaurant} from './containers/App/modules';
import {default as list} from './components/List/modules';
import {default as itinerary} from './components/Itinerary/modules';
import {default as map} from './components/Map/modules';

import {default as survey} from './containers/Survey/modules';

import {requestsManager as requests} from './common/reducers';

const reducer = combineReducers({
  restaurants,
  restaurant,
  list,
  itinerary,
  map,
  requests,
  survey,
  form: reduxFormReducer
});

export default reducer;
