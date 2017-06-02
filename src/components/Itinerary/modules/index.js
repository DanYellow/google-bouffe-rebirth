export const ITINERARY_LOADED = 'google-bouffe/list/ITINERARY_LOADED';
export const ITINERARY_CLEARED = 'google-bouffe/list/ITINERARY_CLEARED';

export const itinerarySteps = (itinerary) => ({
  type: ITINERARY_LOADED,
  payload: {
    itinerary
  }
});

export const itineraryStepsCleared = () => ({
  type: ITINERARY_CLEARED,
});

const initialState = {steps: []};

const itinerary = (state = initialState, action) => {
  switch (action.type) {
    case ITINERARY_LOADED:
      return { ...state,
        steps: action.payload.itinerary
      }
    case ITINERARY_CLEARED:
      return initialState;
    default:
      return state
  }
}

export default itinerary;
