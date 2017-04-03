import * as ActionTypes from '../constants/action-types';

const initialState = {
  currentIndex: -1,
  mapPosition: {lat: 48.857511, lng: 2.373364}
}

const restaurant = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CURRENT_INDEX:
      return { ...state, 
        currentIndex: action.id,
        mapPosition: action.position
      } 

    default:
      return state
  }
}

export default restaurant;

export const list = (state = {type: 'all'}, action) => {
  switch (action.type) {
    case ActionTypes.LIST_TYPE: 
      return Object.assign({}, state, {
        type: action.listType
      });
    default:
      return state
  }
}
