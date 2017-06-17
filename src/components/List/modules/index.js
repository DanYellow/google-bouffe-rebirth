const LIST_TYPE = 'google-bouffe/list/LIST_TYPE';

const initialState = {
  type: 'all'
}

const list = (state = initialState, action) => {
  switch (action.type) {
    case LIST_TYPE: 
      return { ...state, 
        type: action.listType
      }
    default:
      return state
  }
}

export default list;

export const listType = (listType) => ({
  type: LIST_TYPE,
  listType
})
