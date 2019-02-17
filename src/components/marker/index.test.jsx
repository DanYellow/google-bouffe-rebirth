import { compose } from 'redux';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import config from 'utils/config';

import Marker from './index';

const TestMap = compose(
    withScriptjs,
    withGoogleMap
)(props => {
    <GoogleMap {...props}>{props.children}</GoogleMap>;
});

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <MemoryRouter>
            <TestMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                    config.gmapKey
                }`}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '100%' }} />}
                mapElement={<div style={{ height: '100%' }} />}
            >
                <Marker />
            </TestMap>
        </MemoryRouter>,
        div
    );
});
