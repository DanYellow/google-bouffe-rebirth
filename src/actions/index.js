import * as ActionTypes from '../constants/action-types';

export * from './async'

export const toggleSurveyItem = (restaurant) => ({
  type: ActionTypes.TOGGLE_SURVEY,
  payload: {
    restaurant
  }
});

