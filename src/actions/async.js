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

const voteForAProposalSuccess = (response) => {
  return {
    type: ActionTypes.VOTE_PROPOSAL,
    payload: {
      response: response.response
    }
  }
}

export const voteForAProposal = (hash, id) => {
  return (dispatch) => {
    dispatch(requestPending(true))
    return GBAPIManager.vote(hash, id).then((response) => {
      dispatch(requestPending(false))
      dispatch(
        voteForAProposalSuccess(response)
      )
    }).catch((error) => {
      dispatch(requestPending(false))
      console.error('voteForAProposal', error);
    })
  }
};

const getSurveyResultsSuccess = (response) => {
  return {
    type: ActionTypes.SURVEY_RESULTS,
    payload: {
      results: response
    }
  }
}

export const getSurveyResults = (hash) => {
  return (dispatch) => {
    dispatch(requestPending(true))
    return GBAPIManager.getResults(hash).then((response) => {
      dispatch(requestPending(false))
      dispatch(
        getSurveyResultsSuccess(response)
      )
    }).catch((error) => {
      dispatch(requestPending(false))
      console.error('getSurveyResults', error);
    })
  }
};



