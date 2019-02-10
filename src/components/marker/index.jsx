import { Marker } from 'react-google-maps';

import markerImage from 'assets/images/marker.png';
// import markerIconSelected from 'marker-selected.png';

export default props => {
    const handleClick = () => {
        const { id } = props;

        document.getElementById(id).scrollIntoView();
    };

    const markerSize = 50;
    const markerIcon = {
        url: markerImage,
        scaledSize: new window.google.maps.Size(markerSize, markerSize),
    };

    return <Marker {...props} icon={markerIcon} onClick={handleClick} />;
};
