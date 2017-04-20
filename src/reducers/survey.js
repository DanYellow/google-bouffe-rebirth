import { some, filter } from 'lodash';


import * as ActionTypes from '../constants/action-types';

const initialState = {
  url: '',
  proposals: [],
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

    default:
      return state
  }
}

export default survey;