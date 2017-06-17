import * as ActionTypes from '../constants/action-types';

import { gbapimanager as GBAPIManager } from '../utils/gb-apimanager'

const requestPending = (isRequestPending) => {
  return {
    type: ActionTypes.REQUEST_PENDING,
    isRequestPending
  }
}

const createSurveySuccess = (response) => {
  return {
    type: ActionTypes.CREATE_SURVEY,
    payload: {
      response
    }
  }
}

export const createSurvey = (restaurants) => {
  return (dispatch) => {
    dispatch(requestPending(true))
    return GBAPIManager.createSurvey(restaurants).then((response) => {
      dispatch(requestPending(false))
      dispatch(
        createSurveySuccess(response)
      )
    }).catch((error) => {
      dispatch(requestPending(false))
      console.error('er', error);
    })
  }
};


const getProposalsForSurveySuccess = (response) => {
  return {
    type: ActionTypes.GET_SURVEY_SUCCESS,
    payload: {
      response
    }
  }
}

export const getProposalsForSurvey = (hash) => {
  return (dispatch) => {
    dispatch(requestPending(true))
    return GBAPIManager.getSurvey(hash).then((response) => {
      dispatch(requestPending(false))
      dispatch(
        getProposalsForSurveySuccess(response)
      )
    }).catch((error) => {
      dispatch(requestPending(false))
      console.log('getProposalsForSurvey', error);
    })
  }
}





