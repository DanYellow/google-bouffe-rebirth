import Home from './index.jsx';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <Provider>
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        </Provider>,
        div
    );
});
