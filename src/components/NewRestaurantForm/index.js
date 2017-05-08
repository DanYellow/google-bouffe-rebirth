import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { SearchBox, GoogleMap } from 'react-google-maps';
import { default as ScriptjsLoader } from 'react-google-maps/lib/async/ScriptjsLoader';


const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  marginTop: `27px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
};


import texts from './../../constants/texts';

import './NewRestaurantForm.css';

let scriptLoaderOptions = {
  hostname: 'maps.googleapis.com',
  pathname: '/maps/api/js',
  query: { 
    v: 3.0, libraries: 'geometry,places', 
    key:'AIzaSyAT2woXaVUit32ya7B4vyWRyZXAoYhZX4s' 
  }
};

const defaultMapProps = {
  zoom: 16,
  options: {
    minZoom: 15,
    fullscreenControl: false,
    streetViewControl: false,
    scaleControl: true,
    clickableIcons: false,
    scrollwheel: false,
    mapTypeControl: false,
    zoomControlOptions: {
      style: 2
    },
    styles: [{
      featureType: 'all',
      stylers: [
        { saturation: -80 }
      ]
    }, {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        { hue: '#ff0000' },
        { saturation: 50 }
      ]
    }, {
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }]
  }
}


class NewRestaurantForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    scriptLoaderOptions.loadingElement = (<p>Chargement</p>);
    scriptLoaderOptions.containerElement = (<div style={{ height: `300px` }} />);

    scriptLoaderOptions.googleMapElement = (
          <GoogleMap
              center={{
                lat: 47.6205588,
                lng: -122.3212725,
              }}
              defaultOptions={defaultMapProps.options}
              defaultZoom={defaultMapProps.zoom}
              ref={(map) => {
                if (!map) { return }
                console.log('m', map);
                this.map = map;
                }
              }
            >

            <SearchBox
              ref={(foo) => {
                if (!foo) { return }
                console.log('m', foo);
                this.foo = foo;
                }
              }
              bounds={null}
              onPlacesChanged={null}
              inputStyle={INPUT_STYLE}
              controlPosition={0}
              inputPlaceholder='Customized your placeholder'
            />
          
        </GoogleMap>
    )

    


    return (
      <div className='NewRestaurantForm'>
          <form onSubmit={handleSubmit} className='form'>
            <legend>
              {texts.add_new_restaurant_legend}
            </legend>
            <fieldset>
              <label>Nom</label>
              <div>
                <Field
                  name='name'
                  component='input'
                  type='text'
                  placeholder='Nom'
                />
              </div>
            </fieldset>

            <fieldset>
              <label>Description</label>
              <div>
                <Field 
                  name='description'
                  placeholder='Description'
                  component='textarea' />
              </div>
            </fieldset>

            <ScriptjsLoader {...scriptLoaderOptions} />
          
            <div className='btns'>
              <button type='submit' className='valid' disabled={pristine || submitting}>
                {texts.add_new_restaurant_submit}
              </button>
              <button type='button' className='cancel' disabled={pristine || submitting} onClick={reset}>
                {texts.reinit_new_restaurant_submit}
              </button>
            </div>
          </form>
        </div>
    )
  }
}

export default reduxForm({
  form: 'new-restaurant-form',
})(NewRestaurantForm);
