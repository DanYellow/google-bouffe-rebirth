import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router'
import { shallow } from 'enzyme';

import { SurveyResults } from './index';

it('renders without crashing', () => {
  const context = { router: { isActive: (a, b) => true } };
  const div = document.createElement('div');
  ReactDOM.render(
    <SurveyResults />
  , div);
   // shallow(<SurveyResults />);
});
