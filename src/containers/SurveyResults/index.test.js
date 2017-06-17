import React from 'react';
import { shallow } from 'enzyme';
import SurveyResults from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SurveyResults />, div);
   // shallow(<SurveyResults />);
});
