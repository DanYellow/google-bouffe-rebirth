import React from 'react';
import ReactDOM from 'react-dom';
import { Survey } from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const props = {
    surveyContent: [{title: "Hello"}]
  }

  ReactDOM.render(<Survey {...props} />, div);
});
