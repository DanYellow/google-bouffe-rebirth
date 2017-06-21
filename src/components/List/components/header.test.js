import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import { Header } from './header';

describe('Header component', () => {
  it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
  });

  it('should indicates that user as 3 favs', () => {
    const favorites = [1,2,4];
    const headerComponent = mount(<Header favs={favorites} />);

    expect(headerComponent.find('span').text()).toBe(String(favorites.length))
  });

  it('should have 2 buttons', () => {
    const favorites = [1,2,4];
    const headerComponent = mount(<Header favs={favorites} />)

    expect(headerComponent.find('button')).toHaveLength(2)
  });
});