import { Marker } from 'react-google-maps';

import markerImage from 'assets/images/marker.png';
import markerIconSelected from 'assets/images/marker-selected.png';

// import markerImage from 'assets/images/marker.png';
// import markerImage from 'assets/images/marker.png';

export default (props, context) => {
    const handleClick = () => {
        const { id } = props;

        document.getElementById(id).scrollIntoView();
    };

    let markerIcon = null;
    switch (true) {
        case props.id === 0:
            markerIcon = markerIconSelected;
            break;
        default:
            markerIcon = markerImage;
    }
    console.log('g', context);
    const markerSize = 50;
    const markerIconObj = {
        url: markerIcon,
        scaledSize: new window.google.maps.Size(markerSize, markerSize),
    };

    return <Marker {...props} icon={markerIconObj} onClick={handleClick} />;
};
