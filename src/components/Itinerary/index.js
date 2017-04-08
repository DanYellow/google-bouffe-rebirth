import React from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { Link } from 'react-router-dom'

import './index.css';

import { itinerarySteps } from '../../actions';

import { asyncComponent } from 'react-async-component';



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
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  componentDidMount() {
    if (this.props.mapIsLoaded) {
      this._loadItinerary(this.props);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Called on first page load
    if (this.props.mapIsLoaded && this.props.itinerary.length === 0) {
      this._loadItinerary(this.props);
    }
  }

  render() {
    const {id, title, address, mapIsLoaded, position, itinerarySteps, itinerary} = this.props;

 
    return (
      <div className='ItineraryWrapper'>
        <header>
          <section>
            <div>
              <h1>{title}</h1>
              <p>{address}</p>
            </div>
            <Link to={`/${id}`} className='reset'>
              <span className={'icon-close'}></span>
            </Link>
          </section>
        </header>

        <div className='itinerary-steps'>
          <header>Itinéraire</header>
          <ul>
            <ItinerarySteps steps={itinerary} />
          </ul>
        </div>
      </div>
    ) // <AsyncProduct position={position} id={56} />
  }
}

// fetch('http://my.url').then(() => {

// })

// const AsyncProduct = asyncComponent({
//   resolve: () => new Promise(resolve =>
    // setTimeout(function() {
    //   resolve(ItinerarySteps);
    // }, 4000)
//   ),
//   LoadingComponent: ({ productId }) => <div>Loading {productId}</div>, // Optional
//   ErrorComponent: ({ error }) => <div>{error.message}</div> // Optional
// });

const AsyncProduct = asyncComponent({
  resolve: (foo) => new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(ItinerarySteps);
    }, 4000)
  }),
  LoadingComponent: ({ position }) => <div>Loading</div>, // Optional
  ErrorComponent: ({ error }) => <div>{error.message}</div> // Optional
});

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
