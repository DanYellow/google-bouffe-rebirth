import * as ActionTypes from './constants';

export const requestPending = (isRequestPending) => {
  return {
    type: ActionTypes.REQUEST_PENDING,
    isRequestPending
  }
}