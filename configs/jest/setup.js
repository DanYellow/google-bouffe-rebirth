import React, { PureComponent, Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import styled, { css } from 'react-emotion';
import { injectGlobal } from 'emotion';
import { find, map } from 'lodash';
import { MemoryRouter } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

jest.setTimeout(10000);

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

global.React = React;
global.ReactDOM = ReactDOM;
global.PureComponent = PureComponent;
global.Fragment = Fragment;
global.Component = Component;

global.styled = styled;
global.injectGlobal = injectGlobal;
global.css = css;

global.MemoryRouter = MemoryRouter;
global.withRouter = withRouter;

global.MockAdapter = MockAdapter;
global.axios = axios;
global.thunk = thunk;
global.Provider = Provider;
global.configureMockStore = configureMockStore;

global._map = map;
global._find = find;

global.Helmet = Helmet;

global.ENTER_KEYCODE = 13;
global.SPACEBAR_KEYCODE = 32;
global.UP_KEYCODE = 38;
global.DOWN_KEYCODE = 40;

const middlewares = [thunk];
global.mockStore = configureMockStore(middlewares);
global.mock = new MockAdapter(axios);

// global.console = {
//     warn: jest.fn(),
//     error: jest.fn()
// };

global.localStorageMock = (function() {
    var store = {};

    return {
        getItem: function(key) {
            return store[key] || null;
        },
        setItem: function(key, value) {
            store[key] = value.toString();
        },
        clear: function() {
            store = {};
        },
    };
})();
