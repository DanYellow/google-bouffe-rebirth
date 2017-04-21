import * as ActionTypes from '../constants/action-types';

import { gbapimanager as GBAPIManager } from '../utils/gb-apimanager';

export const selectedRestaurant = (id, position = {}) => ({
  type: ActionTypes.CURRENT_INDEX,
  id,
  position
});

export const listType = (listType) => ({
  type: ActionTypes.LIST_TYPE,
  listType
})

export const toggleFav = (id) => ({
  type: ActionTypes.TOGGLE_FAV,
  id
});

export const toggleSurveyItem = (restaurant) => ({
  type: ActionTypes.TOGGLE_SURVEY,
  payload: {
    restaurant
  }
});

export const cancelSurvey = () => ({
  type: ActionTypes.CANCEL_SURVEY,
});


export const mapIsLoaded = () => ({
  type: ActionTypes.MAP_LOADED,
  payload: {
    isLoaded: true
  }
})


export const itinerarySteps = (itinerary) => ({
  type: ActionTypes.ITINERARY_LOADED,
  payload: {
    itinerary
  }
});


export const restaurantsListLoaded = (restaurants) => ({
  type: ActionTypes.RESTAURANTS_LOADED,
  payload: {
    restaurants
  }
});

export const itineraryStepsCleared = () => ({
  type: ActionTypes.ITINERARY_CLEARED,
});


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
    return GBAPIManager.createSurvey(restaurants).then((response) => {
      dispatch(
        createSurveySuccess(response)
      )
    }).catch((error) => {
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
    return GBAPIManager.getSurvey(hash).then((response) => {
      dispatch(
        getProposalsForSurveySuccess(response.response)
      )
    }).catch((error) => {
      console.log('er', error);
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
    return GBAPIManager.vote(hash, id).then((response) => {
      dispatch(
        voteForAProposalSuccess(response)
      )
    }).catch((error) => {
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
    return GBAPIManager.getResults(hash).then((response) => {
      dispatch(
        getSurveyResultsSuccess(response)
      )
    }).catch((error) => {
      console.error('getSurveyResults', error);
    })
  }
};