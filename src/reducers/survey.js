import { some, filter } from 'lodash';


import * as ActionTypes from '../constants/action-types';

const initialState = {
  url: '',
  proposals: [],
  results: {},
  content: [] // contains response from API
}

const survey = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_SURVEY:
      return { ...state, 
        url: action.payload.response.url
      }

    case ActionTypes.TOGGLE_SURVEY:
      let proposals = state.proposals;

      if (some(proposals, action.payload.restaurant)) {
        proposals = filter(proposals, (proposalsItem) => {
          return proposalsItem.id !== action.payload.restaurant.id;
        });
      } else {
        proposals = [...proposals, action.payload.restaurant];
      }

      return { ...state,
        proposals
      }

    case ActionTypes.CANCEL_SURVEY: 
      return { ...state,
        proposals: [],
        url: ''
      }

    case ActionTypes.GET_SURVEY_SUCCESS: 
      return { ...state,
        content: action.payload.response
      }

    case ActionTypes.VOTE_PROPOSAL:
      return { ...state,
        voteConfirmation: action.payload.response
      }
    
    case ActionTypes.SURVEY_RESULTS:
      return { ...state,
        results: action.payload.results.response
      }
    

    default:
      return state
  }
}

export default survey;