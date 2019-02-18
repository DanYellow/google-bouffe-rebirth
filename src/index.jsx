import ReactDOM from 'react-dom';

import App from './app';

import 'i18n';

import 'reset.css';
import 'fonts.css';
import 'icons.css';

injectGlobal`
  html, body {
   font-size: 16px;
   font-family: 'OpenSans';
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
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-weight: normal;
  }

  * {
    box-sizing: border-box;
  }
`;

ReactDOM.render(<App />, document.getElementById('root'));
