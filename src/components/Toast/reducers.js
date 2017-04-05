const initialState = {
  message: '',
};

export default function toastReducer(state = initialState, action) {
  console.log('a', action);
  switch(action.type) {
    case 'TOAST_SHOW':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
}
