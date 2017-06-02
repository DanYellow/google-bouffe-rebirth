const SELECT_RESTAURANT = 'google-bouffe/restaurants/SELECT_RESTAURANT';

const initialState = {
  currentIndex: -1,
  mapPosition: {lat: 48.857511, lng: 2.373364},
}

export const restaurant = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_RESTAURANT:
      return { ...state,
        currentIndex: action.id,
        mapPosition: action.position
      };
    default:
      return state;
  }
}

export const selectedRestaurant = (id, position = {}) => ({
  type: SELECT_RESTAURANT,
  id,
  position
});
