import * as ActionTypes from '../constants/action-types';

export const selectedRestaurant = id => ({
  type: ActionTypes.CURRENT_INDEX,
  id
});


window.selectedRestaurant = selectedRestaurant;
