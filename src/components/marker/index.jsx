import { Marker } from 'react-google-maps';
import { withRouter } from 'react-router';
import { compose } from 'redux';

import markerImage from 'assets/images/marker.png';
import markerIconSelected from 'assets/images/marker-selected.png';

// import markerImage from 'assets/images/marker.png';
// import markerImage from 'assets/images/marker.png';

const CustomMarker = props => {
    const handleClick = () => {
        const { id, history } = props;

        document.getElementById(id)?.scrollIntoView(); // eslint-disable-line
        history.replace(`/locations/${id}`);
    };

    let markerIcon = null;
    switch (true) {
        case props.isSelected:
            markerIcon = markerIconSelected;
            break;
        default:
            markerIcon = markerImage;
    }

    const markerSize = 50;
    const markerIconObj = {
        url: markerIcon,
        scaledSize: new window.google.maps.Size(markerSize, markerSize),
    };

    return <Marker {...props} icon={markerIconObj} onClick={handleClick} />;
};

const enhanced = compose(withRouter);

export default enhanced(CustomMarker);
