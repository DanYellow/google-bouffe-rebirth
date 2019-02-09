import { compose } from 'redux';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';

const Map = () => (
    <GoogleMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    />
);

const enhanced = compose(
    withScriptjs,
    withGoogleMap
);

export default enhanced(Map);
