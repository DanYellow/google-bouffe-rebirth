/* eslint-disable */
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import { Router as App } from 'pages';
import 'i18n';

import 'reset.css';
import 'fonts.css';
import 'icons.css';

injectGlobal`
  html, body {
   font-size: 16px;
   font-family: 'OpenSans';
   /* -webkit-overflow-scrolling: touch; */
   height: 100%;
  width: 100%;
  overflow: auto;
  }

  button {
    appearance: none;
    outline: none;
    background-color: transparent;
    text-decoration: none;
    background: none;
    border: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-weight: normal;
  }
`;

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById('root')
);
