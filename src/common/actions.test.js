import {requestPending} from './actions';
import * as ActionTypes from './constants';

describe('Requests manager', () => {
  test('It should indicates that a request is pending', () => {
    const expectedResult = {
      type: ActionTypes.REQUEST_PENDING,
      isRequestPending: true
    };

    expect(requestPending(true)).toEqual(expectedResult);
  });
});