import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { withRouter } from 'react-router';

import HomeActions from 'pages/home/modules';

import { Map, List, Itinerary } from 'components';
import config from 'utils/config';

import { Locations } from 'services/api';

const {
    restaurants: { toggleFav: toggleFavAC },
    survey: { toggleSurveyChoice: toggleSurveyChoiceAC },
} = HomeActions;

const App = styled.div`
    height: 100vh;
    width: 100%;
    color: #333333;
    position: relative;
    overflow: hidden;
`;

const Panel = styled.div``;

const getItinerary = (originPosition, destinationPosition) => {
    const directionsService = new window.google.maps.DirectionsService();

    return new Promise((resolve, reject) => {
        directionsService.route(
            {
                origin: originPosition,
                destination: destinationPosition, // Restaurant position
                travelMode: window.google.maps.TravelMode.WALKING,
            },
            (response, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    resolve(response);
                } else {
                    reject(status);
                }
            }
        );
    });
};

let currentRoute = null;

const Home = props => {
    const { toggleFav, favs } = props;
    const [locations, setLocations] = React.useState({});
    const [itinerary, setItinerary] = React.useState({});

    React.useEffect(() => {
        Locations.get().then(data => {
            setLocations(data);
        });
    }, {});

    if (Object.keys(locations).length === 0) {
        return null; // Future spinner
    }

    const selectedLocation =
        locations.restaurants.find(
            item => item.id === Number(props.match.params.id)
        ) || {};

    const showItinerary =
        Object.keys(itinerary).length > 0 &&
        props.match.url.includes('directions');

    document.getElementById(selectedLocation.id)?.scrollIntoView(); // eslint-disable-line

    return (
        <>
            <App>
                {!props.match.url.includes('directions') && (
                    <Panel>
                        <List
                            favs={favs}
                            toggleFav={toggleFav}
                            locations={locations}
                            selectedLocationId={selectedLocation.id || null}
                        />
                    </Panel>
                )}

                {showItinerary && (
                    <Itinerary
                        selectedLocation={selectedLocation}
                        steps={itinerary}
                    />
                )}
                <Map
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                        config.gmapKey
                    }`}
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: '100%' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                    defaultZoom={16}
                    directions={itinerary}
                    center={
                        Object.keys(selectedLocation).length > 0
                            ? selectedLocation.position
                            : { lat: 45.497185, lng: -73.656612 }
                    }
                    onIdle={() => {
                        if (
                            props.match.url !== currentRoute &&
                            props.match.url.includes('directions')
                        ) {
                            getItinerary(
                                locations.home.position,
                                selectedLocation.position
                            ).then(directions => setItinerary(directions));
                            currentRoute = props.match.url;
                        }
                    }}
                    locations={locations}
                    selectedLocationId={selectedLocation.id || null}
                />
            </App>
        </>
    );
};

const mapStateToProps = ({ restaurants }) => {
    return {
        favs: restaurants.favs,
    };
};

const mapDispatchToProps = {
    toggleFav: toggleFavAC,
    toggleSurveyChoice: toggleSurveyChoiceAC,
};

const enhanced = compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
);

export default enhanced(Home);
