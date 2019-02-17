import { combineReducers } from 'redux';
import HomeReducers from 'pages/home/modules';

export default combineReducers({
    restaurants: HomeReducers.restaurants.default,
    survey: HomeReducers.survey.default,
});
