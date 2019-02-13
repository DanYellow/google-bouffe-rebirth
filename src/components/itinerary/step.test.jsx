import Step from './step';

const props = {
    instructions: 'Hello',
    distance: {
        text: '60 m',
    },
    duration: {
        text: '4 m',
    },
};
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Step {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
