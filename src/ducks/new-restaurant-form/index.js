const initialState = {
  personnals: JSON.parse(window.localStorage.getItem('personnals')) || [],
}

const SUBMIT = 'google-bouffe/new-restaurant-form/SUBMIT';

const submitValues = (values) => {
  return {
    type: SUBMIT,
    values
  }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function addNewRestaurant(values, dispatch) {
  await sleep(500);
  dispatch(submitValues(values))
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SUBMIT:
      let personnals = state.personnals;
      personnals = [...personnals, action.values];
      window.localStorage.setItem('personnals', JSON.stringify(personnals));
      return { 
        ...state,
        personnals
      }

    default: return state;
  }
}