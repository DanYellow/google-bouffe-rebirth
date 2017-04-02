import * as ActionTypes from '../constants/action-types';

const initialState = {
  currentIndex: -1
}

const list = (state = initialState, action) => {
  console.log('i', action.type);
  switch (action.type) {
    case ActionTypes.CURRENT_INDEX:
    console.log(
      Object.assign({}, state, {
        currentIndex: action.id
      })
    )
      return Object.assign({}, state, {
        currentIndex: action.id
      })
    default:
      return state
  }
}

export default list;
