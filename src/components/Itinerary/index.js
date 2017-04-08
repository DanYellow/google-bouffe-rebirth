import React from 'react';
import { connect } from 'react-redux';

import { isEqual } from 'lodash'

import './index.css';

import { itinerarySteps } from '../../actions';


class Itinerary extends React.Component {
  _loadItinerary({position, itinerarySteps}) {
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();

    directionsService.route({
      origin: {lat: 48.857927, lng: 2.373118}, // Digitas
      destination: position, // Restaurant position
      travelMode: google.maps.TravelMode.WALKING
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {

        itinerarySteps(response.routes[0].legs[0].steps);

        // self.setState({ 
        //   currentRestaurantItinerary: response.routes[0].legs[0].steps,
        //   currentRestaurantDirections: response
        // });
        // self.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  componentDidMount() {
    console.log(this.props.mapIsLoaded);
    if (this.props.mapIsLoaded) {
      console.log("vgrr");
      this._loadItinerary(this.props);
    }
  }

  render() {
    const {title, address, mapIsLoaded, position, itinerarySteps, itinerary} = this.props;

    console.log('itinerarySteps', itinerary);
    return (
      <div className='ItineraryWrapper'>
        <header>
          <section>
            <h1>{title}</h1>
            <p>{address}</p>
          </section>
        </header>
        <ul className='itinerary-steps'>
          <ItinerarySteps steps={itinerary} />
        </ul>
      </div>
    )
  }
}

// const Itinerary = ({title, address, mapIsLoaded, position, itinerarySteps, itinerary}) => {

//   if (mapIsLoaded) {
    
//   }

//   return (
//     <div className='ItineraryWrapper'>
//       <header>
//         <section>
//           <h1>{title}</h1>
//           <p>{address}</p>
//         </section>
//       </header>
//       <ul className='itinerary-steps'>
//         <ItinerarySteps steps={itinerary} />
//       </ul>
//     </div>
//   )
// }

// const ItinerarySteps = () => {
//   render() {
//     return (
//       <div>
//         <Itinerary datas={this.props.datas} />
//       </div>
//     );
//   }
// }

const ItinerarySteps = (props) => {
  let renderStep = (instruction, index) => {
    return ( 
      <li key={ Date.now() + index }>
        <p dangerouslySetInnerHTML={{__html: instruction.instructions}} />
        <section className='infos'>
          <p>
            Distance : {instruction.distance.text}
          </p>
          <p>
            Temps : {instruction.duration.text}
          </p>
        </section>
      </li> 
    )
  }

  return (
    <ol> { props.steps.map(renderStep) } </ol>
  );
}

const mapStateToProps = state => ({
  mapIsLoaded: state.map.isLoaded,
  itinerary: state.itinerary.steps,
});

const mapDispatchToProps = {
  itinerarySteps
}


export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
