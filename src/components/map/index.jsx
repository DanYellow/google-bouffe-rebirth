import { compose } from 'redux';
import {
    GoogleMap,
    withGoogleMap,
    withScriptjs,
    DirectionsRenderer,
} from 'react-google-maps';

import { Marker } from 'components';

const Map = props => {
    const { locations, selectedLocationId, directions = null } = props;

    return (
        <GoogleMap
            {...props}
            options={{
                minZoom: 15,
                fullscreenControl: false,
                streetViewControl: false,
                scaleControl: true,
                clickableIcons: false,
                mapTypeControl: false,
                styles: [
                    {
                        featureType: 'all',
                        stylers: [{ saturation: -40 }],
                    },
                    {
                        featureType: 'road.arterial',
                        elementType: 'geometry',
                        stylers: [{ hue: '#d8c307' }, { saturation: 10 }],
                    },
                    {
                        featureType: 'poi.business',
                        elementType: 'labels',
                        stylers: [{ visibility: 'off' }],
                    },
                ],
            }}
        >
            {locations.restaurants.map(item => (
                <Marker
                    key={item.id}
                    {...item}
                    isSelected={selectedLocationId === item.id}
                />
            ))}
            {Object.keys(directions).length > 0 && (
                <DirectionsRenderer
                    options={{ suppressMarkers: true }}
                    directions={directions}
                />
            )}
        </GoogleMap>
    );
};

const enhanced = compose(
    withScriptjs,
    withGoogleMap
);

export default enhanced(Map);
