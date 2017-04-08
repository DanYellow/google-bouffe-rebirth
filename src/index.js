import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';

import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

import App from './components/App';
import './reset.css';
import './index.css';
import './utils.css';

let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
