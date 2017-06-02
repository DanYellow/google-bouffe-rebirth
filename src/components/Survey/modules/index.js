export const CREATE_SURVEY      = 'CREATE_SURVEY';
export const GET_SURVEY_SUCCESS = 'GET_SURVEY_SUCCESS';
export const VOTE_PROPOSAL      = 'VOTE_PROPOSAL';
export const SURVEY_RESULTS     = 'SURVEY_RESULTS';
export const TOGGLE_SURVEY      = 'TOGGLE_SURVEY';
export const CANCEL_SURVEY      = 'CANCEL_SURVEY';


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

    case TOGGLE_SURVEY:
      let proposals = state.proposals;

      if (some(proposals, action.payload.restaurant)) {
        proposals = filter(proposals, (proposalsItem) => {
          return proposalsItem.id !== action.payload.restaurant.id;
        });
      } else {
        proposals = [...proposals, action.payload.restaurant];
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
    
    case SURVEY_RESULTS:
      return { ...state,
        results: action.payload.results.response
      }
    
    case EXISTING_SURVEY_DISPLAY:
      return { ...state,
        proposals: [],
        inProgress: false,
      }

    case EXISTING_SURVEY_DELETE:
      window.localStorage.setItem('last_survey_hash', '')
      return { ...state,
        url: '',
      }

    default:
      return state
  }
}

export default survey;
