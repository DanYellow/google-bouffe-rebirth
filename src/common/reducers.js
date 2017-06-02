import * as ActionTypes from './constants';

const initialState = {
  isPending: true
}

export const requestsManager = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_PENDING:
      return {...initialState, ...{isPending: action.isRequestPending}}
    default:
      return state
  }
}
