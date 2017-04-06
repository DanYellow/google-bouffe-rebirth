import { TOAST_SHOW } from './constants';

const initialState = {
  message: '',
};

export default function toastReducer(state = initialState, action) {
  switch(action.type) {
    case TOAST_SHOW:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
}
