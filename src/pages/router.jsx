/* eslint-disable */
import { Route } from 'react-router-dom';

import { Home } from 'pages';

export default () => (
    <>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
    </>
);
