import {
  ITINERARY_CLEARED, ITINERARY_LOADED,
  itinerarySteps,
  default as reducer
} from './index';

describe('Unit test on reducer', () => {
  test('Clear itinerary', () => {
    const expectedResult = {steps: []};
    const action = {
      type: ITINERARY_CLEARED
    };

    expect(reducer(undefined, action)).toEqual(expectedResult);
  });

  test('Loaded itinerary', () => {
    const expectedResult = {steps: [1, 2, 3]};
    const action = {
      type: ITINERARY_LOADED,
      payload: {
        itinerary: [1, 2, 3]
      }
    }

    expect(reducer(undefined, action)).toEqual(expectedResult);
  });
});


describe('Unit test on action', () => {
  test('It should indicates steps for a (fake) location', () => {
    const expectedResult = {
      type: ITINERARY_LOADED,
      payload: {
        itinerary: [1, 2, 3]
      }
    }

    expect(itinerarySteps([1,2,3])).toEqual(expectedResult);
  });
});