import { compose } from 'redux';
import styled from '@emotion/styled';
import { withRouter } from 'react-router';

import { Map, List } from 'components';
import config from 'utils/config';

import { Locations } from 'services/api';

const App = styled.div`
    height: 100vh;
    width: 100%;
    color: #333333;
    position: relative;
`;

const LocationSelectedContext = React.createContext('light');

const Home = props => {
    const [locations, setLocations] = React.useState({});

    React.useEffect(() => {
        Locations.get().then(data => {
            setLocations(data);
        });
    }, {});

    if (Object.keys(locations).length === 0) {
        return null; // Future spiner
    }

    const selectedLocation =
        locations.restaurants.find(
            item => item.id === Number(props.match.params.id)
        ) || {};

    return (
        <>
            <App>
                <LocationSelectedContext.Provider value="dark">
                    <List
                        locations={locations}
                        selectedLocationId={selectedLocation.id || null}
                    />
                    <Map
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                            config.gmapKey
                        }`}
                        loadingElement={<div style={{ height: '100%' }} />}
                        containerElement={<div style={{ height: '100%' }} />}
                        mapElement={<div style={{ height: '100%' }} />}
                        defaultZoom={16}
                        defaultCenter={{ lat: 45.497185, lng: -73.656612 }}
                        center={selectedLocation.position}
                        locations={locations}
                    />
                </LocationSelectedContext.Provider>
            </App>
        </>
    );
};

const enhanced = compose(withRouter);

export default enhanced(Home);
