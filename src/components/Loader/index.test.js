import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Loader from './index';

// import configureStore from 'redux-mock-store';
// const mockStore = configureStore();


// console.log('mockStore({ restaurants: {} })', mockStore({ state: {} })
//   );

describe('Loader component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Loader />, div)
  });

  const LoaderComponent = shallow(<Loader />)
  it('renders image', () => {
    expect(LoaderComponent.find('img')).toHaveLength(1);
  });

  it('renders text', () => {
    expect(LoaderComponent.find('p')).toHaveLength(1);
    expect(LoaderComponent.find('p').text()).toEqual('Chargement');
  });
})
