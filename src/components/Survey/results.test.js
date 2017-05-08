import React from 'react';
import { shallow } from 'enzyme';
import Results from './results';

it('renders without crashing', () => {
   shallow(<Results />);
});
