import * as ActionTypes from '../constants/action-types';

// export const selectedRestaurant = id => ({
//   type: ActionTypes.CURRENT_INDEX,
//   id
// });


export const selectedRestaurant = function (id) {
  console.log('gtjg');
  return {
    type: ActionTypes.CURRENT_INDEX,
    id
  }
};

window.selectedRestaurant = selectedRestaurant;
