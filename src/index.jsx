import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Router as App } from 'pages';
import 'i18n';

import 'reset.css';
import 'fonts.css';
import 'icons.css';

injectGlobal`
  html, body {
   font-size: 16px;
   font-family: 'OpenSans';
   overflow: hidden;
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
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
