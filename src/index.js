import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

import App from './components/App';
import './reset.css';
import './index.css';
import './utils.css';

let composition = null;

if (process.env.NODE_ENV === 'production') {
  composition = compose(applyMiddleware(thunk));
} else {
  composition = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

const store = createStore(
  reducer,
  composition
);

render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
