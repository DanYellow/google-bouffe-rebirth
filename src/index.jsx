/* eslint-disable */
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Home } from 'pages';

console.warn('React', Home);

ReactDOM.render(
    <BrowserRouter>
        <Home />
    </BrowserRouter>,
    document.getElementById('root')
);
// ReactDOM.render(<Home />, document.getElementById('root'));
