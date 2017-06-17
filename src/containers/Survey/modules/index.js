import { requestPending } from 'common/actions';
import { gbapimanager as GBAPIManager } from 'utils/gb-apimanager';

import { some } from 'lodash'

export const CREATE_SURVEY           = 'google-bouffe/survey/CREATE_SURVEY';
export const GET_SURVEY_SUCCESS      = 'google-bouffe/survey/GET_SURVEY_SUCCESS';
export const VOTE_PROPOSAL           = 'google-bouffe/survey/VOTE_PROPOSAL';
export const DISPLAY_RESULTS         = 'google-bouffe/survey/DISPLAY_RESULTS';

export const TOGGLE_SURVEY_CHOICE    = 'google-bouffe/survey/TOGGLE_SURVEY_CHOICE';
export const CANCEL_SURVEY           = 'google-bouffe/survey/CANCEL_SURVEY';

export const DISPLAY_EXISTING_SURVEY = 'google-bouffe/survey/DISPLAY_EXISTING_SURVEY';
export const DELETE_EXISTING_SURVEY  = 'google-bouffe/survey/DELETE_EXISTING_SURVEY';


const initialState = {
  url: window.localStorage.getItem('last_survey_hash') || '',
  proposals: [],
  results: {},
  inProgress: false,
  voted: JSON.parse(window.localStorage.getItem('voted')) || [],
  content: [] // contains response from API
}

const survey = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SURVEY:
      return {
        ...state,
        url: action.payload.response.url,
        proposals: [],
        inProgress: false,
      }

    case TOGGLE_SURVEY_CHOICE:
      let proposals = state.proposals;

      if (some(proposals, action.payload.restaurant)) {
        proposals = proposals.filter((proposalsItem) => {
          return proposalsItem.id !== action.payload.restaurant.id;
        })
      } else {
        proposals = [...proposals, action.payload.restaurant]
      }
      const inProgress = (proposals.length) ? true : false;
      return { ...state,
        proposals,
        inProgress: inProgress
      }

    case CANCEL_SURVEY:
      window.localStorage.setItem('last_survey_hash', '')
      return { ...state,
        proposals: [],
        inProgress: false,
        url: ''
      }

    case GET_SURVEY_SUCCESS:
      return { ...state,
        content: action.payload.response,
      }

    case VOTE_PROPOSAL:
      let votePayload = {
        date: new Date(),
        restaurant: action.payload.response.title,
        survey_hash: action.payload.response.survey_hash,
      }
      let voted = [...state.voted, votePayload];
      
      window.localStorage.setItem('voted', JSON.stringify(voted))

      return { ...state,
        ...{ voteConfirmation: action.payload.response }
      }
    
    case DISPLAY_RESULTS:
      return { ...state,
        results: action.payload.results.response
      }
    
    case DISPLAY_EXISTING_SURVEY:
      return { ...state,
        proposals: [],
        inProgress: false,
      }

    case DELETE_EXISTING_SURVEY:
      window.localStorage.setItem('last_survey_hash', '')
      return { ...state,
        url: '',
      }

    default:
      return state
  }
}

export default survey


export const toggleRestaurant = (restaurant) => ({
  type: TOGGLE_SURVEY_CHOICE,
  payload: {
    restaurant
  }
})


const voteForAProposalSuccess = (response) => {
  return {
    type: VOTE_PROPOSAL,
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
    });
  }
};

const createSurveySuccess = (response) => {
  return {
    type: CREATE_SURVEY,
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
    type: GET_SURVEY_SUCCESS,
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

export const cancelSurvey = () => ({
  type: CANCEL_SURVEY,
})

export const deleteExistingSurvey = () => ({
  type: DELETE_EXISTING_SURVEY,
})

export const displayExistingSurvey = () => ({
  type: DISPLAY_EXISTING_SURVEY,
})
