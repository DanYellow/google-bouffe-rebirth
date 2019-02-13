import Step from './step';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Step />, div);
    ReactDOM.unmountComponentAtNode(div);
});
