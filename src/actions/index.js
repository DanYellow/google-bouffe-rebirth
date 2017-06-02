import * as ActionTypes from '../constants/action-types';

export * from './async'

export const toggleSurveyItem = (restaurant) => ({
  type: ActionTypes.TOGGLE_SURVEY,
  payload: {
    restaurant
  }
});

export const cancelSurvey = () => ({
  type: ActionTypes.CANCEL_SURVEY,
});


export const deleteExistingSurvey = () => ({
  type: ActionTypes.EXISTING_SURVEY_DELETE,
});

export const displayExistingSurvey = () => ({
  type: ActionTypes.EXISTING_SURVEY_DISPLAY,
});
