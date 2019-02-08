/* eslint-disable */
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// import { Home } from 'pages';
import Router from 'pages/router';

ReactDOM.render(
    <BrowserRouter>
        <Router />
    </BrowserRouter>,
    document.getElementById('root')
);
