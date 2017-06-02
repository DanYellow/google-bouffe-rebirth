import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

import configureStore from 'redux-mock-store';
const mockStore = configureStore();


console.log('mockStore({ restaurants: {} })', mockStore({ state: {} }).getState()
  );

it('renders without crashing', () => {
   shallow(<App store={mockStore({ restaurants: {} })} />);
});
