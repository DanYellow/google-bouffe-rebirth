/* eslint-disable */
import { BrowserRouter, HashRouter } from 'react-router-dom';
/* eslint-enable */

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { Router as App } from 'pages';

import reducer from './reducers';

let composition = null;

if (process.env.NODE_ENV === 'production') {
    composition = compose(applyMiddleware(thunk));
} else {
    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) // eslint-disable-line
            : compose; // eslint-disable-line
    composition = composeEnhancers(applyMiddleware(...[thunk]));
}

const store = createStore(reducer, composition);

export default () => (
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
);
