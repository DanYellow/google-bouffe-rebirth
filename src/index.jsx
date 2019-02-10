import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Router as App } from 'pages';
import 'i18n';

import 'reset.css';
import 'fonts.css';

injectGlobal`
  html, body {
   font-size: 16px;
   font-family: 'OpenSans';
  }

  button {
    appearance: none;
    outline: none;
    background-color: transparent;
    text-decoration: none;
    background: none;
    border: 0;
  }
`;

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
