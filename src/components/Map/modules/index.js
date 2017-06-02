const MAP_LOADED = 'google-bouffe/list/MAP_LOADED';

const initialState = {isLoaded: false};

const map = (state = initialState, action) => {
  switch (action.type) {
    case MAP_LOADED: 
      return { ...state, 
        isLoaded: action.payload.isLoaded
      }
    default:
      return state
  }
}

export default map;


export const mapIsLoaded = () => ({
  type: MAP_LOADED,
  payload: {
    isLoaded: true
  }
})

