import styled from '@emotion/styled';

import { Map, List } from 'components';
import config from 'utils/config';

import { Locations } from 'services/api';

const App = styled.div`
    height: 100vh;
    width: 100%;
    color: #333333;
    position: relative;
`;

export default () => {
    const [locations, setLocations] = React.useState({});

    React.useEffect(() => {
        Locations.get().then(data => {
            setLocations(data);
        });
    }, {});

    if (Object.keys(locations).length === 0) {
        return null; // Future spiner
    }

    return (
        <>
            <App>
                <List locations={locations} />
                <Map
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                        config.gmapKey
                    }`}
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: '100%' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                    defaultZoom={16}
                    defaultCenter={{ lat: 45.497185, lng: -73.656612 }}
                    locations={locations}
                />
            </App>
        </>
    );
};
